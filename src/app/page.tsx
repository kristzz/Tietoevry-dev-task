'use client';

import React, { useEffect, useState } from 'react';
import Card from './components/card';
import { Painting } from './types';
import Link from 'next/link';

export default function Home() {
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
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

      setIsVisible(false);
      setTimeout(() => {
        setPaintings(Array.from(selectedPaintings));
        setIsVisible(true);
      }, 300);
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
    return <div className="text-red-600 text-lg">Error: {error}</div>;
  }

  if (paintings.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-10 w-10 text-red-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M12 2a10 10 0 0 1 8.485 4.514l-1.415 1.415A8 8 0 1 0 4.586 16.485L3.171 15.07A10 10 0 0 1 12 2z"/>
        </svg>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="bg-white w-full h-full p-4 flex flex-col md:flex-row gap-4 justify-center flex-wrap">
        {paintings.map((painting, index) => (
          <Link key={index} href={`/paintings/${painting.id}`} className="transform transition-transform duration-500 hover:scale-105">
            <Card painting={painting} isVisible={isVisible} />
          </Link>
        ))}
      </div>
      <button 
        onClick={fetchRandomPaintings} 
        className="relative mt-4 px-6 py-3 text-white text-lg rounded shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-red-600 to-orange-500">
        Shuffle
      </button>
    </main>
  );
}
