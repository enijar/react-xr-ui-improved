import React from "react";
import { useFrame } from "@react-three/fiber";
import Layer, { LayerRef } from "@/lib/layer";

export default function App() {
  const layerRef = React.useRef<LayerRef>(null);

  const [borderRadius, setBorderRadius] = React.useState(0);

  useFrame(() => {
    const layer = layerRef.current;
    if (layer === null) return;
    if (layer.group === null) return;
    const progress = Date.now();
    const speed = 250;
    const amplitude = 0.25;
    layer.group.position.x = Math.cos(progress / speed) * amplitude;
    layer.group.position.y = Math.sin(progress / speed) * amplitude;
    setBorderRadius((1 + Math.sin(progress / speed)) / 2);
  });

  return (
    <Layer
      width={4}
      height={2}
      style={{
        gap: "2%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Layer
        width="47%"
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
          overflow: "auto",
          borderRadius: 0.1,
          lineHeight: 1.2,
          color: "#ffffff",
          verticalAlign: "middle",
          textAlign: "center",
          fontFamily: "./fonts/roboto-slab-regular.woff",
          fontSize: "10%",
        }}
        text={`This is some text \non a new line.`}
      />
      <Layer
        width="47%"
        aspectRatio={1}
        style={{
          backgroundColor: "crimson",
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
          style={{
            backgroundColor: "lightblue",
            borderRadius: 0.5 * borderRadius,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Layer
            width="25%"
            aspectRatio={1}
            style={{ backgroundColor: "brown", borderRadius: 0.125 * (1 - borderRadius) }}
          />
        </Layer>
      </Layer>
    </Layer>
  );
}
