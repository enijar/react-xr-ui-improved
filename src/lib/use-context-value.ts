import React from "react";
import { LayerContextType } from "@/lib/context";
import { ContainerSize, StyleProps } from "@/lib/types";

export default function useContextValue(children: React.ReactElement[], style: StyleProps, size: ContainerSize) {
  return React.useMemo<LayerContextType>(() => {
    const overflow = style.overflow ?? "visible";
    return {
      parent: children === undefined ? null : { size, overflow },
    };
  }, [children, size]);
}
