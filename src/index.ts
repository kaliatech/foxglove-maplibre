import { ExtensionContext } from "@foxglove/extension";

import { initDebugPanel } from "./DebugPanel/initDebugPanel";
import { initMapLibrePanel } from "./MapLibrePanel/initMapLibrePanel";

export function activate(extensionContext: ExtensionContext): void {
  extensionContext.registerPanel({ name: "Debug Panel", initPanel: initDebugPanel });
  extensionContext.registerPanel({ name: "MapLibre Panel", initPanel: initMapLibrePanel });
}
