import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Painting } from '../types';

interface CardProps {
  painting: Painting;
  isVisible: boolean;
}

const Card: React.FC<CardProps> = ({ painting, isVisible }) => {
  return (
    <div
      className={`relative transition-opacity duration-500 ease-in-out 
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        lg:w-80 lg:h-[28rem] md:w-64 md:h-[23rem] w-72 h-96`}
    >
      {painting.webImage && (
        <Link href={`/painting/${painting.objectNumber}`} passHref>
          <Image
            src={painting.webImage.url}
            alt={painting.title}
            fill
            style={{
              objectFit: 'cover',
            }}
            className="rounded-lg cursor-pointer"
          />
        </Link>
      )}
    </div>
  );
};

export default Card;
