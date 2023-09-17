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
          prop="overflow"
          label="Overflow"
          defaultValue="hidden"
          options={[
            { value: "hidden", label: "Hidden" },
            { value: "auto", label: "Auto" },
            { value: "visible", label: "Visible" },
          ]}
        />

        <Select
          prop="flexDirection"
          label="Flex Direction"
          defaultValue="row"
          options={[
            { value: "row", label: "Row" },
            { value: "row-reverse", label: "Row Reverse" },
            { value: "column", label: "Column" },
            { value: "column-reverse", label: "Column Reverse" },
          ]}
        />

        <Select
          prop="alignItems"
          label="Align Items"
          defaultValue="center"
          options={[
            { value: "start", label: "Start" },
            { value: "center", label: "Center" },
            { value: "end", label: "End" },
          ]}
        />

        <Select
          prop="justifyContent"
          label="Justify Content"
          defaultValue="center"
          options={[
            { value: "start", label: "Start" },
            { value: "center", label: "Center" },
            { value: "end", label: "End" },
          ]}
        />

        <Range prop="gap" label="Gap" min={0} max={1} step={0.01} defaultValue={0.1} />

        <Select
          prop="fontFamily"
          label="Font Family"
          options={[
            { value: "./fonts/roboto-regular.woff", label: "Roboto Regular" },
            { value: "./fonts/roboto-slab.woff", label: "Roboto Slab" },
            { value: "./fonts/roboto-mono.woff", label: "Roboto Mono" },
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

        <Range prop="fontSize" label="Font Size" min={0.01} max={1} step={0.01} defaultValue={0.1} />

        <Range prop="lineHeight" label="Line Height" min={0} max={2} step={0.01} defaultValue={1.2} />

        <Color prop="color" label="Color" defaultValue="#ffffff" />

        <Range prop="outlineWidth" label="Outline Width" min={0} max={0.05} step={0.001} defaultValue={0} />

        <Range prop="outlineOpacity" label="Outline Opacity" min={0} max={1} step={0.001} defaultValue={1} />

        <Color prop="outlineColor" label="Outline Color" defaultValue="#000000" />

        <Vector
          prop="outlineOffset"
          label="Outline Offset"
          min={-100}
          max={100}
          step={0.01}
          defaultValue={{ x: 0, y: 0 }}
          onChange={(vector) => {
            setStyle((style) => {
              return { ...style, outlineOffset: [`${vector.x}%`, `${vector.y}%`] };
            });
          }}
        />

        <Range prop="opacity" label="Opacity" min={0} max={1} step={0.001} defaultValue={0.5} />

        <Textarea id="text" label="Text" value={text} onChange={setText} />

        <Color prop="backgroundColor" label="Background Color" defaultValue="#9c96ad" />

        <Select
          prop="backgroundSize"
          label="Background Size"
          defaultValue="cover"
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
