import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

//DETTE ER KUN SELVE QUERIENE. INGEN HÅNDTERING ELLER LOGIKK
//FLYTT DEM DIT DE TRENGS OG BRUK USEQUERY

interface Movie {
  _id: string;
  title: string;
  thumbsUp: number;
  year: number;
  genere: string[];
  actors: string[];
  thumbsDown: number;
  poster: string;
}

/* gets all movies (gets only specified attributes).  
limit: number of elements to load
page: determine offset (ex: first three, next three, nextnext three etc.
order: 1 (ASC) or -1 (DESC). 
sortOn: "title" or "year"
*/
const QUERY_ALL_MOVIES = gql`
  query ($limit: Int!, $page: Int!, $order: Int!, $sortOn: String!) {
    movies(limit: $limit, page: $page, order: $order, sortOn: $sortOn) {
      _id
      title
      year
      thumbsUp
      thumbsDown
    }
  }
`;
//CAN FILL INN MORE ATTRIBUTES FROM INTERFACE Movie TO GET MORE INFO

const QUERY_ALL_FILTERED_GENRE = gql`
  query (
    $filterGenre: String!
    $limit: Int!
    $page: Int!
    $order: Int!
    $sortOn: String!
  ) {
    filterOnGenre(
      filterGenre: $filterGenre
      limit: $limit
      page: $page
      order: $order
      sortOn: $sortOn
    ) {
      _id
      title
      year
      thumbsUp
      thumbsDown
    }
  }
`;

const QUERY_ALL_CONTAINS_SEARCH = gql`
    query($limit: Int!, $page: Int!, $word: String!, $order: Int!, $sortOn: String!){
        containsString(limit: $limit, page: $page, word: $word, order: $order, sortOn: $sortOn) {
            _id
            title
            year
            thumbsUp
            thumbsDown
        }
    }
}
`;

const QUERY_MOVIE_BYID = gql`
    query($movieByIdId: ID!){
        movieById(id: $movieByIdId) {
            title
            year
            thumbsUp
            thumbsDown
        }
    }
}
`;

const QUERY_MOVIE_BYTITLE = gql`
    query($title: String!){
        movieByTitle(title: $title) {
            title
            year
            thumbsUp
            thumbsDown
        }
    }
}
`;
