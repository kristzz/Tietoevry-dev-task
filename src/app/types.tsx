// src/app/types.ts

export interface Painting {
  id: string;
  title: string;
  webImage?: {
    url: string;
  };
  description: string;
  principalMaker: string;
  dating: {
    presentingDate: string;
  };
  objectNumber: string;
}
