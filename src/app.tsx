import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Text } from "@react-three/drei";
import Layer from "@/lib/layer";

export default function App() {
  return (
    <Canvas flat linear gl={{ alpha: false }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <Layer
        position={[-1.1, 0, 0]}
        height={2}
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          gap: "5%",
          overflow: "auto",
          borderRadius: 0.1,
          lineHeight: 1.2,
          color: "#ffffff",
          verticalAlign: "middle",
          textAlign: "center",
          fontFamily: "./fonts/roboto-slab-regular.woff",
          fontSize: 0.2,
          outlineWidth: 0.01,
        }}
        text={`This is some text \non a new line.`}
      />
      <Layer
        position={[1.1, 0, 0]}
        height={2}
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          gap: "5%",
          overflow: "auto",
          borderRadius: 0.1,
        }}
      >
        <Layer
          width="50%"
          aspectRatio={1}
          style={{ backgroundColor: "lightblue", borderRadius: 0.5, alignItems: "center", justifyContent: "center" }}
        >
          <Layer width="25%" aspectRatio={1} style={{ backgroundColor: "brown" }} />
        </Layer>
      </Layer>
    </Canvas>
  );
}
