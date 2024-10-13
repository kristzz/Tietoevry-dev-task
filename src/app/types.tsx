export interface Painting {
  id: string;
  title: string;
  webImage?: {
    url: string;
    width: number;
    height: number;
  };
  description: string;
  principalMaker: string;
  dating: Dating;
  objectNumber: string;
  materials: string[];
}

export interface Dating {
  presentingDate: string;
  sortingDate?: number;
  period?: number;
  yearEarly?: number;
  yearLate?: number;
}