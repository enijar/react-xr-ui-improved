import React from "react";
import * as THREE from "three";
import { Mask, Text, useMask } from "@react-three/drei";
import useSize from "@/lib/use-size";
import { LayerContext } from "@/lib/context";
import type { Position, SizeProps, StyleProps } from "@/lib/types";
import useChildren from "@/lib/use-children";
import useFlexbox, { calculateChildPosition } from "@/lib/use-flexbox";
import useStyle, { UseStyle } from "@/lib/use-style";
import useContextValue from "@/lib/use-context-value";
import useRoundedPlane from "@/lib/use-rounded-plane";
import useText from "@/lib/use-text";
import useTexture from "@/lib/use-texture";
import { BackgroundImageRef } from "@/lib/types";

type Props = {
  width?: SizeProps["width"];
  height?: SizeProps["height"];
  aspectRatio?: SizeProps["aspectRatio"];
  children?: React.ReactNode;
  style?: Partial<StyleProps>;
  position?: Position;
  text?: string;
};

const SHAPE_DETAIL = 32;

export type LayerRef = {
  group: React.RefObject<THREE.Group>["current"];
  style: UseStyle[0];
  updateStyle: UseStyle[1];
};

function Layer(props: Props, ref: React.ForwardedRef<LayerRef>) {
  const size = useSize(props.width, props.height, props.aspectRatio);
  const [style, updateStyle] = useStyle(props.style);
  const children = useChildren(props.children, style);
  const flexbox = useFlexbox(children, size, style);
  const text = useText(style, size);
  const contextValue = useContextValue(children, size);
  const childrenPositions = React.useMemo(() => {
    return children.map((child, index) => {
      return calculateChildPosition(child, index, children, style, size);
    });
  }, [children, style, size]);

  const groupRef = React.useRef<THREE.Group>(null);

  React.useImperativeHandle(
    ref,
    () => {
      return {
        group: groupRef.current,
        style,
        updateStyle,
      };
    },
    [style, updateStyle],
  );

  const renderOrder = React.useMemo(() => {
    return contextValue.id + style.zIndex;
  }, [contextValue.id, style.zIndex]);

  const shape = useRoundedPlane(size, style);

  const backgroundImageMeshRef = React.useRef<BackgroundImageRef>(null);

  const textureSize = useTexture(style, size, backgroundImageMeshRef);

  const mask = useMask(contextValue.id);

  const textMaterial = React.useMemo(() => {
    return new THREE.MeshBasicMaterial({ ...mask, depthWrite: false, transparent: true });
  }, []);

  React.useEffect(() => {
    if (style.overflow === "visible") return;
    textMaterial.opacity = style.opacity;
    Object.assign(textMaterial, mask);
    textMaterial.needsUpdate = true;
  }, [textMaterial, style.opacity, mask, style.overflow]);

  const childrenGroupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    const childrenGroup = childrenGroupRef.current;
    if (childrenGroup === null) return;
    childrenGroup.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        if (style.overflow === "visible") {
          child.material.stencilWrite = false;
          child.material.stencilRef = 0;
          child.material.stencilFunc = THREE.AlwaysStencilFunc;
          child.material.stencilFail = THREE.KeepStencilOp;
          child.material.stencilZFail = THREE.KeepStencilOp;
          child.material.stencilZPass = THREE.KeepStencilOp;
        } else {
          Object.assign(child.material, mask);
        }
        child.material.needsUpdate = true;
      }
    });
  }, [children, mask, style.overflow]);

  return (
    <LayerContext.Provider value={contextValue}>
      <group
        ref={groupRef}
        position-x={props.position?.[0]}
        position-y={props.position?.[1]}
        position-z={props.position?.[2]}
      >
        <Mask id={contextValue.id} renderOrder={renderOrder}>
          <shapeGeometry args={[shape, SHAPE_DETAIL]} />
          <meshBasicMaterial color="white" opacity={0} transparent={true} depthWrite={false} />
        </Mask>
        {/* backgroundColor */}
        <mesh renderOrder={renderOrder + 1}>
          <shapeGeometry args={[shape, SHAPE_DETAIL]} />
          <meshBasicMaterial
            color={style.backgroundColor === "transparent" ? "#ffffff" : style.backgroundColor}
            depthWrite={false}
            transparent={true}
            opacity={style.backgroundColor === "transparent" ? 0 : style.opacity}
          />
        </mesh>
        {/* backgroundImage */}
        {style.backgroundImage !== "none" && (
          <mesh ref={backgroundImageMeshRef} renderOrder={renderOrder + 2}>
            <planeGeometry args={[textureSize.width, textureSize.height]} />
            <meshBasicMaterial depthWrite={false} transparent={true} opacity={style.opacity} {...mask} />
          </mesh>
        )}
        {props.text !== undefined && (
          <Text
            {...text.props}
            renderOrder={renderOrder + 3}
            onSync={text.updateSize}
            whiteSpace="normal"
            material={textMaterial}
          >
            {props.text}
          </Text>
        )}
        <group ref={childrenGroupRef} position-x={flexbox.x} position-y={flexbox.y}>
          {children.map((child, index) => {
            const position = childrenPositions[index];
            return (
              <group key={index} position-x={position.x} position-y={position.y} renderOrder={renderOrder + 4}>
                {child}
              </group>
            );
          })}
        </group>
      </group>
    </LayerContext.Provider>
  );
}

export default React.forwardRef(Layer);
