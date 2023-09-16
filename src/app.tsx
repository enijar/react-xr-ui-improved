import React from "react";
import { useFrame } from "@react-three/fiber";
import Layer, { LayerRef } from "@/lib/layer";

export default function App() {
  const outerLayerRef = React.useRef<LayerRef>(null);
  const innerLayerRef = React.useRef<LayerRef>(null);

  useFrame(() => {
    const outerLayer = outerLayerRef.current;
    const innerLayer = innerLayerRef.current;
    if (outerLayer === null) return;
    if (innerLayer === null) return;
    if (outerLayer.group === null) return;
    const progress = Date.now();
    const speed = 300;
    const amplitude = 0.25;
    outerLayer.group.position.x = Math.cos(progress / speed) * amplitude;
    outerLayer.group.position.y = Math.sin(progress / speed) * amplitude;
    const borderRadius = (1 + Math.sin(progress / speed)) / 2;
    outerLayer.updateStyle({ borderRadius });
    innerLayer.updateStyle({ borderRadius: 0.125 * (1 - borderRadius) });
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
          ref={outerLayerRef}
          width="50%"
          aspectRatio={1}
          style={{
            backgroundColor: "lightblue",
            borderRadius: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Layer
            ref={innerLayerRef}
            width="25%"
            aspectRatio={1}
            style={{ backgroundColor: "brown", borderRadius: 0 }}
          />
        </Layer>
      </Layer>
    </Layer>
  );
}
