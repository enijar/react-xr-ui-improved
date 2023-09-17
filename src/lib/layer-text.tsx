import React from "react";
import * as THREE from "three";
import { Text, useMask } from "@react-three/drei";
import { ContainerSize, StyleProps } from "@/lib/types";
import useText from "@/lib/use-text";

type Props = {
  textContent: string;
  style: StyleProps;
  size: ContainerSize;
  renderOrder: number;
  mask: ReturnType<typeof useMask>;
};

export default function LayerText({ textContent, style, size, renderOrder, mask }: Props) {
  const text = useText(style, size);

  const updateTextMaterial = React.useCallback(() => {
    text.props.material.opacity = style.opacity;
    if (style.overflow === "visible") {
      text.props.material.stencilWrite = false;
      text.props.material.stencilRef = 0;
      text.props.material.stencilFunc = THREE.AlwaysStencilFunc;
      text.props.material.stencilFail = THREE.KeepStencilOp;
      text.props.material.stencilZFail = THREE.KeepStencilOp;
      text.props.material.stencilZPass = THREE.KeepStencilOp;
    } else {
      Object.assign(text.props.material, mask);
    }
    text.props.material.needsUpdate = true;
  }, [text.props, style.opacity, mask, style.overflow]);

  React.useEffect(updateTextMaterial, [text.props, style.opacity, mask, style.overflow]);

  return (
    <Text {...text.props} renderOrder={renderOrder} onSync={text.updateSize} whiteSpace="normal">
      {textContent}
    </Text>
  );
}
