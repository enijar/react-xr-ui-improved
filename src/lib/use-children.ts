import React from "react";
import type { StyleProps } from "@/lib/types";

export default function useChildren(children: React.ReactNode, style: StyleProps) {
  return React.useMemo(() => {
    if (children === undefined) return [];
    const flexDirection = style.flexDirection ?? "row";
    let elements: React.ReactElement[] = Array.isArray(children) ? children : [children];
    elements = elements.filter((element) => React.isValidElement(element));
    switch (flexDirection) {
      case "row-reverse":
      case "column-reverse":
        return elements.reverse();
      default:
        return elements;
    }
  }, [children, style.flexDirection]);
}
