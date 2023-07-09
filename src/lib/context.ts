import React from "react";

export type LayerContextType = {
  id: number;
  parent: null | {
    size: {
      width: number;
      height: number;
    };
    overflow: "hidden" | "auto" | "visible";
  };
};

export const LayerContext = React.createContext<LayerContextType>({
  id: 1,
  parent: null,
});
