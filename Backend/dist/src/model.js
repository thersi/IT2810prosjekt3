"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = exports.MovieSchema = void 0;
var mongoose_1 = require("mongoose");
// Define the schema of the model for a movie 
exports.MovieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    thumbsUp: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    actors: {
        type: [String],
    },
    thumbsDown: {
        type: Number,
        required: true
    },
    poster: {
        type: String,
        required: true
    }
});
// create and export the Model
exports.Movie = (0, mongoose_1.model)('movies', exports.MovieSchema);
exports.default = { Movie: exports.Movie, MovieSchema: exports.MovieSchema };
