import React from "react";
import * as THREE from "three";
import { Mask, useMask } from "@react-three/drei";
import useSize, { calculateChildrenSize } from "@/lib/use-size";
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
};

const SHAPE_DETAIL = 32;

export default function Layer(props: Props) {
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

  const { id } = React.useContext(LayerContext);
  const mask = useMask(id);

  return (
    <LayerContext.Provider value={contextValue}>
      <group position-x={props.position?.[0]} position-y={props.position?.[1]} position-z={props.position?.[2]}>
        {/* mask from parent */}
        <mesh renderOrder={renderOrder}>
          <shapeGeometry args={[shape, SHAPE_DETAIL]} />
          <meshBasicMaterial color={style.backgroundColor} depthWrite={false} transparent={true} {...(mask ?? {})} />
        </mesh>
        {children.length > 0 && (
          <>
            <Scroller
              size={size}
              childrenSize={childrenSize}
              enabled={style.overflow === "auto"}
              overflow={style.overflow}
            >
              <group position-x={flexbox.x} position-y={flexbox.y}>
                {children.map((child, index) => {
                  const position = childrenPositions[index];
                  return (
                    <group key={index} position-x={position.x} position-y={position.y}>
                      {child}
                    </group>
                  );
                })}
              </group>
            </Scroller>
            {/* mask for children */}
            <mesh renderOrder={renderOrder}>
              <shapeGeometry args={[shape, SHAPE_DETAIL]} />
              <meshBasicMaterial
                color={style.backgroundColor}
                depthWrite={false}
                transparent={true}
                stencilWrite={true}
                stencilFunc={THREE.AlwaysStencilFunc}
                stencilRef={contextValue.id}
                stencilZPass={THREE.ReplaceStencilOp}
              />
            </mesh>
          </>
        )}
      </group>
    </LayerContext.Provider>
  );
}
