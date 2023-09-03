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
    hasMask: boolean;
    id: number;
  };
  mask:
    | {}
    | {
        stencilWrite: boolean;
        stencilRef: number;
        stencilFunc: THREE.StencilFunc;
        stencilFail: THREE.StencilOp;
        stencilZFail: THREE.StencilOp;
        stencilZPass: THREE.StencilOp;
      };
};

export const LayerContext = React.createContext<LayerContextType>({
  id: 1,
  parent: null,
  mask: {},
});
