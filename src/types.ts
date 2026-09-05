export type Language = 'ru' | 'en';

export interface Destination {
  id: string;
  slideNumber: string;
  city: string;
  prefix: string;
  subtitle: string;
  image: string;
  descriptionRu: string;
  descriptionEn: string;
  features: {
    icon: 'mountain' | 'cocktail' | 'plane';
    textRu: string;
    textEn: string;
    linkTextRu: string;
    linkTextEn: string;
    active?: boolean;
  }[];
}

export interface Tour {
  id: number;
  tourNumberRu: string;
  tourNumberEn: string;
  titleRu: string;
  titleEn: string;
  subtitleRu: string;
  subtitleEn: string;
  image: string;
  duration: string;
  price: string;
  rating: number;
  reviewsCount: number;
  category: string;
  highlightsRu: string[];
  highlightsEn: string[];
  descriptionRu: string;
  descriptionEn: string;
}

export interface VideoItem {
  id: string;
  titleRu: string;
  titleEn: string;
  locationRu: string;
  locationEn: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  avatar: string;
  rating: number;
  date: string;
  textRu: string;
  textEn: string;
  tourNameRu: string;
  tourNameEn: string;
}
