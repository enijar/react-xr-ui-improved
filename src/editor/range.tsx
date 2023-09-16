import React from "react";
import { EditorContext } from "@/editor/editor";
import { StyleProps } from "@/lib/types";

type Props = {
  prop: keyof StyleProps;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
};

export default function Range({ prop, label, min, max, step, defaultValue }: Props) {
  const { setStyle } = React.useContext(EditorContext);

  return (
    <fieldset>
      <label htmlFor={prop}>{label}</label>
      <input
        id={prop}
        type="range"
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        onInput={(event) => {
          const value = parseFloat(event.currentTarget.value);
          setStyle((style) => {
            return { ...style, [prop]: value };
          });
        }}
      />
    </fieldset>
  );
}
