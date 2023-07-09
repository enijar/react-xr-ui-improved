import React from "react";
import type { LayerContextType } from "@/lib/context";
import type { ContainerSize, StyleProps } from "@/lib/types";

export default function useContextValue(children: React.ReactElement[], style: StyleProps, size: ContainerSize) {
  return React.useMemo<LayerContextType>(() => {
    const overflow = style.overflow ?? "visible";
    return {
      parent: children === undefined ? null : { size, overflow },
    };
  }, [children, size]);
}
