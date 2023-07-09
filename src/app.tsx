import React from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Layer from "@/lib/layer";

export default function App() {
  return (
    <Canvas flat linear gl={{ alpha: false, localClippingEnabled: true }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Layer
        position={[-1.25, 0, 0]}
        height={2}
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "start",
          gap: "5%",
          overflow: "auto",
          borderRadius: 1,
        }}
      >
        {Array.from(Array(20)).map((_, index) => {
          return (
            <Layer
              key={index}
              height="40%"
              aspectRatio={1}
              style={{ backgroundColor: `hsl(${(index * 10) % 360}, 50%, 50%)` }}
            />
          );
        })}
      </Layer>
      <Layer
        position={[1.25, 0, 0]}
        height={2}
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          flexDirection: "row-reverse",
          alignItems: "start",
          justifyContent: "start",
          gap: "5%",
          overflow: "auto",
          borderRadius: [0.2, 0, 0, 0.1],
        }}
      >
        {Array.from(Array(20)).map((_, index) => {
          return (
            <Layer
              key={index}
              height="40%"
              aspectRatio={1}
              style={{ backgroundColor: `hsl(${(index * 10) % 360}, 50%, 50%)` }}
            />
          );
        })}
      </Layer>
    </Canvas>
  );
}
