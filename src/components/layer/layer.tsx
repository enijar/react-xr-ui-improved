import React from "react";
import * as THREE from "three";
import useSize, {
  calculateChildrenSize,
  calculateChildSize,
  calculateSize,
  type SizeProps,
} from "@/components/layer/hooks/use-size";
import { LayerContext, type LayerContextType } from "@/components/layer/context";

type Props = {
  width?: SizeProps["width"];
  height?: SizeProps["height"];
  aspectRatio?: SizeProps["aspectRatio"];
  children?: React.ReactNode;
  style?: {
    backgroundColor?: THREE.ColorRepresentation;
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
    gap?: number | `${number}%`;
    alignItems?: "start" | "center" | "end";
    justifyContent?: "start" | "center" | "end";
  };
};

export default function Layer(props: Props) {
  const size = useSize(
    React.useMemo(() => {
      return { width: props.width, height: props.height, aspectRatio: props.aspectRatio };
    }, [props.width, props.height, props.aspectRatio])
  );

  const style = React.useMemo<Props["style"]>(() => {
    return props.style ?? {};
  }, [props.style]);

  const children = React.useMemo(() => {
    if (props.children === undefined) return [];
    const flexDirection = props.style?.flexDirection ?? "row";
    const children = Array.isArray(props.children) ? props.children : [props.children];
    switch (flexDirection) {
      case "row-reverse":
      case "column-reverse":
        return [...children].reverse();
      default:
        return children;
    }
  }, [props.children, props.style?.flexDirection]);

  const childrenPosition = React.useMemo(() => {
    if (children.length === 0) {
      return { x: 0, y: 0 };
    }
    const flexDirection = props.style?.flexDirection ?? "row";
    const alignItems = props.style?.alignItems ?? "center";
    const justifyContent = props.style?.justifyContent ?? "center";
    const childrenSize = calculateChildrenSize(children, size, flexDirection, props.style?.gap);
    let x = 0;
    let y = 0;
    switch (flexDirection) {
      case "row":
      case "row-reverse":
        switch (alignItems) {
          case "start":
            y = size.height / 2 - childrenSize.height / 2;
            break;
          case "center":
            y = 0;
            break;
          case "end":
            y = size.height / -2 + childrenSize.height / 2;
            break;
        }
        switch (justifyContent) {
          case "start":
            x = size.width / -2;
            break;
          case "center":
            x = childrenSize.width / -2;
            break;
          case "end":
            x = size.width / 2 - childrenSize.width;
            break;
        }
        break;
      case "column":
      case "column-reverse":
        switch (alignItems) {
          case "start":
            x = size.width / -2 + childrenSize.width / 2;
            break;
          case "center":
            x = 0;
            break;
          case "end":
            x = size.width / 2 - childrenSize.width / 2;
            break;
        }
        switch (justifyContent) {
          case "start":
            y = size.height / 2;
            break;
          case "center":
            y = childrenSize.height / 2;
            break;
          case "end":
            y = size.height / -2 + childrenSize.height;
            break;
        }
        break;
    }
    return { x, y };
  }, [size, children, props.style?.flexDirection, props.style?.alignItems, props.style?.justifyContent]);

  return (
    <LayerContext.Provider
      value={React.useMemo<LayerContextType>(() => {
        return {
          parent: props.children === undefined ? null : { size },
        };
      }, [props.children, size])}
    >
      <group>
        <mesh>
          <planeGeometry args={[size.width, size.height]} />
          <meshBasicMaterial color={style?.backgroundColor} depthWrite={false} />
        </mesh>
        <group position-x={childrenPosition.x} position-y={childrenPosition.y}>
          {children.map((child, index) => {
            const alignItems = props.style?.alignItems ?? "center";
            const justifyContent = props.style?.justifyContent ?? "center";
            const flexDirection = props.style?.flexDirection ?? "row";
            const lastIndex = Math.max(0, children.length - 1);
            const gapSize = calculateSize({ width: props.style?.gap ?? 0, height: props.style?.gap ?? 0 }, size);
            const childSize = calculateChildSize(child, size);
            let x = 0;
            let y = 0;
            const childrenSize = calculateChildrenSize(children, size, flexDirection);
            for (let i = 0; i <= index; i++) {
              if (["row", "row-reverse"].includes(flexDirection)) {
                const offsetY =
                  childSize.height < childrenSize.height ? (childrenSize.height - childSize.height) / 2 : 0;
                if (alignItems === "start") {
                  y = offsetY;
                }
                if (alignItems === "end") {
                  y = -offsetY;
                }
                if (i === 0) {
                  x += childSize.width / 2;
                } else {
                  const prevChild = children[i - 1];
                  const prevChildSize = calculateChildSize(prevChild, size);
                  x += prevChildSize.width;
                  if (i <= lastIndex) {
                    x += gapSize.width;
                  }
                }
                continue;
              }
              const offsetX = childSize.width < childrenSize.width ? (childrenSize.width - childSize.width) / 2 : 0;
              if (alignItems === "start") {
                x = -offsetX;
              }
              if (alignItems === "end") {
                x = offsetX;
              }
              if (i === 0) {
                y -= childSize.height / 2;
              } else {
                const prevChild = children[i - 1];
                const prevChildSize = calculateChildSize(prevChild, size);
                y -= prevChildSize.height;
                if (i <= lastIndex) {
                  y -= gapSize.height;
                }
              }
            }
            return (
              <group key={index} position-x={x} position-y={y}>
                {child}
              </group>
            );
          })}
        </group>
      </group>
    </LayerContext.Provider>
  );
}
