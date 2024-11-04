"use client";

import { useState } from "react";

interface HintI {
  key?: number;
  color?: string;
  text: string;
  cover?: string;
}

export default function Hint({ key, color = "navy", text, cover }: HintI) {
  const [isOpen, setIsOpen] = useState(false);

  function onClick() {
    setIsOpen(true);
  }

  if (!isOpen) {
    return (
      <button className="secondary" onClick={onClick}>
        {cover}
      </button>
    );
  }
  return (
    <button key={key} style={{ backgroundColor: color }}>
      {text}
    </button>
  );
}
