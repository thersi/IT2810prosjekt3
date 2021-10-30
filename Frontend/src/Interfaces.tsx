export interface Movie {
  _id: string;
  title: string;
  thumbsUp: number;
  year: number;
  genre: string[];
  actors: string[];
  thumbsDown: number;
  poster: string;
}

export interface MovieInfo {}
