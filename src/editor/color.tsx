import React from "react";
import { EditorContext } from "@/editor/editor";
import { StyleProps } from "@/lib/types";

type Props = {
  prop: keyof StyleProps;
  label: string;
  defaultValue?: string;
};

export default function Color({ prop, label, defaultValue }: Props) {
  const { setStyle } = React.useContext(EditorContext);

  return (
    <fieldset>
      <label htmlFor={prop}>{label}</label>
      <input
        id={prop}
        type="color"
        defaultValue={defaultValue}
        onInput={(event) => {
          const value = event.currentTarget.value;
          setStyle((style) => {
            return { ...style, [prop]: value };
          });
        }}
      />
    </fieldset>
  );
}
