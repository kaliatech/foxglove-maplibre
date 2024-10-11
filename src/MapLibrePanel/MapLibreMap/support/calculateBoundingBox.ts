import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";

import CoordinateBounds from "../../../domain/CoordinateBounds";

export function calculateBoundingBox(locationFixes: LocationFix[]): CoordinateBounds | undefined {
  if (locationFixes.length === 0) {
    return;
  }

  let minLat = locationFixes[0]!.latitude;
  let maxLat = locationFixes[0]!.latitude;
  let minLon = locationFixes[0]!.longitude;
  let maxLon = locationFixes[0]!.longitude;
  let crossesMeridian = false;

  for (const locationFix of locationFixes) {
    //TODOJ: Needs verification and unit tests

    // Adjust latitude bounds
    if (locationFix.latitude < minLat) {
      minLat = locationFix.latitude;
    }
    if (locationFix.latitude > maxLat) {
      maxLat = locationFix.latitude;
    }

    // Adjust longitude calculation to handle meridian crossing
    if (!crossesMeridian) {
      if (Math.abs(maxLon - minLon) > 180) {
        crossesMeridian = true;
      }
    }

    if (crossesMeridian) {
      // When crossing the meridian, we invert the logic to find the "inner" min and max longitudes
      if (
        locationFix.longitude > 0 &&
        locationFix.longitude < 180 &&
        (minLon < -180 || minLon > 0)
      ) {
        minLon = locationFix.longitude;
      }
      if (
        locationFix.longitude < 0 &&
        locationFix.longitude > -180 &&
        (maxLon > 180 || maxLon < 0)
      ) {
        maxLon = locationFix.longitude;
      }
    } else {
      // Normal case, not crossing the meridian
      if (locationFix.longitude < minLon) {
        minLon = locationFix.longitude;
      }
      if (locationFix.longitude > maxLon) {
        maxLon = locationFix.longitude;
      }
    }
  }

  // TODOJ: Check for a minimum bounding size, especially when limited location fixes exist

  return new CoordinateBounds(
    {
      latitude: maxLat,
      longitude: minLon,
    },
    {
      latitude: minLat,
      longitude: maxLon,
    },
  );
}
