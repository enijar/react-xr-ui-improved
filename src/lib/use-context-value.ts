import React from "react";
import type { LayerContextType } from "@/lib/context";
import type { ContainerSize, StyleProps } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";
import { LayerContext } from "@/lib/context";

export default function useContextValue(children: React.ReactElement[], style: StyleProps, size: ContainerSize) {
  const id = React.useMemo(() => generateUniqueId(), []);
  return React.useMemo<LayerContextType>(() => {
    const overflow = style.overflow ?? "visible";
    return {
      id,
      parent: { size, overflow },
    };
  }, [id, children, style.overflow, size]);
}
