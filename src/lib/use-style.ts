import React from "react";
import { StyleProps } from "@/lib/types";

const EMPTY_STYLE = {};

export default function useStyle(style: Partial<StyleProps> = EMPTY_STYLE) {
  return React.useMemo<StyleProps>(() => {
    return {
      backgroundColor: style.backgroundColor ?? "#ffffff",
      flexDirection: style.flexDirection ?? "row",
      gap: style.gap ?? 0,
      alignItems: style.alignItems ?? "center",
      justifyContent: style.justifyContent ?? "center",
      overflow: style.overflow ?? "visible",
      scrollbarVisible: style.scrollbarVisible ?? true,
    };
  }, [style]);
}
