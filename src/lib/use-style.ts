import React from "react";
import { StyleProps } from "@/lib/types";

export default function useStyle(style?: Partial<StyleProps>) {
  return React.useMemo<StyleProps>(() => {
    const props = style ?? {};
    return {
      backgroundColor: props.backgroundColor ?? "#ffffff",
      flexDirection: props.flexDirection ?? "row",
      gap: props.gap ?? 0,
      alignItems: props.alignItems ?? "center",
      justifyContent: props.justifyContent ?? "center",
      overflow: props.overflow ?? "visible",
      scrollbarVisible: props.scrollbarVisible ?? true,
    };
  }, [style]);
}
