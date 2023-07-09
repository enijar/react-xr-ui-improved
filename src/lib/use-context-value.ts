import React from "react";
import type { LayerContextType } from "@/lib/context";
import type { ContainerSize, StyleProps } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";

export default function useContextValue(children: React.ReactElement[], style: StyleProps, size: ContainerSize) {
  const id = React.useMemo(() => generateUniqueId(), []);
  return React.useMemo<LayerContextType>(() => {
    const overflow = style.overflow ?? "visible";
    return {
      id,
      parent: children === undefined ? null : { size, overflow },
    };
  }, [id, children, size]);
}
