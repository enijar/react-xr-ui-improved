import React from "react";
import * as THREE from "three";
import type { ContainerSize, StyleProps } from "@/lib/types";

export default function useRoundedPlane(size: ContainerSize, style: StyleProps) {
  return React.useMemo(() => {
    const shape = new THREE.Shape();
    const maxRadius = Math.min(size.width, size.height) / 2;
    const br = style.borderRadius;
    let radiusTopLeft = typeof br === "number" ? br : br[0];
    let radiusTopRight = typeof br === "number" ? br : br[1];
    let radiusBottomRight = typeof br === "number" ? br : br[2];
    let radiusBottomLeft = typeof br === "number" ? br : br[3];
    radiusTopLeft = Math.min(maxRadius, radiusTopLeft);
    radiusTopRight = Math.min(maxRadius, radiusTopRight);
    radiusBottomRight = Math.min(maxRadius, radiusBottomRight);
    radiusBottomLeft = Math.min(maxRadius, radiusBottomLeft);
    const width = size.width;
    const height = size.height;
    shape.moveTo(-width / 2 + radiusTopLeft, height / 2);
    // Top-right corner
    shape.lineTo(width / 2 - radiusTopRight, height / 2);
    shape.absarc(width / 2 - radiusTopRight, height / 2 - radiusTopRight, radiusTopRight, Math.PI * 1.5, 0, true);
    // Bottom-right corner
    shape.lineTo(width / 2, -height / 2 + radiusBottomRight);
    shape.absarc(
      width / 2 - radiusBottomRight,
      -height / 2 + radiusBottomRight,
      radiusBottomRight,
      0,
      Math.PI * 1.5,
      true,
    );
    // Bottom-left corner
    shape.lineTo(-width / 2 + radiusBottomLeft, -height / 2);
    shape.absarc(
      -width / 2 + radiusBottomLeft,
      -height / 2 + radiusBottomLeft,
      radiusBottomLeft,
      Math.PI * 0.5,
      Math.PI,
      true,
    );
    // Top-left corner
    shape.lineTo(-width / 2, height / 2 - radiusTopLeft);
    shape.absarc(-width / 2 + radiusTopLeft, height / 2 - radiusTopLeft, radiusTopLeft, Math.PI, Math.PI * 1.5, true);
    return shape;
  }, [size.width, size.height, style.borderRadius]);
}
