import React from "react";
import type { LayerContextType } from "@/lib/context";
import type { ContainerSize, StyleProps } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";
import * as THREE from "three";
import { LayerContext } from "@/lib/context";

export default function useContextValue(children: React.ReactElement[], style: StyleProps, size: ContainerSize) {
  const { parent } = React.useContext(LayerContext);
  const id = React.useMemo(() => generateUniqueId(), []);
  return React.useMemo<LayerContextType>(() => {
    let hasMask = style.overflow !== "visible";
    if (parent !== null && parent.hasMask) {
      hasMask = false;
    }
    return {
      id,
      parent: { size, overflow: style.overflow, hasMask, id },
      mask: !hasMask
        ? {}
        : {
            stencilWrite: true,
            stencilRef: id,
            stencilFunc: THREE.AlwaysStencilFunc,
            stencilFail: THREE.ReplaceStencilOp,
            stencilZFail: THREE.ReplaceStencilOp,
            stencilZPass: THREE.ReplaceStencilOp,
          },
    };
  }, [id, children, style.overflow, size, parent]);
}
