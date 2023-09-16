import type { ColorRepresentation } from "three";
import * as THREE from "three";

export type ScaledValue = number | `${number}%`;

export type StyleProps = {
  backgroundColor: ColorRepresentation;
  backgroundImage: string;
  backgroundSize:
    | "contain"
    | "cover"
    | "stretch"
    | [width: `${number}%` | "auto" | number, height: `${number}%` | "auto" | number];
  backgroundPosition: [x: `${number}%` | number, y: `${number}%` | number];
  opacity: number;
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  gap: ScaledValue;
  alignItems: "start" | "center" | "end";
  justifyContent: "start" | "center" | "end";
  overflow: "hidden" | "auto" | "visible";
  borderRadius: number | [topLeft: number, topRight: number, bottomRight: number, bottomLeft: number];
  zIndex: number;
  color: ColorRepresentation;
  fontFamily: string;
  fontSize: ScaledValue;
  textAlign: "center" | "left" | "right" | "justify";
  lineHeight: number;
  verticalAlign: "top" | "middle" | "bottom";
  outlineWidth: ScaledValue;
  outlineColor: ColorRepresentation;
  outlineOpacity: number;
  outlineOffsetX: ScaledValue;
  outlineOffsetY: ScaledValue;
};

export type ContainerSize = {
  width: number;
  height: number;
};

export type SizeProps = {
  width?: number | `${number}%` | ((containerSize: ContainerSize) => number);
  height?: number | `${number}%` | ((containerSize: ContainerSize) => number);
  aspectRatio?: number;
};

export type ScrollerStyleProps = {
  size: number;
  trackColor: ColorRepresentation;
  thumbColor: ColorRepresentation;
};

export type Position = [x?: number, y?: number, z?: number];

export type BackgroundImageRef = THREE.Mesh<THREE.ShapeGeometry, THREE.MeshBasicMaterial>;
