import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Layer from "@/components/layer/layer";

export default function Home() {
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
          alignItems: "center",
          justifyContent: "start",
          gap: "5%",
        }}
      >
        <Layer height="50%" aspectRatio={1} style={{ backgroundColor: "pink" }} />
        <Layer height="50%" aspectRatio={1} style={{ backgroundColor: "aliceblue" }} />
        <Layer height="50%" aspectRatio={1} style={{ backgroundColor: "grey" }} />
      </Layer>
    </Canvas>
  );
}
