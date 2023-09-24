import React from "react";
import type { ScaledValue } from "@/lib/types";
import Layer from "@/lib/layer";
import { EditorContext } from "@/editor/editor";

export default function App() {
  const { style, text } = React.useContext(EditorContext);

  return (
    <Layer
      width={2}
      aspectRatio={1}
      style={{
        backgroundColor: style.backgroundColor ?? "#9c96ad",
        borderRadius: style.borderRadius ?? 0.1,
        backgroundSize: style.backgroundSize ?? "cover",
        backgroundImage: style.backgroundImage ?? "./images/robot.png",
        backgroundPosition: style.backgroundPosition ?? ["50%", "50%"],
        flexDirection: style.flexDirection ?? "row",
        alignItems: style.alignItems ?? "center",
        justifyContent: style.justifyContent ?? "center",
        gap: style.gap ?? 0.1,
        overflow: style.overflow ?? "hidden",
      }}
    >
      {Array.from(Array(3)).map((_, index) => {
        const widths: ScaledValue[] = ["25%", "45%", "10%"];
        const texts = ["1", undefined, "3"];
        return (
          <Layer
            key={index}
            width={widths[index]}
            aspectRatio={1}
            style={{
              backgroundColor: "crimson",
              color: style.color ?? "#ffffff",
              textAlign: style.textAlign ?? "center",
              verticalAlign: style.verticalAlign ?? "middle",
              fontFamily: style.fontFamily ?? "./fonts/roboto-regular.woff",
              fontSize: style.fontSize ?? 0.1,
              lineHeight: style.lineHeight ?? 1.2,
              outlineWidth: style.outlineWidth ?? 0,
              outlineOpacity: style.outlineOpacity ?? 1,
              outlineColor: style.outlineColor ?? "#000000",
              outlineOffset: style.outlineOffset ?? [0, 0],
              opacity: style.opacity ?? 0.5,
            }}
            text={texts[index] ?? text}
          />
        );
      })}
    </Layer>
  );
}
