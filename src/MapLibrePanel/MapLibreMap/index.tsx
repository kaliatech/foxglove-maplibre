import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import Map, { MapRef, NavigationControl } from "react-map-gl/maplibre";

//import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { PositionMarker } from "./markers/PositionMarker";
import { calculateBoundingBox } from "./support/calculateBoundingBox";
import createInitialViewState from "./support/createInitialViewState";
import { isTimeEqual } from "../_support/TimeUtils";
import { toLatLngBounds } from "../../domain/CoordinateBounds";

/**
 * TODOJ: Key is being added to temporarily codebase. This should eventually be removed and the API key revoked in maptiler. The key
 * should instead come from a user setting per foxglove's extensions settings API.
 */
const MAP_TILER_KEY = "9W33cFPB8xW8Npr5O99W";

interface MapLibreMapProps {
  allLocationFixesByTopic: Map<string, LocationFix[]>;
  currLocationFixesByTopic: Map<string, LocationFix[]>;
}

export const MapLibreMap = ({
  allLocationFixesByTopic,
  currLocationFixesByTopic,
}: MapLibreMapProps): ReactNode => {
  const mapRef = useRef<MapRef>(null);

  const [isAutoFitBoundsEnabled, setIsAutoFitBoundsEnabled] = useState(true);

  //const allLocationsBounds = useMemo(() => {
  useEffect(() => {
    if (!isAutoFitBoundsEnabled) {
      return;
    }
    //TODOJ: Disable this upon first user interaction with the map
    const flattenedLocationFixes = [...allLocationFixesByTopic.values()].flatMap((value) => value);
    const newBounds = calculateBoundingBox(flattenedLocationFixes);
    if (newBounds) {
      mapRef.current?.fitBounds(toLatLngBounds(newBounds), { padding: 100 });
    }
  }, [allLocationFixesByTopic, isAutoFitBoundsEnabled]);

  const initialViewState = useMemo(() => {
    //TODOJ: Probably no reason to do this repeatedly

    const flattenedLocationFixes = [...allLocationFixesByTopic.values()].flatMap((value) => value);
    const locationFixesBounds = calculateBoundingBox(flattenedLocationFixes);

    //TODOJ: Optional setting to set a map centering coordinate and/or bounding box even if no locations are available.
    if (flattenedLocationFixes.length === 0) {
      return {
        longitude: -107.0,
        latitude: 38.0,
        zoom: 1,
      };
    }
    // //TODOJ: Calculate zoom level according to bounding box of all locations.
    // mapRef.current?.flyTo({
    //   center: [allLocations[0]?.longitude ?? 0, allLocations[0]?.latitude ?? 0],
    //   zoom: 18,
    // });

    // return {
    //   longitude: allLocations[0]?.longitude,
    //   latitude: allLocations[0]?.longitude,
    //   zoom: 18,
    // };

    return createInitialViewState(locationFixesBounds);
  }, [allLocationFixesByTopic]);

  //console.log("MapLibrePanel.render", allLocationFixesByTopic);
  //console.log("MapLibrePanel.render", currLocationFixesByTopic);

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
      onClick={() => {
        setIsAutoFitBoundsEnabled(false);
      }}
      // onLoad={(_e: MapEvent) => {
      // }}
    >
      <NavigationControl visualizePitch={true} />
      {[...allLocationFixesByTopic.entries()].map(([topicName, locationFixes]) => {
        const currFixes = currLocationFixesByTopic.get(topicName);
        return locationFixes.map((location, index) => {
          if (
            currFixes &&
            currFixes.length > 0 &&
            isTimeEqual(location.timestamp, currFixes[0]!.timestamp)
          ) {
            // we add current location marker separately
            return null;
            //alternatively:
            // <PositionMarker locationFix={location} size="13px" isHighlighted={true} />
          } else {
            return <PositionMarker key={`marker-${index.toString()}`} locationFix={location} />;
          }
        });
      })}

      {[...currLocationFixesByTopic.entries()].map(([_topicName, currLocationFixes]) => {
        return currLocationFixes.map((currLocationFix, index) => (
          <PositionMarker
            key={`curr-marker-${index.toString()}`}
            locationFix={currLocationFix}
            size="13px"
            isHighlighted={true}
          />
        ));
      })}
    </Map>
  );
};
