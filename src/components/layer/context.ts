import React from "react";

export type LayerContextType = {
  parent: null | {
    size: {
      width: number;
      height: number;
    };
  };
};

export const LayerContext = React.createContext<LayerContextType>({
  parent: null,
});
