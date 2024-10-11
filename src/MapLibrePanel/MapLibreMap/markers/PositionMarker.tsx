import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";
import { ReactNode } from "react";
import { Marker } from "react-map-gl/maplibre";

interface PositionMarkerProps {
  locationFix: LocationFix;
  size?: string;
  isHighlighted?: boolean;
}

export const PositionMarker = ({
  locationFix,
  size = "10px",
  isHighlighted = false,
}: PositionMarkerProps): ReactNode => {
  const color = isHighlighted ? "rgba(57,110,159,1.0)" : "rgba(75,163,248,0.5)";
  return (
    <Marker
      longitude={locationFix.longitude}
      latitude={locationFix.latitude}
      // color="red"
      anchor="bottom"
      style={{ zIndex: isHighlighted ? 2000 : 1000 }}
      // onClick={e => {
      //     // If we let the click event propagates to the map, it will immediately close the popup
      //     // with `closeOnClick: true`
      //     e.originalEvent.stopPropagation();
      // }}
    >
      <div style={{ width: size, height: size }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle r="45" cx="50" cy="50" fill={color} />
        </svg>
      </div>
    </Marker>
  );
};
