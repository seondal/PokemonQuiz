"use client";

import { useState } from "react";

interface HintI {
  key?: any;
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
      <div
        className="w-16 h-8 rounded-md bg-green-800 text-white cursor-pointer"
        onClick={onClick}>
        {cover}
      </div>
    );
  }
  return (
    <div
      key={key}
      className="text-white w-16 rounded-md h-8"
      style={{ backgroundColor: color }}>
      {text}
    </div>
  );
}
