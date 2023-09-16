import React from "react";
import * as THREE from "three";
import { calculateScaledSize } from "@/lib/use-size";
import { ContainerSize, StyleProps } from "@/lib/types";

export default function useText(style: StyleProps, containerSize: ContainerSize) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  const anchor = React.useMemo(() => {
    let x: number | "left" | "center" | "right" = 0;
    let y: number | "top" | "top-baseline" | "middle" | "bottom-baseline" | "bottom" = 0;
    switch (style.textAlign) {
      case "left":
        x = containerSize.width / 2;
        break;
      case "center":
      case "justify":
        x = "center";
        break;
      case "right":
        x = containerSize.width / -2 + size.width;
        break;
    }
    switch (style.verticalAlign) {
      case "top":
        y = containerSize.height / -2;
        break;
      case "middle":
        y = "middle";
        break;
      case "bottom":
        y = containerSize.height / 2 - size.height;
        break;
    }
    return { x, y };
  }, [style.textAlign, style.verticalAlign, size]);

  const textMaterial = React.useMemo(() => {
    return new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, side: THREE.FrontSide });
  }, []);

  const fontSize = React.useMemo(() => {
    const smallestDimension = Math.min(containerSize.width, containerSize.height);
    return calculateScaledSize(style.fontSize, smallestDimension);
  }, [style.fontSize, containerSize]);

  const outlineWidth = React.useMemo(() => {
    return calculateScaledSize(style.outlineWidth, fontSize);
  }, [style.outlineWidth, fontSize]);

  const outlineOffset = React.useMemo(() => {
    return [
      calculateScaledSize(style.outlineOffset[0], fontSize),
      calculateScaledSize(style.outlineOffset[1], fontSize),
    ];
  }, [style.outlineOffset, fontSize]);

  const props = React.useMemo(() => {
    return {
      material: textMaterial,
      fontSize,
      font: style.fontFamily,
      outlineWidth,
      outlineOffsetX: outlineOffset[0],
      outlineOffsetY: outlineOffset[1],
      anchorX: anchor.x,
      anchorY: anchor.y,
      textAlign: style.textAlign,
      lineHeight: style.lineHeight,
      outlineColor: style.outlineColor,
      outlineOpacity: style.outlineOpacity,
      color: style.color,
      maxWidth: containerSize.width,
    };
  }, [
    textMaterial,
    fontSize,
    outlineWidth,
    outlineOffset,
    anchor,
    style.fontFamily,
    style.textAlign,
    style.lineHeight,
    style.outlineColor,
    style.outlineOpacity,
    style.color,
    containerSize,
  ]);

  const updateSize = React.useCallback((troika: any) => {
    const box = troika.geometry.boundingBox;
    if (box === null) return;
    const width = box.max.x - box.min.x;
    const height = box.max.y - box.min.y;
    setSize((size) => {
      if (size.width === width && size.height === height) {
        return size;
      }
      return { width, height };
    });
  }, []);

  return React.useMemo(() => {
    return { props, updateSize };
  }, [props, updateSize]);
}
