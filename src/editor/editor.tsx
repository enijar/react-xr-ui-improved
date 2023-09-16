import React from "react";
import { StyleProps } from "@/lib/types";
import Range from "@/editor/range";
import Select from "@/editor/select";
import Textarea from "@/editor/textarea";
import File from "@/editor/file";

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
            {
              value: "/fonts/roboto-regular.woff",
              label: "Roboto Regular",
            },
            {
              value: "/fonts/roboto-slab.woff",
              label: "Roboto Slab",
            },
            {
              value: "/fonts/roboto-mono.woff",
              label: "Roboto Mono",
            },
          ]}
        />

        <Textarea id="text" label="Text" value={text} onChange={setText} />

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
