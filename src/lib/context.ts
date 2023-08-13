import React from "react";
import { useMask } from "@react-three/drei";

export type LayerContextType = {
  id: number;
  parent: null | {
    size: {
      width: number;
      height: number;
    };
    overflow: "hidden" | "auto" | "visible";
  };
  mask: null | ReturnType<typeof useMask>;
};

export const LayerContext = React.createContext<LayerContextType>({
  id: 1,
  parent: null,
  mask: null,
});
