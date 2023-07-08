import React from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type Props = {
  children: React.ReactElement;
  size: { width: number; height: number };
  childrenSize: { width: number; height: number };
  scrollbarVisible: boolean;
  style?: {
    size?: number;
    trackColor?: THREE.ColorRepresentation;
    thumbColor?: THREE.ColorRepresentation;
  };
};

const DEFAULT_STYLE: Required<Props["style"]> = {
  size: 0.05,
  trackColor: "#fafafa",
  thumbColor: "#c7c7c7",
};

export default function Scroller(props: Props) {
  const groupRef = React.useRef<THREE.Group | null>(null);
  const thumbGroupXRef = React.useRef<THREE.Group | null>(null);
  const thumbGroupYRef = React.useRef<THREE.Group | null>(null);
  const draggingScrollThumbXRef = React.useRef(false);
  const draggingScrollThumbYRef = React.useRef(false);
  const progressRef = React.useRef({ x: 0, y: 0 });

  const style: Required<Props["style"]> = React.useMemo(() => {
    return Object.assign({}, DEFAULT_STYLE, props.style ?? {});
  }, [props.style]);

  const overscrollSize = React.useMemo(() => {
    return {
      x: props.childrenSize.width > props.size.width ? Math.abs(props.size.width - props.childrenSize.width) : 0,
      y: props.childrenSize.height > props.size.height ? Math.abs(props.size.height - props.childrenSize.height) : 0,
    };
  }, [props.childrenSize, props.size]);

  const thumbSize = React.useMemo(() => {
    return {
      x: Math.max(props.size.width * 0.05, props.size.width * (props.size.width / props.childrenSize.width)),
      y: Math.max(props.size.height * 0.05, props.size.height * (props.size.height / props.childrenSize.height)),
    };
  }, [props.size, props.childrenSize, overscrollSize]);

  React.useEffect(() => {
    function onPointerUp() {
      draggingScrollThumbXRef.current = false;
      draggingScrollThumbYRef.current = false;
    }

    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  useFrame(() => {
    const group = groupRef.current;
    const thumbGroupX = thumbGroupXRef.current;
    const thumbGroupY = thumbGroupYRef.current;
    if (group === null) return;
    if (thumbGroupX === null) return;
    if (thumbGroupY === null) return;
    if (overscrollSize.x > 0) {
      group.position.x = -progressRef.current.x * overscrollSize.x;
    } else {
      group.position.x = 0;
    }
    if (overscrollSize.y > 0) {
      group.position.y = progressRef.current.y * overscrollSize.y;
    } else {
      group.position.y = 0;
    }
    thumbGroupX.position.x = (props.size.width - thumbSize.x) * progressRef.current.x;
    thumbGroupY.position.y = (props.size.height - thumbSize.y) * -progressRef.current.y;
  });

  return (
    <>
      <group ref={groupRef}>{props.children}</group>
      {/* horizontal */}
      <group visible={props.scrollbarVisible && overscrollSize.x > 0}>
        {/* track */}
        <mesh position-y={props.size.height / -2 + style.size / 2}>
          <planeGeometry args={[props.size.width, style.size]} />
          <meshBasicMaterial depthWrite={false} color={style.trackColor} transparent={true} />
        </mesh>
        {/* thumb */}
        <group ref={thumbGroupXRef}>
          <mesh
            position-x={props.size.width / -2 + thumbSize.x / 2}
            position-y={props.size.height / -2 + style.size / 2}
            onPointerDown={() => {
              draggingScrollThumbXRef.current = true;
            }}
          >
            <planeGeometry args={[thumbSize.x, style.size]} />
            <meshBasicMaterial depthWrite={false} color={style.thumbColor} transparent={true} />
          </mesh>
        </group>
      </group>
      {/* vertical */}
      <group visible={props.scrollbarVisible && overscrollSize.y > 0}>
        {/* track */}
        <mesh position-x={props.size.width / 2 - style.size / 2}>
          <planeGeometry args={[style.size, props.size.height]} />
          <meshBasicMaterial depthWrite={false} color={style.trackColor} transparent={true} />
        </mesh>
        {/* thumb */}
        <group ref={thumbGroupYRef}>
          <mesh
            position-x={props.size.width / 2 - style.size / 2}
            position-y={props.size.height / 2 + thumbSize.y / -2}
            onPointerDown={() => {
              draggingScrollThumbYRef.current = true;
            }}
          >
            <planeGeometry args={[style.size, thumbSize.y]} />
            <meshBasicMaterial depthWrite={false} color={style.thumbColor} transparent={true} />
          </mesh>
        </group>
      </group>
      <mesh
        visible={false}
        onPointerMove={(event) => {
          if (event.uv === undefined) return;
          if (draggingScrollThumbXRef.current) {
            progressRef.current.x = event.uv.x;
          }
          if (draggingScrollThumbYRef.current) {
            progressRef.current.y = 1 - event.uv.y;
          }
        }}
        onWheel={(event) => {
          // todo: reduce inertia for slow scroll wheels
          const inertia = 3000;
          progressRef.current.x += event.deltaX / inertia;
          progressRef.current.x = THREE.MathUtils.clamp(progressRef.current.x, 0, 1);
          progressRef.current.y += event.deltaY / inertia;
          progressRef.current.y = THREE.MathUtils.clamp(progressRef.current.y, 0, 1);
        }}
      >
        <planeGeometry args={[props.size.width, props.size.height]} />
      </mesh>
    </>
  );
}
