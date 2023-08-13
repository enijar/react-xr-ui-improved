import React from "react";
import type { LayerContextType } from "@/lib/context";
import type { ContainerSize, StyleProps } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";
import { useMask } from "@react-three/drei";

export default function useContextValue(children: React.ReactElement[], style: StyleProps, size: ContainerSize) {
  const id = React.useMemo(() => generateUniqueId(), []);
  const mask = useMask(id);
  return React.useMemo<LayerContextType>(() => {
    const overflow = style.overflow;
    return {
      id,
      parent: { size, overflow },
      mask,
    };
  }, [id, children, style.overflow, size, mask]);
}
