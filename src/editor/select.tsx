import React from "react";
import { EditorContext } from "@/editor/editor";
import { StyleProps } from "@/lib/types";

type Props = {
  prop: keyof StyleProps;
  label: string;
  options: Array<{ value: string; label: string }>;
  defaultValue?: string;
};

export default function Select({ prop, label, options, defaultValue }: Props) {
  const { setStyle } = React.useContext(EditorContext);

  return (
    <fieldset>
      <label htmlFor={prop}>{label}</label>
      <select
        id={prop}
        defaultValue={defaultValue}
        onInput={(event) => {
          const value = event.currentTarget.value;
          setStyle((style) => {
            return { ...style, [prop]: value };
          });
        }}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </fieldset>
  );
}
