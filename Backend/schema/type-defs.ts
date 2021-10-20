const { gql } = require("apollo-server");

const defs = gql`

    type Movies {
        _id: ID!
        title: String!
        thumbsUp: Int!
        thumbsDown: Int!
        year: Int!
        genere: [String!]!
        actors: [String!]
    }

    type Query {
        movies: [Movie!]!
    }

    type Mutation {
       createMovie(input: CreateMovieInput!): Movie!
    }
`

module.exports = { defs };
