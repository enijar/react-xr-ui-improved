import React from "react";
import { useThree } from "@react-three/fiber";
import { LayerContext } from "@/components/layer/context";

type ContainerSize = {
  width: number;
  height: number;
};

export type SizeProps = {
  width?: number | `${number}%` | ((containerSize: ContainerSize) => number);
  height?: number | `${number}%` | ((containerSize: ContainerSize) => number);
  aspectRatio?: number;
};

const DEFAULT_PROPS: SizeProps = {
  width: 1,
  height: 1,
};

export default function useSize(props: SizeProps) {
  const context = React.useContext(LayerContext);

  const viewport = useThree((state) => state.viewport);

  const containerSize = React.useMemo(() => {
    return {
      width: context.parent?.size?.width ?? viewport.width,
      height: context.parent?.size?.height ?? viewport.height,
    };
  }, [context.parent, viewport.width, viewport.height]);

  return React.useMemo(() => {
    return calculateSize(props, containerSize);
  }, [props, containerSize]);
}

export function calculateSize(props: SizeProps, containerSize: ContainerSize) {
  let width = props.width ?? DEFAULT_PROPS.width;
  let height = props.height ?? DEFAULT_PROPS.height;
  if (typeof width === "function") {
    width = width(containerSize);
  } else if (typeof width !== "number") {
    width = (parseFloat(String(width)) / 100) * containerSize.width;
  }
  if (typeof height === "function") {
    height = height(containerSize);
  } else if (typeof height !== "number") {
    height = (parseFloat(String(height)) / 100) * containerSize.height;
  }
  if (props.aspectRatio !== undefined) {
    if (props.width === undefined && props.height === undefined) {
      height = width * props.aspectRatio;
    } else if (props.width === undefined) {
      width = height * props.aspectRatio;
    } else if (props.height === undefined) {
      height = width * props.aspectRatio;
    }
  }
  return { width, height };
}

type Children = React.ReactElement<SizeProps>[];

export function calculateChildrenSize(
  children: Children,
  containerSize: ContainerSize,
  flexDirection: "row" | "row-reverse" | "column" | "column-reverse" = "row",
  gap: number | `${number}%` = 0
) {
  const lastIndex = Math.max(0, children.length - 1);
  const gapSize = calculateSize({ width: gap, height: gap }, containerSize);
  let width = Math.max(...children.map((child) => calculateChildSize(child, containerSize).width));
  let height = Math.max(...children.map((child) => calculateChildSize(child, containerSize).height));
  if (["row", "row-reverse"].includes(flexDirection)) {
    width = children.reduce((width, child, index) => {
      const size = calculateChildSize(child, containerSize);
      return width + size.width + (index > 0 && index <= lastIndex ? gapSize.width : 0);
    }, 0);
  }
  if (["column", "column-reverse"].includes(flexDirection)) {
    height = children.reduce((height, child, index) => {
      const size = calculateChildSize(child, containerSize);
      return height + size.height + (index > 0 && index <= lastIndex ? gapSize.height : 0);
    }, 0);
  }
  return { width, height };
}

export function calculateChildSize(child: React.ReactElement<SizeProps>, containerSize: ContainerSize) {
  return calculateSize(
    { width: child.props.width, height: child.props.height, aspectRatio: child.props.aspectRatio },
    containerSize
  );
}
