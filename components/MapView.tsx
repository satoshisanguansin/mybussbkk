import React, { useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap } from 'react-leaflet';
import L, { type LatLngExpression } from 'leaflet';
import type { GeoJSONFeatureCollection, BusLocation, FeatureProperties, UserLocation } from '../types';
import type { Feature, Point as GeoJSONPoint } from 'geojson';
import BusMarker from './BusMarker';

interface ChangeViewProps {
  center: LatLngExpression;
  zoom: number;
}

const ChangeView: React.FC<ChangeViewProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      animate: true,
      duration: 1.5
    });
  }, [center, zoom, map]);
  return null;
}

const userLocationIcon = L.divIcon({
  html: `<div class="relative flex h-3 w-3">
           <div class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></div>
           <div class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></div>
         </div>`,
  className: 'leaflet-user-icon',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

interface MapViewProps {
  center: LatLngExpression;
  zoom: number;
  geoJsonData: GeoJSONFeatureCollection;
  routeVisibility: {
    tawiWatthana: boolean;
    floatingMarkets: boolean;
    mrtSirindhornVajira: boolean;
    mrtSirindhornStGabriels: boolean;
  };
  busLocations: BusLocation[];
  userLocation: UserLocation | null;
}

const MapView: React.FC<MapViewProps> = ({ center, zoom, geoJsonData, routeVisibility, busLocations, userLocation }) => {

  const styleRoute = (feature: Feature<any, FeatureProperties>) => {
    if (feature.geometry.type === 'LineString') {
      const routeName = feature.properties.name;
      if (routeName === 'Tawi Watthana Route' && routeVisibility.tawiWatthana) {
        return { color: feature.properties.color || '#E65100', weight: 5, opacity: 0.8 };
      }
      if (routeName === '4 Floating Markets Route' && routeVisibility.floatingMarkets) {
        return { color: feature.properties.color || '#0D9263', weight: 5, opacity: 0.8 };
      }
      if (routeName === 'MRT Sirindhorn - Vajira Hospital Route' && routeVisibility.mrtSirindhornVajira) {
        return { color: feature.properties.color || '#1976D2', weight: 5, opacity: 0.8 };
      }
      if (routeName === "MRT Sirindhorn - St. Gabriel's Route" && routeVisibility.mrtSirindhornStGabriels) {
        return { color: feature.properties.color || '#C2185B', weight: 5, opacity: 0.8 };
      }
    }
    return { color: 'transparent' }; // Hide if not visible
  };
  
  const pointToLayer = (feature: Feature<GeoJSONPoint, FeatureProperties>, latlng: LatLngExpression) => {
    let isVisible = false;
    let color = '#ffffff';
    const route = feature.properties.route;

    if (route === 'Tawi Watthana' && routeVisibility.tawiWatthana) {
        isVisible = true;
        color = '#E65100';
    } else if (route === '4 Floating Markets' && routeVisibility.floatingMarkets) {
        isVisible = true;
        color = '#0D9263';
    } else if (route === 'MRT Sirindhorn - Vajira Hospital' && routeVisibility.mrtSirindhornVajira) {
        isVisible = true;
        color = '#1976D2';
    } else if (route === "MRT Sirindhorn - St. Gabriel's" && routeVisibility.mrtSirindhornStGabriels) {
        isVisible = true;
        color = '#C2185B';
    }

    return L.circleMarker(latlng, {
        radius: isVisible ? 6 : 0,
        fillColor: color,
        color: '#1f2937',
        weight: 1.5,
        opacity: isVisible ? 1 : 0,
        fillOpacity: isVisible ? 0.9 : 0
    });
  };

  const onEachFeature = (feature: Feature<any, FeatureProperties>, layer: any) => {
    if (feature.properties && feature.properties.name) {
      layer.bindPopup(`<div class="font-sans"><strong>${feature.properties.name}</strong></div>`);
    }
  };

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full z-0">
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <GeoJSON 
        key={`routes-${JSON.stringify(routeVisibility)}`} 
        data={geoJsonData} 
        style={styleRoute} 
        filter={(feature) => feature.geometry.type === 'LineString'} 
      />
      <GeoJSON 
        key={`points-${JSON.stringify(routeVisibility)}`}
        data={geoJsonData} 
        pointToLayer={pointToLayer} 
        onEachFeature={onEachFeature}
        filter={(feature) => feature.geometry.type === 'Point'}
       />
      
      {busLocations.map(bus => {
        let isVisible = false;
        switch (bus.route) {
          case 'Tawi Watthana':
            isVisible = routeVisibility.tawiWatthana;
            break;
          case '4 Floating Markets':
            isVisible = routeVisibility.floatingMarkets;
            break;
          case 'MRT Sirindhorn - Vajira Hospital':
            isVisible = routeVisibility.mrtSirindhornVajira;
            break;
          case "MRT Sirindhorn - St. Gabriel's":
            isVisible = routeVisibility.mrtSirindhornStGabriels;
            break;
        }
        return isVisible ? <BusMarker key={bus.id} bus={bus} /> : null;
      })}
      
      {userLocation && (
        <Marker position={[userLocation.latitude, userLocation.longitude]} icon={userLocationIcon}>
          <Popup>You are here</Popup>
        </Marker>
      )}

    </MapContainer>
  );
};

export default MapView;