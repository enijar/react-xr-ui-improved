import React from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function Textarea({ id, label, value, onChange }: Props) {
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
      />
    </fieldset>
  );
}
