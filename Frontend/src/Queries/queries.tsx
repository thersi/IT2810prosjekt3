import { gql } from "@apollo/client";

export const QUERY_MOVIE_BY_ID = gql`
  query ($movieByIdId: ID!) {
    movieById(id: $movieByIdId) {
      _id
      title
      year
      thumbsUp
      thumbsDown
      genre
      actors
      poster
    }
  }
`;

export const QUERY_ALL_MOVIES = gql`
  query (
    $filterGenre: String!
    $limit: Int!
    $page: Int!
    $order: Int!
    $sortOn: String!
    $word: String!
  ) {
    searchAndFilter(
      filterGenre: $filterGenre
      limit: $limit
      page: $page
      order: $order
      sortOn: $sortOn
      word: $word
    ) {
      _id
      title
      year
      thumbsUp
      thumbsDown
      poster
    }
  }
`;

export const THUMBS_UP_MUTATION = gql`
  mutation ($thumbsUpByIdId: ID!) {
    thumbsUpById(id: $thumbsUpByIdId) {
      thumbsUp
    }
  }
`;
export const THUMBS_DOWN_MUTATION = gql`
  mutation ($thumbsDownByIdId: ID!) {
    thumbsDownById(id: $thumbsDownByIdId) {
      thumbsDown
    }
  }
`;
