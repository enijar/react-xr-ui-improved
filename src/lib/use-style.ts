import React from "react";
import { StyleProps } from "@/lib/types";

export default function useStyle(style?: Partial<StyleProps>) {
  return React.useMemo<StyleProps>(() => {
    const props = style ?? {};
    return {
      backgroundColor: props.backgroundColor ?? "#ffffff",
      flexDirection: props.flexDirection ?? "column",
      gap: props.gap ?? 0,
      alignItems: props.alignItems ?? "start",
      justifyContent: props.justifyContent ?? "start",
      overflow: props.overflow ?? "visible",
      borderRadius: props.borderRadius ?? 0,
      zIndex: props.zIndex ?? 0,
    };
  }, [style]);
}
