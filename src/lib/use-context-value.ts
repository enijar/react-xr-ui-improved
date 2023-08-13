import React from "react";
import * as THREE from "three";
import type { LayerContextType } from "@/lib/context";
import type { ContainerSize, StyleProps } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";

export default function useContextValue(children: React.ReactElement[], style: StyleProps, size: ContainerSize) {
  const id = React.useMemo(() => generateUniqueId(), []);
  const mask = React.useMemo(() => {
    return {
      stencilFunc: THREE.EqualStencilFunc,
      stencilRef: id,
    };
  }, [id]);
  return React.useMemo<LayerContextType>(() => {
    const overflow = style.overflow;
    return {
      id,
      parent: { size, overflow },
      mask,
    };
  }, [id, children, style.overflow, size, mask]);
}
