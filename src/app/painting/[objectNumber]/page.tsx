'use client'

import React, { useEffect, useState } from 'react';
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
        `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?key=${apiKey}`
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
    return <div>Error: {error}</div>;
  }

  if (!painting) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{painting.title}</h1>
      <img src={painting.webImage?.url} alt={painting.title} className="my-4" />
      <p><strong>Artist:</strong> {painting.principalMaker}</p>
      <p><strong>Description:</strong> {painting.description}</p>
      <p><strong>Year:</strong> {painting.dating.presentingDate}</p>
    </div>
  );
};

export default PaintingDetails;
