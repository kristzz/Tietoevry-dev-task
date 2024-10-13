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
  author?: Author;
}

export interface Dating {
  presentingDate: string;
  sortingDate?: number;
  period?: number;
  yearEarly?: number;
  yearLate?: number;
}

export interface Author {
  name: string;
  dateOfBirth?: string;
  dateOfDeath?: string;
  nationality?: string;
  biography?: string;
}
