import React from "react";
import { EditorContext } from "@/editor/editor";
import { StyleProps } from "@/lib/types";

type Props = {
  prop: keyof StyleProps;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: { x: number; y: number };
  onChange: (vector: { x: number; y: number }) => void;
};

export default function Vector({ prop, label, min, max, step, defaultValue, onChange }: Props) {
  const valueRef = React.useRef<{ x: number; y: number }>(defaultValue ?? { x: 0, y: 0 });

  return (
    <fieldset>
      <label>{label}</label>
      <label>
        <span>x:</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue?.x}
          onInput={(event) => {
            valueRef.current.x = parseFloat(event.currentTarget.value);
            onChange(valueRef.current);
          }}
        />
      </label>
      <label>
        <span>y:</span>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          defaultValue={defaultValue?.y}
          onInput={(event) => {
            valueRef.current.y = parseFloat(event.currentTarget.value);
            onChange(valueRef.current);
          }}
        />
      </label>
    </fieldset>
  );
}
