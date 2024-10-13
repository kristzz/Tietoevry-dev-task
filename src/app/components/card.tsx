import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Painting } from '../types';

interface CardProps {
  painting: Painting;
}

const Card: React.FC<CardProps> = ({ painting }) => {
  return (
    <div className="border border-black p-4 rounded-lg shadow-lg w-48 h-72 relative">
      {painting.webImage && (
        <Link href={`/painting/${painting.objectNumber}`} passHref>
          <Image
            src={painting.webImage.url}
            alt={painting.title}
            fill
            style={{
              objectFit: 'cover',
              borderRadius: '0.5rem',
            }}
            className="rounded-lg cursor-pointer"
          />
        </Link>
      )}
    </div>
  );
};

export default Card;
