
import { routeData } from '../constants';
import type { BusLocation, GeoJSONFeature } from '../types';

interface BusState {
  id: string;
  route: 'Tawi Watthana' | '4 Floating Markets' | 'MRT Sirindhorn - Vajira Hospital' | "MRT Sirindhorn - St. Gabriel's";
  path: [number, number][];
  segmentIndex: number;
  progress: number; // 0 to 1
  direction: 1 | -1; // 1 for forward, -1 for reverse
  speed: number; // segments per update
}

const tawiWatthanaPath = (routeData.features.find(f => f.properties.name === 'Tawi Watthana Route') as GeoJSONFeature)?.geometry.coordinates as [number, number][];
const floatingMarketsPath = (routeData.features.find(f => f.properties.name === '4 Floating Markets Route') as GeoJSONFeature)?.geometry.coordinates as [number, number][];
const sirindhornVajiraPath = (routeData.features.find(f => f.properties.name === 'MRT Sirindhorn - Vajira Hospital Route') as GeoJSONFeature)?.geometry.coordinates as [number, number][];
const sirindhornStGabrielsPath = (routeData.features.find(f => f.properties.name === "MRT Sirindhorn - St. Gabriel's Route") as GeoJSONFeature)?.geometry.coordinates as [number, number][];

const buses: BusState[] = [
  { id: 'TW-1', route: 'Tawi Watthana', path: tawiWatthanaPath, segmentIndex: 0, progress: 0.1, direction: 1, speed: 0.05 },
  { id: 'TW-2', route: 'Tawi Watthana', path: tawiWatthanaPath, segmentIndex: 5, progress: 0.5, direction: 1, speed: 0.045 },
  { id: 'FM-1', route: '4 Floating Markets', path: floatingMarketsPath, segmentIndex: 2, progress: 0.8, direction: 1, speed: 0.06 },
  { id: 'FM-2', route: '4 Floating Markets', path: floatingMarketsPath, segmentIndex: 8, progress: 0.3, direction: 1, speed: 0.055 },
  { id: 'SV-1', route: 'MRT Sirindhorn - Vajira Hospital', path: sirindhornVajiraPath, segmentIndex: 1, progress: 0.2, direction: 1, speed: 0.08 },
  { id: 'SG-1', route: "MRT Sirindhorn - St. Gabriel's", path: sirindhornStGabrielsPath, segmentIndex: 0, progress: 0.9, direction: 1, speed: 0.12 },
];

function updateBusPositions() {
  buses.forEach(bus => {
    bus.progress += bus.speed * bus.direction;

    if (bus.progress >= 1) {
      bus.progress = 0;
      bus.segmentIndex += 1;
    } else if (bus.progress < 0) {
      bus.progress = 1;
      bus.segmentIndex -=1;
    }
    
    // Handle end of path
    if (bus.segmentIndex >= bus.path.length - 1) {
      if (bus.route === '4 Floating Markets') { // Loop route
        bus.segmentIndex = 0;
      } else { // Linear route, reverse direction
        bus.direction = -1;
        bus.segmentIndex = bus.path.length - 2;
        bus.progress = 1;
      }
    } else if (bus.segmentIndex < 0) {
       // Reverse direction on linear route
       bus.direction = 1;
       bus.segmentIndex = 0;
       bus.progress = 0;
    }

  });
}

function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export function getBusLocations(): BusLocation[] {
  return buses.map(bus => {
    const startPoint = bus.path[bus.segmentIndex];
    const endPoint = bus.path[bus.segmentIndex + 1];
    
    const lng = lerp(startPoint[0], endPoint[0], bus.progress);
    const lat = lerp(startPoint[1], endPoint[1], bus.progress);
    
    return {
      id: bus.id,
      route: bus.route,
      coordinates: [lat, lng],
    };
  });
}

// Start the simulation
setInterval(updateBusPositions, 200);