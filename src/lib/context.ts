import React from "react";
import * as THREE from "three";

export type LayerContextType = {
  id: number;
  parent: null | {
    size: {
      width: number;
      height: number;
    };
    overflow: "hidden" | "auto" | "visible";
  };
  mask: null | { stencilFunc: THREE.StencilFunc; stencilRef: number };
};

export const LayerContext = React.createContext<LayerContextType>({
  id: 1,
  parent: null,
  mask: {
    stencilFunc: THREE.EqualStencilFunc,
    stencilRef: 1,
  },
});
