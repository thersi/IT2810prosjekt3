import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client"

interface Movie {
    _id: string;
    title: string;
    thumbsUp: number;
    year: number;
    genere: string[];
    actors: string[]
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
    query($limit: Int!, $page: Int!, $order: Int!, $sortOn: String!){
        movies(limit: $limit, page: $page, order: $order, sortOn: $sortOn) {
            _id
            title
            year
            thumbsUp
            thumbsDown
        }
}
` 
//CAN FILL INN MORE ATTRIBUTES FROM INTERFACE Movie TO GET MORE INFO

const QUERY_ALL_FILTERED_GENRE = gql`
    query($filterGenre: String!, $limit: Int!, $page: Int!, $order: Int!, $sortOn: String!){
        filterOnGenre(filterGenre: $filterGenre, limit: $limit, page: $page, order: $order, sortOn: $sortOn) {
            _id
            title
            year
            thumbsUp
            thumbsDown
        }
}
`

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
`

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
`

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
`


const MovieList = (props: any) => {
    const { data: movieData, loading: MovieLoading, error: movieError } = useQuery(QUERY_ALL_MOVIES);

    if (movieError) {
        console.log(movieError)
    }

    if (MovieLoading) {
        return <h1>DATA IS LOADING...</h1>
    }
    if (movieData) {
        console.log(movieData)
    }

    return (
        <div className="image-container d-flex justify-content-start m-3">
            {movieData && movieData.movies.map((movie: Movie) => {
                return (
                    <div>
                        <h1>{movie.title}</h1>
                        <p>{movie._id}</p>
                    </div>
                );
            })}
        </div>
    );
    // return (
    //   <>
    //     {props.movies.map((movie: any, index: any) => (
    //       <div className="image-container d-flex justify-content-start m-3">
    //         <img src={movie.Poster} alt="movie"></img>
    //       </div>
    //     ))}
    //   </>
    // );
};

export default MovieList;
