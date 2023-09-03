import React from "react";
import { useFrame } from "@react-three/fiber";
import Layer, { LayerRef } from "@/lib/layer";

export default function App() {
  const layerRef = React.useRef<LayerRef>(null);

  useFrame(() => {
    const layer = layerRef.current;
    if (layer === null) return;
    if (layer.group === null) return;
    const progress = Date.now();
    const speed = 150;
    const amplitude = 0.25;
    layer.group.position.x = Math.cos(progress / speed) * amplitude;
    layer.group.position.y = Math.sin(progress / speed) * amplitude;
  });

  return (
    <>
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
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Layer
          ref={layerRef}
          width="50%"
          aspectRatio={1}
          style={{ backgroundColor: "lightblue", borderRadius: 0.5, alignItems: "center", justifyContent: "center" }}
        >
          <Layer width="25%" aspectRatio={1} style={{ backgroundColor: "brown" }} />
        </Layer>
      </Layer>
    </>
  );
}
