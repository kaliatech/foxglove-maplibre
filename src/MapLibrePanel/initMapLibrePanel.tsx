import { PanelExtensionContext } from "@foxglove/extension";
import { createRoot } from "react-dom/client";

import { MapLibrePanel } from "./index";

export function initMapLibrePanel(context: PanelExtensionContext): () => void {
  const root = createRoot(context.panelElement);
  root.render(<MapLibrePanel context={context} />);

  // Return a function to run when the panel is removed
  return () => {
    root.unmount();
  };
}
