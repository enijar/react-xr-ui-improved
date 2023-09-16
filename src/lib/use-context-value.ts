import React from "react";
import type { LayerContextType } from "@/lib/context";
import type { ContainerSize } from "@/lib/types";
import { generateUniqueId } from "@/lib/utils";

export default function useContextValue(children: React.ReactElement[], size: ContainerSize) {
  const id = React.useMemo(() => generateUniqueId(), []);
  return React.useMemo<LayerContextType>(() => {
    return {
      id,
      parent: { id, size },
    };
  }, [id, children, size]);
}
