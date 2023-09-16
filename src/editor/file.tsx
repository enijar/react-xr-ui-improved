import React from "react";

type Props = {
  id: string;
  label: string;
  accept?: string;
  onChange: (file: File) => void;
};

export default function File({ id, label, accept, onChange }: Props) {
  return (
    <fieldset>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={(event) => {
          if (event.target.files === null) return;
          if (event.target.files.length === 0) return;
          const file = event.target.files[0];
          onChange(file);
        }}
      />
    </fieldset>
  );
}
