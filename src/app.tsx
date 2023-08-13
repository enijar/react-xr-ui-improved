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
        position={[-1.5, 0, 0]}
        height={2}
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5%",
          overflow: "auto",
        }}
      >
        <Layer
          height="50%"
          aspectRatio={1}
          style={{
            backgroundColor: "lightblue",
            overflow: "hidden",
          }}
        >
          <Layer width="50%" aspectRatio={1} style={{ backgroundColor: "white" }} position={[-0.2, 0.1, 0]} />
        </Layer>
      </Layer>

      <Layer
        position={[1.5, 0, 0]}
        height={2}
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "end",
          gap: "5%",
          overflow: "auto",
        }}
      >
        <Layer
          height="50%"
          aspectRatio={1}
          position={[-0.5, 0, 0]}
          style={{
            backgroundColor: "lightblue",
            overflow: "hidden",
          }}
        >
          <Layer width="50%" aspectRatio={1} style={{ backgroundColor: "white" }} position={[-0.2, 0.1, 0]} />
        </Layer>
      </Layer>
    </Canvas>
  );
}
