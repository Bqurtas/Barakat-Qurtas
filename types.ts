
export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface PortfolioItem {
  id: string;
  category: string;
  title: string;
  image: string;
  isLogo?: boolean;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
}
