'use client';

import React, { useEffect, useState } from 'react';
import Card from './components/card';
import { Painting } from './types';
import Link from 'next/link';

export default function Home() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_RIJKSMUSEUM_API_KEY;

  const fetchRandomPaintings = async () => {
    try {
      const response = await fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&ps=100`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const selectedPaintings = new Set<Painting>();
      while (selectedPaintings.size < 3) {
        const randomIndex = Math.floor(Math.random() * data.artObjects.length);
        selectedPaintings.add(data.artObjects[randomIndex]);
      }

      setPaintings(Array.from(selectedPaintings));
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchRandomPaintings();
  }, [apiKey]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (paintings.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex flex-col items-center justify-center bg-black w-full h-full p-4">
      <div className="bg-white w-full h-full p-4 flex gap-4">
        {paintings.map((painting, index) => (
          <Link key={index} href={`/paintings/${painting.id}`}>
            <Card painting={painting} />
          </Link>
        ))}
      </div>
      <button onClick={fetchRandomPaintings} className="bg-blue-500 text-white p-2 rounded">Fetch New Paintings</button>
    </main>
  );
}
