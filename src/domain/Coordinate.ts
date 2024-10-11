import { LngLat } from "maplibre-gl";
// import { Position } from 'geojson'

export default interface Coordinate {
  readonly latitude: number;
  readonly longitude: number;
  readonly altitude?: number;
}

/**
 * TBD: If this function should support an epsilon param for comparisons
 *
 * @returns True if given coordinate has same values is this coordinate
 */
export const isCoordinatesEqual = (c1: Coordinate, c2: Coordinate): boolean => {
  return (
    c1.latitude === c2.latitude && c1.longitude === c2.longitude && c1.altitude === c2.altitude
  );
};

export const fromMapGlLngLat = (latLng: LngLat): Coordinate => {
  return { longitude: latLng.lng, latitude: latLng.lat };
};

export const toMapGlLngLat = (coordinate: Coordinate): LngLat => {
  return new LngLat(coordinate.longitude, coordinate.latitude);
};
//
// export const toGeoJsonPos = (coordinate: Coordinate): Position => {
//   return [coordinate.longitude, coordinate.latitude]
// }
//
// export const fromGeoJsonPos = (position: Position, altitude?: number): Coordinate => {
//   if (position.length === 3) {
//     return { longitude: position[0], latitude: position[1], altitude: position[2] }
//   } else {
//     return { longitude: position[0], latitude: position[1], altitude }
//   }
// }
