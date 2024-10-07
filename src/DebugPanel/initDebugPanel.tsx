import { PanelExtensionContext } from "@foxglove/extension";
import { createRoot } from "react-dom/client";

import { DebugPanel } from "./index";

export function initDebugPanel(context: PanelExtensionContext): () => void {
  const root = createRoot(context.panelElement);
  root.render(<DebugPanel context={context} />);

  // Return a function to run when the panel is removed
  return () => {
    root.unmount();
  };
}
