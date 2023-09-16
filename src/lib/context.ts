import React from "react";

export type LayerContextType = {
  id: number;
  parent: null | {
    id: number;
    size: {
      width: number;
      height: number;
    };
  };
};

export const LayerContext = React.createContext<LayerContextType>({
  id: 1,
  parent: null,
});
