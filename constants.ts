
import type { GeoJSONFeatureCollection } from './types';

export const routeData: GeoJSONFeatureCollection = {
  "type": "FeatureCollection",
  "features": [
    // Tawi Watthana Route LineString
    {
      "type": "Feature",
      "properties": {
        "name": "Tawi Watthana Route",
        "route_type": "linear",
        "operating_days": "Daily (06:00-20:00)",
        "color": "#E65100"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [100.40986, 13.71097],
          [100.40553, 13.71264],
          [100.3895, 13.7185], 
          [100.3831, 13.7224], 
          [100.36279, 13.73171],
          [100.3620, 13.7450], 
          [100.36011, 13.76023],
          [100.3585, 13.7680], 
          [100.35467, 13.77095],
          [100.3530, 13.7650], 
          [100.35240, 13.75080],
          [100.34771, 13.75021]
        ]
      }
    },
    // 4 Floating Markets Route LineString
    {
      "type": "Feature",
      "properties": {
        "name": "4 Floating Markets Route",
        "route_type": "loop",
        "operating_days": "Weekends only (09:00-16:45)",
        "color": "#0D9263"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [100.47120, 13.77370],
          [100.4650, 13.7765], 
          [100.4570, 13.7788], 
          [100.45100, 13.77800],
          [100.45670, 13.77690],
          [100.4570, 13.7788], 
          [100.4550, 13.7820], 
          [100.42231, 13.78088],
          [100.4200, 13.7790], 
          [100.41530, 13.76130],
          [100.4280, 13.7580], 
          [100.43916, 13.75438],
          [100.4450, 13.7650], 
          [100.4550, 13.7820], 
          [100.4570, 13.7788], 
          [100.4650, 13.7765], 
          [100.47120, 13.77370]
        ]
      }
    },
    // BMAF-3: MRT Sirindhorn - Vajira Hospital Route LineString
    {
      "type": "Feature",
      "properties": {
        "name": "MRT Sirindhorn - Vajira Hospital Route",
        "route_type": "linear",
        "operating_days": "Weekdays only (09:00-15:00)",
        "color": "#1976D2"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [100.4931, 13.7842], [100.5035, 13.7811], [100.5085, 13.7765],
          [100.5085, 13.7765], [100.5090, 13.7778], [100.4931, 13.7842]
        ]
      }
    },
    // BMAF-4: MRT Sirindhorn - St. Gabriel's Route LineString
    {
      "type": "Feature",
      "properties": {
        "name": "MRT Sirindhorn - St. Gabriel's Route",
        "route_type": "linear",
        "operating_days": "Weekdays peak only (06:00-09:00, 15:00-19:00)",
        "color": "#C2185B"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [100.4931, 13.7842], [100.5055, 13.7801], [100.5135, 13.7752],
          [100.5135, 13.7752], [100.5130, 13.7762], [100.4931, 13.7842]
        ]
      }
    },
    // Tawi Watthana Stops
    {"type": "Feature", "properties": {"name": "MRT Lak Song", "route": "Tawi Watthana"}, "geometry": {"type": "Point", "coordinates": [100.40986, 13.71097]}},
    {"type": "Feature", "properties": {"name": "Big C Phetkasem", "route": "Tawi Watthana"}, "geometry": {"type": "Point", "coordinates": [100.40553, 13.71264]}},
    {"type": "Feature", "properties": {"name": "Ratchaphiphat Hospital", "route": "Tawi Watthana"}, "geometry": {"type": "Point", "coordinates": [100.36279, 13.73171]}},
    {"type": "Feature", "properties": {"name": "Tawi Watthana District Office", "route": "Tawi Watthana"}, "geometry": {"type": "Point", "coordinates": [100.36011, 13.76023]}},
    {"type": "Feature", "properties": {"name": "Bangkok Thonburi University", "route": "Tawi Watthana"}, "geometry": {"type": "Point", "coordinates": [100.35467, 13.77095]}},
    {"type": "Feature", "properties": {"name": "Sanam Luang 2 (Talat Thonburi)", "route": "Tawi Watthana"}, "geometry": {"type": "Point", "coordinates": [100.35240, 13.75080]}},
    {"type": "Feature", "properties": {"name": "Talat World Market", "route": "Tawi Watthana"}, "geometry": {"type": "Point", "coordinates": [100.34771, 13.75021]}},
    // 4 Floating Markets Stops
    {"type": "Feature", "properties": {"name": "MRT Bang Khun Non", "route": "4 Floating Markets"}, "geometry": {"type": "Point", "coordinates": [100.47120, 13.77370]}},
    {"type": "Feature", "properties": {"name": "Song Khlong Floating Market", "route": "4 Floating Markets"}, "geometry": {"type": "Point", "coordinates": [100.45100, 13.77800]}},
    {"type": "Feature", "properties": {"name": "Taling Chan Floating Market", "route": "4 Floating Markets"}, "geometry": {"type": "Point", "coordinates": [100.45670, 13.77690]}},
    {"type": "Feature", "properties": {"name": "Southern Bus Terminal (Sai Tai Mai)", "route": "4 Floating Markets"}, "geometry": {"type": "Point", "coordinates": [100.42231, 13.78088]}},
    {"type": "Feature", "properties": {"name": "Khlong Lat Mayom Floating Market", "route": "4 Floating Markets"}, "geometry": {"type": "Point", "coordinates": [100.41530, 13.76130]}},
    {"type": "Feature", "properties": {"name": "Wat Saphan Floating Market", "route": "4 Floating Markets"}, "geometry": {"type": "Point", "coordinates": [100.43916, 13.75438]}},
    // BMAF-3 Stops
    { "type": "Feature", "properties": { "name": "MRT Sirindhorn (Krung Thon Market)", "route": "MRT Sirindhorn - Vajira Hospital" }, "geometry": { "type": "Point", "coordinates": [100.4931, 13.7842] } },
    { "type": "Feature", "properties": { "name": "Kuakarun Faculty of Nursing", "route": "MRT Sirindhorn - Vajira Hospital" }, "geometry": { "type": "Point", "coordinates": [100.5035, 13.7811] } },
    { "type": "Feature", "properties": { "name": "Vajira Hospital", "route": "MRT Sirindhorn - Vajira Hospital" }, "geometry": { "type": "Point", "coordinates": [100.5085, 13.7765] } },
    // BMAF-4 Stops
    { "type": "Feature", "properties": { "name": "MRT Sirindhorn (Krung Thon Market)", "route": "MRT Sirindhorn - St. Gabriel's" }, "geometry": { "type": "Point", "coordinates": [100.4931, 13.7842] } },
    { "type": "Feature", "properties": { "name": "St. Gabriel's Alumni Association", "route": "MRT Sirindhorn - St. Gabriel's" }, "geometry": { "type": "Point", "coordinates": [100.5135, 13.7752] } }
  ]
};