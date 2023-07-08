import React from "react";
import * as THREE from "three";
import { LayerContext } from "@/lib/context";
import type { ContainerSize } from "@/lib/types";

export default function useClippingPlanes(size: ContainerSize) {
  const context = React.useContext(LayerContext);

  return React.useMemo(() => {
    if (context?.parent?.overflow === "visible") {
      return [];
    }
    if (context.parent !== null) {
      return context.parent.clippingPlanes;
    }
    const width = size.width / 2;
    const height = size.height / 2;
    return [
      new THREE.Plane(new THREE.Vector3(-1, 0, 0), width), // Left
      new THREE.Plane(new THREE.Vector3(1, 0, 0), width), // Right
      new THREE.Plane(new THREE.Vector3(0, -1, 0), height), // Bottom
      new THREE.Plane(new THREE.Vector3(0, 1, 0), height), // Top
    ];
  }, [context.parent, context?.parent?.overflow, size]);
}
