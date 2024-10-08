import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";
import { ReactNode, useMemo, useRef } from "react";
import Map, { MapRef, Marker, NavigationControl } from "react-map-gl/maplibre";
//import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

/**
 * TODOJ: Key is being added to temporarily codebase. This should eventually be removed and the API key revoked in maptiler. The key
 * should instead come from a user setting per foxglove's extensions settings API.
 */
const MAP_TILER_KEY = "9W33cFPB8xW8Npr5O99W";

interface MapLibreMapProps {
  allLocations: LocationFix[];
  //currLocation?: LocationFix;
}

export const MapLibreMap = ({ allLocations }: MapLibreMapProps): ReactNode => {
  const mapRef = useRef<MapRef>(null);

  const initialViewState = useMemo(() => {
    //TODOJ: Optional setting to set a map centering coordinate and/or bounding box even if no locations are available.
    if (allLocations.length === 0) {
      return {
        longitude: -107.0,
        latitude: 38.0,
        zoom: 1,
      };
    } else {
      //TODOJ: Calculate zoom level according to bounding box of all locations.

      mapRef.current?.flyTo({
        center: [allLocations[0]?.longitude ?? 0, allLocations[0]?.latitude ?? 0],
        zoom: 18,
      });

      //console.log("allLocations", allLocations);

      return {
        longitude: allLocations[0]?.longitude,
        latitude: allLocations[0]?.longitude,
        zoom: 18,
      };
    }
  }, [allLocations]);

  //console.log("MapLibrePanel.render", allLocations);

  return (
    <Map
      ref={mapRef}
      RTLTextPlugin={""} // Prevents script load errors due to CSP policy directives
      initialViewState={initialViewState}
      style={{ width: "100%", height: "100%" }}
      attributionControl={false}
      antialias={true}
      // minPitch={0}
      // maxPitch={60}
      // pitch={45}
      // touchPitch={true}
      // pitchWithRotate={true}
      mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${MAP_TILER_KEY}`}
    >
      <NavigationControl visualizePitch={true} />
      {allLocations.map((location, index) => {
        // console.log("location-marker", location);
        return (
          <Marker
            key={`marker-${index.toString()}`}
            longitude={location.longitude}
            latitude={location.latitude}
            // color="red"
            anchor="bottom"
            // onClick={e => {
            //     // If we let the click event propagates to the map, it will immediately close the popup
            //     // with `closeOnClick: true`
            //     e.originalEvent.stopPropagation();
            // }}
          >
            <div style={{ width: 10, height: 10 }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle r="45" cx="50" cy="50" fill="rgb(173, 216, 230)" />
              </svg>
            </div>
          </Marker>
        );
      })}
    </Map>
  );
};
