"use client";

import { useState } from "react";

interface HintI {
  key?: number;
  color?: string;
  text: string;
  cover?: string;
}

export default function Hint({ key, color, text, cover }: HintI) {
  const [isOpen, setIsOpen] = useState(false);

  function onClick() {
    setIsOpen(true);
  }

  if (!isOpen) {
    return (
      <button className="outline" onClick={onClick}>
        {cover}
      </button>
    );
  }
  if (!color) {
    return (
      <button key={key} className="secondary">
        {text}
      </button>
    );
  }
  return (
    <button
      key={key}
      className="contrast"
      style={{ backgroundColor: color, color: "white" }}>
      {text}
    </button>
  );
}
