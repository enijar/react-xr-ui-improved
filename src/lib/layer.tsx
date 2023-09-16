import React from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import useSize, { calculateChildrenSize } from "@/lib/use-size";
import { LayerContext } from "@/lib/context";
import type { Position, SizeProps, StyleProps } from "@/lib/types";
import Scroller from "@/lib/scroller";
import useChildren from "@/lib/use-children";
import useFlexbox, { calculateChildPosition } from "@/lib/use-flexbox";
import useStyle, { UseStyle } from "@/lib/use-style";
import useContextValue from "@/lib/use-context-value";
import useRoundedPlane from "@/lib/use-rounded-plane";
import useText from "@/lib/use-text";

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
  const contextValue = useContextValue(children, style, size);
  const childrenSize = React.useMemo(() => {
    return calculateChildrenSize(children, size, style);
  }, [children, size, style]);
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
          <Text {...text.props} renderOrder={renderOrder} onSync={text.updateSize}>
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
