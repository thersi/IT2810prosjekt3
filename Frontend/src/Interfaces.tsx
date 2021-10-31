import {
  Dispatch,
  SetStateAction,
} from "react-transition-group/node_modules/@types/react";

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

export interface MovieAppBarProps {
  handleSearch: (value: string) => void;
  handleFilter: (value: string) => void;
  handleSort: (value: boolean) => void;
}

export interface ThumbsByIdInput {
  thumbsUpByIdId: string;
}

export interface ThumbsDownByIdInput {
  thumbsDownByIdId: string;
}

export interface ThumbsUpByIdResult {
  thumbsUpById: Movie;
}

export interface ThumbsDownByIdResult {
  thumbsDownById: Movie;
}

export interface MovieDialogProps {
  movie: Movie;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setThumbsUp: Dispatch<SetStateAction<number>>;
  thumbsUp: number;
  setThumbsDown: Dispatch<SetStateAction<number>>;
  thumbsDown: number;
  voted: boolean;
  setVoted: Dispatch<SetStateAction<boolean>>;
}

export interface QueryMoviesResult {
  searchAndFilter: Movie[];
}

export interface QueryMoviesInput {
  filterGenre: string;
  limit: number;
  page: number;
  order: number;
  sortOn: string;
  word: string;
}

export interface MovieByIdInput {
  movieByIdId: string;
}

export interface MovieByIdResult {
  movieById: Movie;
}

export interface MovieListProps {
  data: QueryMoviesResult;
}
