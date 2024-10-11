import { LngLatBoundsLike, PaddingOptions, PointLike } from "react-map-gl/maplibre";

import Coordinate from "../../../domain/Coordinate";
import CoordinateBounds, { toLatLngBounds } from "../../../domain/CoordinateBounds";

// World - United States Center
const DEFAULT_CENTER: Coordinate = {
  latitude: 37.0902,
  longitude: -95.7129,
};
const DEFAULT_ZOOM = 2;

/** Manual typing to deal with missing type in react-map-gl */
type ViewState = Partial<import("react-map-gl").ViewState> & {
  bounds?: LngLatBoundsLike;
  fitBoundsOptions?: {
    offset?: PointLike;
    minZoom?: number;
    maxZoom?: number;
    padding?: number | PaddingOptions;
  };
};

export default function createInitialViewState(bounds?: CoordinateBounds): ViewState {
  let initialViewState: ViewState;
  if (bounds) {
    initialViewState = {
      bounds: toLatLngBounds(bounds) as unknown as LngLatBoundsLike,
      fitBoundsOptions: {
        padding: 100,
      },
    };
  } else {
    initialViewState = {
      latitude: DEFAULT_CENTER.latitude,
      longitude: DEFAULT_CENTER.longitude,
      zoom: DEFAULT_ZOOM,
      pitch: 0,
    };
  }
  return initialViewState;
}
