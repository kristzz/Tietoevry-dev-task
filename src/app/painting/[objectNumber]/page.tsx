'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Painting } from '../../types';

interface PaintingDetailsProps {
  params: {
    objectNumber: string;
  };
}

const PaintingDetails: React.FC<PaintingDetailsProps> = ({ params }) => {
  const { objectNumber } = params;
  const [painting, setPainting] = useState<Painting | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_RIJKSMUSEUM_API_KEY;

  const fetchPaintingDetails = async () => {
    if (!objectNumber) return;

    try {
      const response = await fetch(
        `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPainting(data.artObject);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    fetchPaintingDetails();
  }, [objectNumber]);

  if (error) {
    return <div className="text-red-600 text-lg">Error: {error}</div>;
  }

  if (!painting) {
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
    <main className="max-w-7xl p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="relative lg:w-80 lg:h-[28rem] md:w-64 md:h-[23rem] w-72 h-96 flex-shrink-0">
          <Image
            src={painting?.webImage?.url || '/placeholder.jpg'}
            alt={painting.title}
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">{painting.title}</h1>
            <p className="text-lg mb-2"><strong>Artist:</strong> {painting.principalMaker}</p>
            <p className="text-lg mb-2"><strong>Year:</strong> {painting.dating.presentingDate}</p>
            <div className="text-lg mt-2">
              <ul className="list-disc list-inside">
                <li>Object Number: {painting.objectNumber}</li>
                <li>Materials: {painting.materials ? painting.materials.join(', ') : 'N/A'}</li>
              </ul>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg"><strong>Description:</strong> {painting.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaintingDetails;