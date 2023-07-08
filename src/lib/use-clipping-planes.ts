import React from "react";
import * as THREE from "three";
import { LayerContext } from "@/lib/context";

export default function useClippingPlanes() {
  const context = React.useContext(LayerContext);

  return React.useMemo(() => {
    if (context?.parent?.overflow === "visible") {
      return [];
    }
    const top = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1);
    const right = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 1);
    const bottom = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1);
    const left = new THREE.Plane(new THREE.Vector3(1, 0, 0), 1);
    return [top, right, bottom, left];
  }, [context.parent?.overflow]);
}
