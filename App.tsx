import React, { useState, useEffect, useCallback } from 'react';
import type { LatLngExpression } from 'leaflet';
import SidePanel from './components/SidePanel';
import MapView from './components/MapView';
import { routeData } from './constants';
import { getRouteInfo } from './services/geminiService';
import { getBusLocations } from './services/busTrackingService';
import type { UserLocation, GeminiResponse, GroundingChunk, BusLocation } from './types';

const App: React.FC = () => {
  const [routeVisibility, setRouteVisibility] = useState({
    tawiWatthana: true,
    floatingMarkets: true,
    mrtSirindhornVajira: true,
    mrtSirindhornStGabriels: true,
  });
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isThinkingMode, setIsThinkingMode] = useState<boolean>(false);
  const [geminiQuery, setGeminiQuery] = useState<string>('');
  const [geminiResponse, setGeminiResponse] = useState<GeminiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [busLocations, setBusLocations] = useState<BusLocation[]>([]);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // State for map view control
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([13.7563, 100.46]);
  const [mapZoom, setMapZoom] = useState<number>(12);

  const requestUserLocation = useCallback((onSuccess: (position: GeolocationPosition) => void) => {
    const geoOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000,
    };
    navigator.geolocation.getCurrentPosition(onSuccess,
      (error: GeolocationPositionError) => {
        let errorMessage = 'An unknown error occurred.';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "User denied the request for Geolocation.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "The request to get user location timed out.";
            break;
        }
        console.error(`Error getting user location: ${errorMessage} (Code: ${error.code}, Message: ${error.message})`);
        setIsLocating(false); // Ensure loading state is turned off on error
      },
      geoOptions
    );
  }, []);

  useEffect(() => {
    // Initial location fetch for Gemini context
    requestUserLocation(position => {
       setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
    });

    const busTrackingInterval = setInterval(() => {
      setBusLocations(getBusLocations());
    }, 2000);

    return () => {
      clearInterval(busTrackingInterval);
    };
  }, [requestUserLocation]);
  
  const handleLocateMe = useCallback(() => {
    setIsLocating(true);
    requestUserLocation(position => {
      const newLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setUserLocation(newLocation);
      setMapCenter([newLocation.latitude, newLocation.longitude]);
      setMapZoom(15); // Zoom in on the user
      setIsLocating(false);
    });
  }, [requestUserLocation]);
  
  const handleQuerySubmit = useCallback(async () => {
    if (!geminiQuery.trim()) return;
    setIsLoading(true);
    setGeminiResponse(null);
    try {
      const response = await getRouteInfo(geminiQuery, isThinkingMode, userLocation);
      const text = response.text;
      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] || [];
      setGeminiResponse({ text, groundingChunks });
    } catch (error) {
      console.error("Error fetching from Gemini:", error);
      setGeminiResponse({ text: "Sorry, I encountered an error. Please try again.", groundingChunks: [] });
    } finally {
      setIsLoading(false);
    }
  }, [geminiQuery, isThinkingMode, userLocation]);

  return (
    <main className="h-screen w-screen bg-gray-900 text-gray-100 flex flex-col md:flex-row overflow-hidden">
      <SidePanel
        routeVisibility={routeVisibility}
        setRouteVisibility={setRouteVisibility}
        isThinkingMode={isThinkingMode}
        setIsThinkingMode={setIsThinkingMode}
        query={geminiQuery}
        setQuery={setGeminiQuery}
        onSubmit={handleQuerySubmit}
        response={geminiResponse}
        isLoading={isLoading}
        isLocating={isLocating}
        onLocateMe={handleLocateMe}
      />
      <div className="flex-grow h-1/2 md:h-full w-full md:w-auto">
        <MapView 
          center={mapCenter}
          zoom={mapZoom}
          geoJsonData={routeData} 
          routeVisibility={routeVisibility}
          busLocations={busLocations}
          userLocation={userLocation}
        />
      </div>
    </main>
  );
};

export default App;