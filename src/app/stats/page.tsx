"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [joke, setJoke] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API 호출
    fetch("/api/hello")
      .then((response) => response.json())
      .then((data) => {
        if (data.joke) {
          setJoke(data.joke);
        } else {
          setError("Failed to fetch joke");
        }
      });
  }, []);

  return (
    <div>
      <h1>Next.js API Example with App Router</h1>
      {error ? <p>{error}</p> : <p>Joke: {joke}</p>}
    </div>
  );
}
