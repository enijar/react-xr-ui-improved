import React from "react";
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
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "5%",
        overflow: style.overflow ?? "hidden",
      }}
    >
      {Array.from(Array(1)).map((_, index) => {
        return (
          <Layer
            key={index}
            width="150%"
            aspectRatio={1}
            style={{
              backgroundColor: "crimson",
              color: style.color ?? "#ffffff",
              textAlign: style.textAlign ?? "center",
              verticalAlign: style.verticalAlign ?? "middle",
              fontFamily: style.fontFamily ?? "./fonts/roboto-regular.woff",
              fontSize: style.fontSize ?? "10%",
              lineHeight: style.lineHeight ?? 1.2,
              outlineWidth: style.outlineWidth ?? 0,
              outlineOpacity: style.outlineOpacity ?? 1,
              outlineColor: style.outlineColor ?? "#000000",
              outlineOffset: style.outlineOffset ?? [0, 0],
              opacity: style.opacity ?? 0.5,
            }}
            text={text}
          />
        );
      })}
    </Layer>
  );
}
