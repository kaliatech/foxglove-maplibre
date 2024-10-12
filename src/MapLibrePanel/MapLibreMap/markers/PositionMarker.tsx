import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";
import { ReactNode, useEffect, useState } from "react";
import { Marker } from "react-map-gl/maplibre";

interface PositionMarkerProps {
  locationFix: LocationFix;
  size?: number;
  isHighlighted?: boolean;
  onLocationFixMouseEnter?: (locationFix: LocationFix) => void;
  onLocationFixMouseLeave?: (locationFix: LocationFix) => void;
  onLocationFixClick?: (locationFix: LocationFix) => void;
}

//TODOJ: This should be a user setting per topic and passed here as props
const DEFAULT_COLOR = "rgba(75,163,248,0.5)";

export const PositionMarker = ({
  locationFix,
  size = 10,
  isHighlighted = false,
  onLocationFixMouseEnter,
  onLocationFixMouseLeave,
  onLocationFixClick,
}: PositionMarkerProps): ReactNode => {
  const [color, setColor] = useState<string>(DEFAULT_COLOR);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    //TODOJ: Using light/darken color utility function
    setColor(isHighlighted ? "rgba(57,110,159,1.0)" : DEFAULT_COLOR);
    if (isHovered) {
      setColor("rgb(39,77,112)");
    }
  }, [isHighlighted, isHovered]);

  const handleMouseEnter = (evt: React.MouseEvent) => {
    evt.stopPropagation();
    setIsHovered(true);
    onLocationFixMouseEnter?.(locationFix);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLocationFixMouseLeave?.(locationFix);
  };

  const handleMouseClick = () => {
    onLocationFixClick?.(locationFix);
  };

  return (
    <Marker
      longitude={locationFix.longitude}
      latitude={locationFix.latitude}
      // color="red"
      anchor="bottom"
      style={{ zIndex: isHighlighted ? 2000 : 1000, cursor: "pointer" }}
      // onClick={e => {
      //     // If we let the click event propagates to the map, it will immediately close the popup
      //     // with `closeOnClick: true`
      //     e.originalEvent.stopPropagation();
      // }}
    >
      <div
        style={{ width: size * 2, height: size * 2 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
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
      </div>
    </Marker>
  );
};
