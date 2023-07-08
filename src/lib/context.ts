import React from "react";
import * as THREE from "three";

export type LayerContextType = {
  parent: null | {
    size: {
      width: number;
      height: number;
    };
    overflow: "hidden" | "auto" | "visible";
    clippingPlanes: THREE.Plane[];
  };
};

export const LayerContext = React.createContext<LayerContextType>({
  parent: null,
});
