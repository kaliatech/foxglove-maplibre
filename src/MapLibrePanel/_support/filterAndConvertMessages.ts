import { MessageEvent } from "@foxglove/extension";
import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";

/**
 * Filters messages by topic and transforms message to a LocationFix types.
 * @param topicPath
 * @param messages
 */
export function filterAndConvertMessages(
  topicPath: string,
  messages: readonly MessageEvent[],
): LocationFix[] {
  let warningLogged = false;
  return messages
    .filter((frame) => frame.topic === topicPath)
    .map((frame) => {
      if (!warningLogged && frame.schemaName !== "foxglove.LocationFix") {
        console.warn("Schema name is not foxglove.LocationFix", frame);
        warningLogged = true;
      }
      const msg = frame.message as LocationFix;
      return {
        ...msg,
        timestamp: { sec: frame.receiveTime.sec, nsec: frame.receiveTime.nsec },
      };
    });
}
