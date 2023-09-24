import React from "react";
import { calculateChildrenSize, calculateChildSize, calculateSize } from "@/lib/use-size";
import type { ContainerSize, StyleProps } from "@/lib/types";

export default function useFlexbox(children: React.ReactElement[], containerSize: ContainerSize, style: StyleProps) {
  return React.useMemo(() => {
    if (children.length === 0) {
      return { x: 0, y: 0 };
    }
    const childrenSize = calculateChildrenSize(children, containerSize, style);
    const gapSize = calculateSize({ width: style.gap, height: style.gap }, containerSize);
    const childrenSizeWithoutGap = {
      width: childrenSize.width - gapSize.width * Math.max(0, children.length - 1),
      height: childrenSize.height - gapSize.height * Math.max(0, children.length - 1),
    };
    let x = 0;
    let y = 0;
    let availableSpaceAround = 0;
    switch (style.flexDirection) {
      case "row":
      case "row-reverse":
        availableSpaceAround = Math.max(0, containerSize.width - childrenSizeWithoutGap.width);
        break;
      case "column":
      case "column-reverse":
        availableSpaceAround = Math.max(0, containerSize.height - childrenSizeWithoutGap.height);
        break;
    }
    let spaceAroundChildren = 0;
    if (availableSpaceAround > 0 && children.length > 1) {
      spaceAroundChildren = availableSpaceAround / (children.length + 1);
    }
    switch (style.flexDirection) {
      case "row":
      case "row-reverse":
        switch (style.alignItems) {
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
        switch (style.justifyContent) {
          case "start":
          case "space-between":
            x = containerSize.width / -2;
            break;
          case "center":
            x = childrenSize.width / -2;
            break;
          case "end":
            x = containerSize.width / 2 - childrenSize.width;
            break;
          case "space-around":
            x = containerSize.width / -2 + spaceAroundChildren;
            break;
        }
        break;
      case "column":
      case "column-reverse":
        switch (style.alignItems) {
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
        switch (style.justifyContent) {
          case "start":
          case "space-between":
            y = containerSize.height / 2;
            break;
          case "center":
            y = childrenSize.height / 2;
            break;
          case "end":
            y = containerSize.height / -2 + childrenSize.height;
            break;
          case "space-around":
            y = containerSize.height / 2 - spaceAroundChildren;
            break;
        }
        break;
    }
    return { x, y };
  }, [
    containerSize.width,
    containerSize.height,
    children,
    style.flexDirection,
    style.alignItems,
    style.justifyContent,
    style.gap,
  ]);
}

export function calculateChildPosition(
  child: React.ReactElement,
  index: number,
  children: React.ReactElement[],
  style: StyleProps,
  containerSize: ContainerSize,
) {
  const lastIndex = Math.max(0, children.length - 1);
  const gapSize = calculateSize({ width: style.gap, height: style.gap }, containerSize);
  const childSize = calculateChildSize(child, containerSize);
  let x = 0;
  let y = 0;
  const childrenSize = calculateChildrenSize(children, containerSize, style);
  const childrenSizeWithoutGap = {
    width: childrenSize.width - gapSize.width * Math.max(0, children.length - 1),
    height: childrenSize.height - gapSize.height * Math.max(0, children.length - 1),
  };
  let availableSpaceBetween = 0;
  switch (style.flexDirection) {
    case "row":
    case "row-reverse":
      availableSpaceBetween = Math.max(0, containerSize.width - childrenSizeWithoutGap.width);
      break;
    case "column":
    case "column-reverse":
      availableSpaceBetween = Math.max(0, containerSize.height - childrenSizeWithoutGap.height);
      break;
  }
  let spaceBetweenChildren = 0;
  if (availableSpaceBetween > 0 && children.length > 1) {
    spaceBetweenChildren = availableSpaceBetween / (children.length - 1);
  }
  let availableSpaceAround = 0;
  switch (style.flexDirection) {
    case "row":
    case "row-reverse":
      availableSpaceAround = Math.max(0, containerSize.width - childrenSizeWithoutGap.width);
      break;
    case "column":
    case "column-reverse":
      availableSpaceAround = Math.max(0, containerSize.height - childrenSizeWithoutGap.height);
      break;
  }
  let spaceAroundChildren = 0;
  if (availableSpaceAround > 0 && children.length > 1) {
    spaceAroundChildren = availableSpaceAround / (children.length + 1);
  }
  for (let i = 0; i <= index; i++) {
    const offsetY = childSize.height < childrenSize.height ? (childrenSize.height - childSize.height) / 2 : 0;
    switch (style.flexDirection) {
      case "row":
      case "row-reverse":
        switch (style.alignItems) {
          case "start":
            y = offsetY;
            break;
          case "center":
            y = 0;
            break;
          case "end":
            y = -offsetY;
            break;
        }
        switch (style.justifyContent) {
          case "start":
          case "center":
          case "end":
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
            break;
          case "space-between":
            if (i === 0) {
              x += childSize.width / 2;
            } else {
              const prevChild = children[i - 1];
              const prevChildSize = calculateChildSize(prevChild, containerSize);
              x += prevChildSize.width;
              if (i <= lastIndex) {
                x += spaceBetweenChildren;
              }
            }
            break;
          case "space-around":
            if (i === 0) {
              x += childSize.width / 2;
            } else {
              const prevChild = children[i - 1];
              const prevChildSize = calculateChildSize(prevChild, containerSize);
              x += prevChildSize.width;
              if (i <= lastIndex) {
                x += spaceAroundChildren;
              }
            }
            break;
        }
        break;
      case "column":
      case "column-reverse":
        const offsetX = childSize.width < childrenSize.width ? (childrenSize.width - childSize.width) / 2 : 0;
        switch (style.alignItems) {
          case "start":
            x = -offsetX;
            break;
          case "center":
            x = 0;
            break;
          case "end":
            x = offsetX;
            break;
        }
        switch (style.justifyContent) {
          case "start":
          case "center":
          case "end":
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
            break;
          case "space-between":
            if (i === 0) {
              y -= childSize.height / 2;
            } else {
              const prevChild = children[i - 1];
              const prevChildSize = calculateChildSize(prevChild, containerSize);
              y -= prevChildSize.height;
              if (i <= lastIndex) {
                y -= spaceBetweenChildren;
              }
            }
            break;
          case "space-around":
            if (i === 0) {
              y -= childSize.height / 2;
            } else {
              const prevChild = children[i - 1];
              const prevChildSize = calculateChildSize(prevChild, containerSize);
              y -= prevChildSize.height;
              if (i <= lastIndex) {
                y -= spaceAroundChildren;
              }
            }
            break;
        }
        break;
    }
  }
  return { x, y };
}
