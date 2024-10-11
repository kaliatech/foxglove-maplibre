import { LngLatBounds } from "maplibre-gl";

import Coordinate, { toMapGlLngLat } from "./Coordinate";

export const toLatLngBounds = (cb: CoordinateBounds): LngLatBounds => {
  return new LngLatBounds(toMapGlLngLat(cb.sw), toMapGlLngLat(cb.ne));
};

/**
 * A custom version of LngLatBounds.
 *
 * @see LngLatBounds from MapLibre
 */
export default class CoordinateBounds {
  // eslint-disable-next-line  @foxglove/prefer-hash-private
  private _sw?: Coordinate;
  // eslint-disable-next-line  @foxglove/prefer-hash-private
  private _ne?: Coordinate;
  // eslint-disable-next-line  @foxglove/prefer-hash-private
  private _center?: Coordinate;

  constructor(
    private _nw: Coordinate,
    private _se: Coordinate,
  ) {}

  get nw(): Coordinate {
    return this._nw;
  }

  get se(): Coordinate {
    return this._se;
  }

  get sw(): Coordinate {
    if (!this._sw) {
      this._sw = { longitude: this._nw.longitude, latitude: this._se.latitude };
    }
    return this._sw;
  }

  get ne(): Coordinate {
    if (!this._ne) {
      this._ne = { longitude: this._se.longitude, latitude: this._nw.latitude };
    }
    return this._ne;
  }

  /**
   * Returns the geographical coordinate equidistant from the bounding box's corners.
   *
   * @returns {Coordinate} The bounding box's center.
   */
  get center(): Coordinate {
    if (!this._center) {
      this._center = {
        longitude: (this.sw.longitude + this.ne.longitude) / 2,
        latitude: (this.sw.latitude + this.ne.latitude) / 2,
      };
    }
    return this._center;
  }

  toCoordinates(): Coordinate[] {
    return [this.nw, this.ne, this.se, this.sw];
  }
}
