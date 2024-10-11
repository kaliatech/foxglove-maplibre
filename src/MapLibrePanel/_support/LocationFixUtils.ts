import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";

import { isTimeEqual } from "./TimeUtils";

export function isLocationFixEqual(l1?: LocationFix, l2?: LocationFix): boolean {
  if (!l1 || !l2) {
    return false;
  }
  return (
    isTimeEqual(l1.timestamp, l2.timestamp) &&
    l1.longitude === l2.longitude &&
    l1.altitude === l2.altitude
  );
}
