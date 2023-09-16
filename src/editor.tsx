import React from "react";
import { StyleProps } from "@/lib/types";

type Props = {
  children?: React.ReactNode;
};

type EditorContextType = {
  style: Partial<StyleProps>;
  text: string;
};

export const EditorContext = React.createContext<EditorContextType>({
  style: {},
  text: "This is some text.",
});

export default function Editor({ children }: Props) {
  const [style, setStyle] = React.useState<EditorContextType["style"]>({});
  const [text, setText] = React.useState("This is some text.");

  return (
    <EditorContext.Provider value={{ style, text }}>
      {children}
      <aside>
        <h1>Edit Styles</h1>
        <fieldset>
          <label htmlFor="borderRadius">Border Radius</label>
          <input
            id="borderRadius"
            type="range"
            min={0}
            max={1}
            step={0.01}
            defaultValue={0.1}
            onInput={(event) => {
              const borderRadius = parseFloat(event.currentTarget.value);
              setStyle((style) => ({ ...style, borderRadius }));
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="fontFamily">Font</label>
          <select
            id="fontFamily"
            onInput={(event) => {
              const fontFamily = event.currentTarget.value;
              setStyle((style) => ({ ...style, fontFamily }));
            }}
          >
            <option value="/fonts/roboto-regular.woff">Roboto Regular</option>
            <option value="/fonts/roboto-slab.woff">Roboto Slab</option>
            <option value="/fonts/roboto-mono.woff">Roboto Mono</option>
          </select>
        </fieldset>
        <fieldset>
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            value={text}
            onInput={(event) => {
              const text = event.currentTarget.value;
              setText(text);
            }}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="backgroundImage">Background Image</label>
          <input
            id="backgroundImage"
            type="file"
            accept="image/jpeg,image/png"
            onChange={(event) => {
              if (event.target.files === null) return;
              if (event.target.files.length === 0) return;
              const file = event.target.files[0];
              const backgroundImage = URL.createObjectURL(file);
              setStyle((style) => ({ ...style, backgroundImage }));
            }}
          />
        </fieldset>
      </aside>
    </EditorContext.Provider>
  );
}
