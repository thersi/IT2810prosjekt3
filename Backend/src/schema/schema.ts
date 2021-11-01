const { Movie } = require('../model')
import { gql } from 'apollo-server'
import { makeExecutableSchema } from '@graphql-tools/schema';

// Type of inputs for the searchAndFilter-query
type searchAndFilterArgs = {
    page: number;
    limit: number;
    word: string;
    order: number;
    sortOn: string;
    filterGenre: string;
};

// Type of input for the movieById-query
type byIdArgs = {
    id: string
}

// The GraphQl resolvers
const resolvers = {
    // Resolvers for the queries
    Query: {
        /**
         * Finds and returns the search result based on the inputs. Also returning number of elements found
         * 
         * @param filterGenre a string with a genre-name, empty string if return all genres
         * @param limit number - Number of movies per page. Must be 1 or larger
         * @param page number - The page number. Must be 1 or larger.
         * @param order number - If -1 descending order, else increasing order.
         * @param sortOn string - if 'year' sort on year, else sort on title.
         * @param word string - The word to filter on, returns all movies if empty.
         */
        searchAndFilter: (_: any, { filterGenre, limit, page, order, sortOn, word }: searchAndFilterArgs) => {
            // set pagination and ordering variables
            const skips: number = limit * (Number(page) - 1);
            let orderNum: number;
            if (order != 1 && order != -1) {
                orderNum = 1 //default sort ASC if bad input
            }
            else {
                orderNum = order;
            }
            const movies = new Promise((resolve, reject) => {
                // find all documents where title and genre values matches regular expression
                // using params word and filterGenre
                let result = Movie.find({ title: { $regex: word, $options: '$i' }, genre: { $regex: filterGenre, $options: '$i' } },
                    (err: Error, movies: unknown) => {
                        if (err) reject(err);
                        else resolve(movies);
                    });
                if (sortOn === 'year') {
                    result.sort({ "year": orderNum }).skip(skips).limit(limit)
                } else {
                    // default sorting-attribute is title
                    result.sort({ "title": orderNum }).skip(skips).limit(limit)
                }
            })
            const count = new Promise((resolve, reject) => {
                // count the number of documents matching the params
                Movie.count({ title: { $regex: word, $options: '$i' }, genre: { $regex: filterGenre, $options: '$i' } }, (err: Error, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
            return {
                movies: movies,
                pages: count
            }
        },
        /**
         * Finds a single movie by id.
         * 
         * @param id string - the movieId
         */
        movieById: (_: any, { id }: byIdArgs) => {
            return new Promise((resolve, reject) => {
                Movie.findOne({ _id: id }, (err: Error, movie: unknown) => {
                    if (err) reject(err);
                    else resolve(movie);
                })
            })
        },
    },

    // Resolvers for the mutations
    Mutation: {
        /**
         * Increases the thumbsUp count of a movie.
         * 
         * @param id string - the movieId
         */
        thumbsUpById: (_: any, { id }: byIdArgs) => {
            return new Promise((resolve, reject) => {
                Movie.findOneAndUpdate(
                    { _id: id },
                    { $inc: { thumbsUp: 1 } },
                    { new: true },
                    (err: Error, movie: unknown) => {
                        if (err) reject(err);
                        else resolve(movie);
                    }
                )
            })
        },
        /**
         * Increases the thumbsDown count of a movie.
         * 
         * @param id string - the movieId
         */
        thumbsDownById: (_: any, { id }: byIdArgs) => {
            return new Promise((resolve, reject) => {
                Movie.findOneAndUpdate(
                    { _id: id },
                    { $inc: { thumbsDown: 1 } },
                    { new: true },
                    (err: Error, movie: unknown) => {
                        if (err) reject(err);
                        else resolve(movie);
                    }
                )
            })
        }
    }
}
// The GraphQL Type-definition
const typeDefs = gql`
    
    # Movie Type
    type Movie {
        _id: ID!
        title: String!
        thumbsUp: Int!
        year: Int!
        genre: [String!]!
        actors: [String!]
        thumbsDown: Int!
        poster: String!
    }

    # type for the result of the searchAndFilter-query
    type SearchResult {
        movies: [Movie!]
        pages: Int!
    }

    # type of queries
    type Query {
        movieById(id: ID!): Movie
        searchAndFilter(filterGenre: String! limit: Int! page: Int! order: Int!, sortOn: String! word: String!): SearchResult!
    }

    # type of mutations
    type Mutation {
       thumbsUpById(id: ID!): Movie
       thumbsDownById(id: ID!): Movie
    }
`
/* Make and export executable schema consisting of the 
   typedefs and resolvers. To be used by the apollo-server
 */
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

export default (schema);