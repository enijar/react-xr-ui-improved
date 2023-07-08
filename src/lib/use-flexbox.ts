import React from "react";
import { calculateChildrenSize, calculateChildSize, calculateSize } from "@/lib/use-size";
import type { ContainerSize, StyleProps } from "@/lib/types";

export default function useFlexbox(children: React.ReactElement[], containerSize: ContainerSize, style: StyleProps) {
  return React.useMemo(() => {
    if (children.length === 0) {
      return { x: 0, y: 0 };
    }
    const flexDirection = style.flexDirection;
    const alignItems = style.alignItems;
    const justifyContent = style.justifyContent;
    const childrenSize = calculateChildrenSize(children, containerSize, style);
    let x = 0;
    let y = 0;
    switch (flexDirection) {
      case "row":
      case "row-reverse":
        switch (alignItems) {
          case "start":
            y = containerSize.height / 2 - childrenSize.height / 2;
            break;
          case "center":
            y = 0;
            break;
          case "end":
            y = containerSize.height / -2 + childrenSize.height / 2;
            break;
        }
        switch (justifyContent) {
          case "start":
            x = containerSize.width / -2;
            break;
          case "center":
            x = childrenSize.width / -2;
            break;
          case "end":
            x = containerSize.width / 2 - childrenSize.width;
            break;
        }
        break;
      case "column":
      case "column-reverse":
        switch (alignItems) {
          case "start":
            x = containerSize.width / -2 + childrenSize.width / 2;
            break;
          case "center":
            x = 0;
            break;
          case "end":
            x = containerSize.width / 2 - childrenSize.width / 2;
            break;
        }
        switch (justifyContent) {
          case "start":
            y = containerSize.height / 2;
            break;
          case "center":
            y = childrenSize.height / 2;
            break;
          case "end":
            y = containerSize.height / -2 + childrenSize.height;
            break;
        }
        break;
    }
    return { x, y };
  }, [containerSize, children, style]);
}

export function calculateChildPosition(
  child: React.ReactElement,
  index: number,
  children: React.ReactElement[],
  style: StyleProps,
  containerSize: ContainerSize
) {
  return React.useMemo(() => {
    const lastIndex = Math.max(0, children.length - 1);
    const gapSize = calculateSize({ width: style.gap, height: style.gap }, containerSize);
    const childSize = calculateChildSize(child, containerSize);
    let x = 0;
    let y = 0;
    const childrenSize = calculateChildrenSize(children, containerSize, style);
    for (let i = 0; i <= index; i++) {
      if (["row", "row-reverse"].includes(style.flexDirection)) {
        const offsetY = childSize.height < childrenSize.height ? (childrenSize.height - childSize.height) / 2 : 0;
        if (style.alignItems === "start") {
          y = offsetY;
        }
        if (style.alignItems === "end") {
          y = -offsetY;
        }
        if (i === 0) {
          x += childSize.width / 2;
        } else {
          const prevChild = children[i - 1];
          const prevChildSize = calculateChildSize(prevChild, containerSize);
          x += prevChildSize.width;
          if (i <= lastIndex) {
            x += gapSize.width;
          }
        }
        continue;
      }
      const offsetX = childSize.width < childrenSize.width ? (childrenSize.width - childSize.width) / 2 : 0;
      if (style.alignItems === "start") {
        x = -offsetX;
      }
      if (style.alignItems === "end") {
        x = offsetX;
      }
      if (i === 0) {
        y -= childSize.height / 2;
      } else {
        const prevChild = children[i - 1];
        const prevChildSize = calculateChildSize(prevChild, containerSize);
        y -= prevChildSize.height;
        if (i <= lastIndex) {
          y -= gapSize.height;
        }
      }
    }
    return { x, y };
  }, []);
}
