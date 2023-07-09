import React from "react";
import { Mask } from "@react-three/drei";
import useSize, { calculateChildrenSize } from "@/lib/use-size";
import { LayerContext } from "@/lib/context";
import type { Position, SizeProps, StyleProps } from "@/lib/types";
import Scroller from "@/lib/scroller";
import useChildren from "@/lib/use-children";
import useFlexbox, { calculateChildPosition } from "@/lib/use-flexbox";
import useStyle from "@/lib/use-style";
import useContextValue from "@/lib/use-context-value";

type Props = {
  width?: SizeProps["width"];
  height?: SizeProps["height"];
  aspectRatio?: SizeProps["aspectRatio"];
  children?: React.ReactNode;
  style?: Partial<StyleProps>;
  position?: Position;
};

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

  return (
    <LayerContext.Provider value={contextValue}>
      <group position-x={props.position?.[0]} position-y={props.position?.[1]} position-z={props.position?.[2]}>
        <Mask id={1}>
          <planeGeometry args={[size.width, size.height]} />
          <meshBasicMaterial color={style.backgroundColor} depthWrite={false} transparent={true} />
        </Mask>
        <mesh>
          <planeGeometry args={[size.width, size.height]} />
          <meshBasicMaterial color={style.backgroundColor} depthWrite={false} transparent={true} />
        </mesh>
        {children.length > 0 && (
          <Scroller size={size} childrenSize={childrenSize} scrollbarVisible={style.scrollbarVisible}>
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
        )}
      </group>
    </LayerContext.Provider>
  );
}
