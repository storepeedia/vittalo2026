"use client";
import { useState } from "react";
import { RichTextEditor } from "./RichTextEditor";

interface FormRichTextEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
}

export function FormRichTextEditor({ name, defaultValue = "", placeholder }: FormRichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <RichTextEditor
        value={value}
        onChange={setValue}
        placeholder={placeholder}
      />
      <input type="hidden" name={name} value={value} />
    </>
  );
}
