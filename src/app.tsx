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
        backgroundColor: "#9c96ad",
        borderRadius: 0.1,
        color: "#ffffff",
        verticalAlign: "middle",
        textAlign: "center",
        fontFamily: "./fonts/roboto-regular.woff",
        fontSize: "10%",
        backgroundSize: "cover",
        backgroundImage: `./images/robot.png`,
        ...style,
      }}
      text={text}
    />
  );
}
