import type { ColorRepresentation } from "three";

export type StyleProps = {
  backgroundColor: ColorRepresentation;
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  gap: number | `${number}%`;
  alignItems: "start" | "center" | "end";
  justifyContent: "start" | "center" | "end";
  overflow: "hidden" | "auto" | "visible";
  borderRadius: number | [topLeft: number, topRight: number, bottomRight: number, bottomLeft: number];
  zIndex: number;
  color: ColorRepresentation;
  fontFamily: string;
  fontSize: number;
  textAlign: "center" | "left" | "right" | "justify";
  lineHeight: number;
  verticalAlign: "top" | "middle" | "bottom";
  outlineWidth: number;
  outlineColor: ColorRepresentation;
  outlineOpacity: number;
  outlineOffsetX: number;
  outlineOffsetY: number;
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
