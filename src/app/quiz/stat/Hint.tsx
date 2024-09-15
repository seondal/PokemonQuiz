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
      <button
        className="w-16 h-8 rounded-md flex justify-center items-center"
        onClick={onClick}>
        {cover}
      </button>
    );
  }
  return (
    <div
      key={key}
      className="text-white w-16 rounded-md h-8 flex justify-center items-center"
      style={{ backgroundColor: color }}>
      {text}
    </div>
  );
}
