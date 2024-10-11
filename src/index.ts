import { ExtensionContext } from "@foxglove/extension";
import { enableMapSet } from "immer";

import { initDebugPanel } from "./DebugPanel/initDebugPanel";
import { initMapLibrePanel } from "./MapLibrePanel/initMapLibrePanel";

export function activate(extensionContext: ExtensionContext): void {
  // Enable native map and set handling in immer.js
  // https://immerjs.github.io/immer/installation#pick-your-immer-version
  enableMapSet();

  extensionContext.registerPanel({ name: "Debug Panel", initPanel: initDebugPanel });
  extensionContext.registerPanel({ name: "MapLibre Panel", initPanel: initMapLibrePanel });
}
