import { PanelExtensionContext } from "@foxglove/extension";
import { LocationFix } from "@foxglove/schemas/schemas/typescript/LocationFix";
import { produce } from "immer";
import { useEffect, useLayoutEffect, useState, JSX } from "react";

import { MapLibreMap } from "./MapLibreMap";
import { TopicConfig } from "./_support/TopicConfig";
import { filterAndConvertMessages } from "./_support/filterAndConvertMessages";

export const MapLibrePanel = ({ context }: { context: PanelExtensionContext }): JSX.Element => {
  const [topicConfigs, _setTopicConfigs] = useState<TopicConfig[]>([
    { topicPath: "/gps", color: "rgba(75,163,248" },
  ]);

  // const [allFrames, setAllFrames] = useState<MessageEvent[]>();
  // const [currFrames, setCurrFrames] = useState<MessageEvent[]>();

  // Map of <topicPath, LocationFix[]>
  const [allLocationFixes, setAllLocationFixes] = useState(new Map<string, LocationFix[]>());

  // Map of <topicPath, LocationFix[]>
  const [currLocationFixes, setCurrLocationFixes] = useState(new Map<string, LocationFix[]>());

  const [renderDone, setRenderDone] = useState<(() => void) | undefined>();

  useLayoutEffect(() => {
    //console.debug("useLayoutEffect");

    context.onRender = (renderState, done) => {
      // Set the done callback into a state variable to trigger a re-render.
      setRenderDone(() => done);

      // We may have new topics - since we are also watching for messages in the current frame, topics may not have changed
      // It is up to you to determine the correct action when state has not changed.
      //   setTopics(renderState.topics);

      // currentFrame
      if (renderState.currentFrame && renderState.currentFrame.length > 0) {
        topicConfigs.forEach((topicConfig) => {
          const locationFixes = filterAndConvertMessages(
            topicConfig.topicPath,
            renderState.currentFrame!,
          );
          setCurrLocationFixes((prev) =>
            produce(prev, (draft) => {
              draft.set(topicConfig.topicPath, locationFixes);
            }),
          );
        });
      }

      // all frames
      // TODOJ: Optimization needed. Unclear how and when allFrames is updated, and how best to only update when changed.
      // if (
      //     allLocations.length !== allFrames.length ||
      //     firstMsg.timestamp.sec !== allLocations[0]?.timestamp.sec ||
      //     lastMsg.timestamp.sec !== allLocations[allLocations.length - 1]?.timestamp.sec
      // )
      if (renderState.allFrames && renderState.allFrames.length > 0) {
        topicConfigs.forEach((topicConfig) => {
          const locationFixes = filterAndConvertMessages(
            topicConfig.topicPath,
            renderState.allFrames!,
          );
          setAllLocationFixes((prev) =>
            produce(prev, (draft) => {
              draft.set(topicConfig.topicPath, locationFixes);
            }),
          );
        });
      }
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
    // TODOJ: research the `convertTo` parameter. Could remove need for the explicit conversion in filterAndConvertMessages.
    context.subscribe([{ topic: "/gps", preload: true }]);
  }, [context, topicConfigs]);

  // invoke the done callback once the render is complete
  useEffect(() => {
    renderDone?.();
  }, [renderDone]);

  return (
    <div style={{ display: "flex", height: "100%", width: "100%" }}>
      <MapLibreMap
        allLocationFixesByTopic={allLocationFixes}
        currLocationFixesByTopic={currLocationFixes}
      />
    </div>
  );
};
