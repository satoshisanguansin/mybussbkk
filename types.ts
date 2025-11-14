
import type { GeoJsonObject } from 'geojson';

export interface UserLocation {
  latitude: number;
  longitude: number;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
        reviewSnippets: {
            uri: string;
            title: string;
        }[]
    }
  };
}

export interface GeminiResponse {
  text: string;
  groundingChunks: GroundingChunk[];
}

export interface BusLocation {
  id: string;
  route: 'Tawi Watthana' | '4 Floating Markets' | 'MRT Sirindhorn - Vajira Hospital' | "MRT Sirindhorn - St. Gabriel's";
  coordinates: [number, number]; // [lat, lng] for Leaflet
}

// Extended GeoJSON types to include properties we will use
export interface FeatureProperties {
  name: string;
  route?: 'Tawi Watthana' | '4 Floating Markets' | 'MRT Sirindhorn - Vajira Hospital' | "MRT Sirindhorn - St. Gabriel's";
  route_type?: 'linear' | 'loop';
  operating_days?: string;
  color?: string;
}

export interface GeoJSONFeature {
  type: 'Feature';
  properties: FeatureProperties;
  geometry: {
    type: 'Point' | 'LineString';
    coordinates: [number, number] | [number, number][];
  };
}

export interface GeoJSONFeatureCollection extends GeoJsonObject {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}