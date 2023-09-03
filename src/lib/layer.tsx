import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import useSize, { calculateChildrenSize, calculateScaledSize } from "@/lib/use-size";
import { LayerContext } from "@/lib/context";
import type { Position, SizeProps, StyleProps } from "@/lib/types";
import Scroller from "@/lib/scroller";
import useChildren from "@/lib/use-children";
import useFlexbox, { calculateChildPosition } from "@/lib/use-flexbox";
import useStyle from "@/lib/use-style";
import useContextValue from "@/lib/use-context-value";
import useRoundedPlane from "@/lib/use-rounded-plane";

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
};

function Layer(props: Props, ref: React.ForwardedRef<LayerRef>) {
  const groupRef = React.useRef<THREE.Group>(null);

  React.useImperativeHandle(ref, () => {
    return {
      group: groupRef.current,
    };
  });

  const size = useSize(props.width, props.height, props.aspectRatio);
  const style = useStyle(props.style);
  const children = useChildren(props.children, style);
  const flexbox = useFlexbox(children, size, style);
  const contextValue = useContextValue(children, style, size);
  const childrenSize = React.useMemo(() => {
    return calculateChildrenSize(children, size, style);
  }, [children, size, style]);
  const childrenPositions = React.useMemo(() => {
    return children.map((child, index) => {
      return calculateChildPosition(child, index, children, style, size);
    });
  }, [children, style, size]);

  const renderOrder = React.useMemo(() => {
    return contextValue.id + style.zIndex;
  }, [contextValue.id, style.zIndex]);

  const shape = useRoundedPlane(size, style);

  const [textSize, setTextSize] = React.useState({ width: 0, height: 0 });

  const textAnchor = React.useMemo(() => {
    let x: number | "left" | "center" | "right" = 0;
    let y: number | "top" | "top-baseline" | "middle" | "bottom-baseline" | "bottom" = 0;
    switch (style.textAlign) {
      case "left":
        x = size.width / 2;
        break;
      case "center":
      case "justify":
        x = "center";
        break;
      case "right":
        x = size.width / -2 + textSize.width;
        break;
    }
    switch (style.verticalAlign) {
      case "top":
        y = size.height / -2;
        break;
      case "middle":
        y = "middle";
        break;
      case "bottom":
        y = size.height / 2 - textSize.height;
        break;
    }
    return { x, y };
  }, [style.textAlign, style.verticalAlign, textSize]);

  const textMaterial = React.useMemo(() => {
    return new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, side: THREE.FrontSide });
  }, []);

  const fontSize = React.useMemo(() => {
    const smallestDimension = Math.min(size.width, size.height);
    return calculateScaledSize(style.fontSize, smallestDimension);
  }, [style.fontSize, size]);

  const outlineWidth = React.useMemo(() => {
    return calculateScaledSize(style.outlineWidth, fontSize);
  }, [style.outlineWidth, fontSize]);

  const outlineOffsetX = React.useMemo(() => {
    return calculateScaledSize(style.outlineOffsetX, fontSize);
  }, [style.outlineOffsetX, fontSize]);

  const outlineOffsetY = React.useMemo(() => {
    return calculateScaledSize(style.outlineOffsetY, fontSize);
  }, [style.outlineOffsetY, fontSize]);

  return (
    <LayerContext.Provider value={contextValue}>
      <group
        ref={groupRef}
        position-x={props.position?.[0]}
        position-y={props.position?.[1]}
        position-z={props.position?.[2]}
      >
        {/* mask for parent */}
        <mesh renderOrder={renderOrder}>
          <shapeGeometry args={[shape, SHAPE_DETAIL]} />
          <meshBasicMaterial
            color={style.backgroundColor === "transparent" ? "#ffffff" : style.backgroundColor}
            depthWrite={false}
            transparent={true}
            opacity={style.backgroundColor === "transparent" ? 0 : style.opacity}
            {...contextValue.mask}
          />
        </mesh>
        {props.text !== undefined && (
          <Text
            maxWidth={size.width}
            color={style.color}
            fontSize={fontSize}
            renderOrder={renderOrder}
            anchorX={textAnchor.x}
            anchorY={textAnchor.y}
            font={style.fontFamily}
            textAlign={style.textAlign}
            lineHeight={style.lineHeight}
            outlineWidth={outlineWidth}
            outlineColor={style.outlineColor}
            outlineOpacity={style.outlineOpacity}
            outlineOffsetX={outlineOffsetX}
            outlineOffsetY={outlineOffsetY}
            material={textMaterial}
            onSync={(troika) => {
              const box = troika.geometry.boundingBox;
              if (box === null) return;
              const width = box.max.x - box.min.x;
              const height = box.max.y - box.min.y;
              setTextSize((textSize) => {
                if (textSize.width === width && textSize.height === height) {
                  return textSize;
                }
                return { width, height };
              });
            }}
          >
            {props.text}
          </Text>
        )}
        <Scroller size={size} childrenSize={childrenSize} enabled={style.overflow === "auto"} overflow={style.overflow}>
          <group position-x={flexbox.x} position-y={flexbox.y}>
            {children.map((child, index) => {
              const position = childrenPositions[index];
              return (
                <group key={index} position-x={position.x} position-y={position.y} renderOrder={renderOrder}>
                  {child}
                </group>
              );
            })}
          </group>
        </Scroller>
        {/* mask for children */}
        {/*<mesh renderOrder={renderOrder}>*/}
        {/*  <shapeGeometry args={[shape, SHAPE_DETAIL]} />*/}
        {/*  <meshBasicMaterial*/}
        {/*    color={style.backgroundColor === "transparent" ? "#ffffff" : style.backgroundColor}*/}
        {/*    depthWrite={false}*/}
        {/*    transparent={true}*/}
        {/*    opacity={style.backgroundColor === "transparent" ? 0 : style.opacity}*/}
        {/*    {...childrenMask}*/}
        {/*  />*/}
        {/*</mesh>*/}
      </group>
    </LayerContext.Provider>
  );
}

export default React.forwardRef(Layer);
