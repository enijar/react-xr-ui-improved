import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Layer from "@/lib/layer";

export default function App() {
  return (
    <Canvas flat linear gl={{ alpha: false }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <Layer
        height={2}
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          flexDirection: "column",
          gap: "5%",
          overflow: "auto",
          borderRadius: 0.1,
        }}
      >
        <Layer
          position={[-0.2, 0.2, 0]}
          height="50%"
          aspectRatio={1}
          style={{
            backgroundColor: "lightblue",
            alignItems: "end",
          }}
        >
          <Layer width="50%" aspectRatio={1} style={{ backgroundColor: "white" }} position={[0.2, 0.1, 0]} />
        </Layer>
      </Layer>
    </Canvas>
  );
}
