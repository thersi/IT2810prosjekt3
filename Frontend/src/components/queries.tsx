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
