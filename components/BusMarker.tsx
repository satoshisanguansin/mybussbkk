
import React from 'react';
import { Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import type { BusLocation } from '../types';
import { LiveBusIcon } from './Icons';

interface BusMarkerProps {
  bus: BusLocation;
}

const BusMarker: React.FC<BusMarkerProps> = ({ bus }) => {
  const routeColors: Record<BusLocation['route'], string> = {
    'Tawi Watthana': 'text-[#E65100]',
    '4 Floating Markets': 'text-[#0D9263]',
    'MRT Sirindhorn - Vajira Hospital': 'text-[#1976D2]',
    "MRT Sirindhorn - St. Gabriel's": 'text-[#C2185B]',
  };
  
  const color = routeColors[bus.route] || 'text-gray-400';

  const icon = L.divIcon({
    html: ReactDOMServer.renderToString(
      <div className="relative">
        <LiveBusIcon className={`${color} h-6 w-6 bg-gray-800/70 rounded-full p-0.5`} />
      </div>
    ),
    className: 'leaflet-bus-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  return (
    <Marker position={bus.coordinates} icon={icon}>
      <Tooltip>
        <div className="font-sans">
          <strong>Bus ID:</strong> {bus.id}<br />
          <strong>Route:</strong> {bus.route}
        </div>
      </Tooltip>
    </Marker>
  );
};

export default BusMarker;