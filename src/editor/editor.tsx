import React from "react";
import { StyleProps } from "@/lib/types";
import Range from "@/editor/range";
import Select from "@/editor/select";
import Textarea from "@/editor/textarea";
import File from "@/editor/file";
import Color from "@/editor/color";
import Vector from "@/editor/vector";

type Props = {
  children?: React.ReactNode;
};

type EditorContextType = {
  style: Partial<StyleProps>;
  setStyle: React.Dispatch<React.SetStateAction<EditorContextType["style"]>>;
  text: string;
};

export const EditorContext = React.createContext<EditorContextType>({
  style: {},
  setStyle() {},
  text: "",
});

export default function Editor({ children }: Props) {
  const [style, setStyle] = React.useState<EditorContextType["style"]>({});
  const [text, setText] = React.useState("This is some text.");

  return (
    <EditorContext.Provider value={{ style, setStyle, text }}>
      {children}

      <aside>
        <h1>Edit Styles</h1>

        <Range prop="borderRadius" label="Border Radius" min={0} max={1} step={0.01} defaultValue={0.1} />

        <Select
          prop="fontFamily"
          label="Font Family"
          options={[
            { value: "/fonts/roboto-regular.woff", label: "Roboto Regular" },
            { value: "/fonts/roboto-slab.woff", label: "Roboto Slab" },
            { value: "/fonts/roboto-mono.woff", label: "Roboto Mono" },
          ]}
        />

        <Select
          prop="verticalAlign"
          label="Vertical Align"
          defaultValue="middle"
          options={[
            { value: "top", label: "Top" },
            { value: "middle", label: "Middle" },
            { value: "bottom", label: "Bottom" },
          ]}
        />

        <Select
          prop="textAlign"
          label="Vertical Align"
          defaultValue="center"
          options={[
            { value: "center", label: "Center" },
            { value: "left", label: "Left" },
            { value: "right", label: "Right" },
            { value: "justify", label: "Justify" },
          ]}
        />

        <Range prop="lineHeight" label="Line Height" min={0} max={2} step={0.01} defaultValue={1.2} />

        <Color prop="color" label="Color" defaultValue="#ffffff" />

        <Textarea id="text" label="Text" value={text} onChange={setText} />

        <Color prop="backgroundColor" label="Background Color" defaultValue="#9c96ad" />

        <Select
          prop="backgroundSize"
          label="Background Size"
          defaultValue="contain"
          options={[
            { value: "contain", label: "Contain" },
            { value: "cover", label: "Cover" },
            { value: "stretch", label: "Stretch" },
          ]}
        />

        <Vector
          prop="backgroundPosition"
          label="Background Position"
          min={0}
          max={100}
          step={1}
          defaultValue={{ x: 50, y: 50 }}
          onChange={(vector) => {
            setStyle((style) => {
              return { ...style, backgroundPosition: [`${vector.x}%`, `${vector.y}%`] };
            });
          }}
        />

        <File
          id="backgroundImage"
          label="Background Image"
          onChange={(file) => {
            const backgroundImage = URL.createObjectURL(file);
            setStyle((style) => {
              return { ...style, backgroundImage };
            });
          }}
        />
      </aside>
    </EditorContext.Provider>
  );
}
