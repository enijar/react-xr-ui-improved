import type { ColorRepresentation } from "three";

export type StyleProps = {
  backgroundColor: ColorRepresentation;
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse";
  gap: number | `${number}%`;
  alignItems: "start" | "center" | "end";
  justifyContent: "start" | "center" | "end";
  overflow: "hidden" | "auto" | "visible";
  scrollbarVisible: boolean;
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
