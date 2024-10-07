import { Immutable, MessageEvent, PanelExtensionContext } from "@foxglove/extension";
import { useEffect, useLayoutEffect, useState, JSX } from "react";
import { MapLibreMap } from "./MapLibreMap";

export const MapLibrePanel = ({ context }: { context: PanelExtensionContext }): JSX.Element => {
  //  const [topics, setTopics] = useState<undefined | Immutable<Topic[]>>();
  const [_currFrameMsgs, setCurrFrameMsgs] = useState<undefined | Immutable<MessageEvent[]>>();

  const [_allFrameMsgs, setAllFrameMsgs] = useState<undefined | Immutable<MessageEvent[]>>();

  const [renderDone, setRenderDone] = useState<(() => void) | undefined>();

  useLayoutEffect(() => {
    //console.debug("useLayoutEffect");

    context.onRender = (renderState, done) => {
      // Set the done callback into a state variable to trigger a re-render.
      setRenderDone(() => done);

      // We may have new topics - since we are also watching for messages in the current frame, topics may not have changed
      // It is up to you to determine the correct action when state has not changed.
      //   setTopics(renderState.topics);

      // currentFrame has messages on subscribed topics since the last render call
      if (renderState.currentFrame) {
        setCurrFrameMsgs(renderState.currentFrame);
      }

      if (renderState.allFrames) {
        setAllFrameMsgs(renderState.allFrames);
      }

      //console.log("renderState", renderState);
    };

    // After adding a render handler, you must indicate which fields from RenderState will trigger updates.
    // If you do not watch any fields then your panel will never render since the panel context will assume you do not want any updates.

    // tell the panel context that we care about any update to the _topic_ field of RenderState
    context.watch("topics");

    // tell the panel context we want messages for the current frame for topics we've subscribed to
    // This corresponds to the _currentFrame_ field of render state.
    context.watch("currentFrame");

    // all frames to display gps history on map
    context.watch("allFrames");

    // subscribe to some topics, you could do this within other effects, based on input fields, etc
    // Once you subscribe to topics, currentFrame will contain message events from those topics (assuming there are messages).
    context.subscribe([{ topic: "/gps", preload: true }]);
  }, [context]);

  // invoke the done callback once the render is complete
  useEffect(() => {
    renderDone?.();
  }, [renderDone]);
  //
  // console.log("allFrameMsgs", allFrameMsgs);
  // console.log("currFrameMsgs", currFrameMsgs);

  return (
    <div>
      <MapLibreMap />
    </div>
  );
};
