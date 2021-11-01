import { Schema, model, Model, Document } from 'mongoose'
/* 
Mongoose model for documents in the movies collection 
in MongoDB 
*/

// Interface for the Model
export interface IMovie extends Document {
    title: String;
    thumbsUp: Number;
    year: Number;
    genre: [String];
    actors: [String];
    thumbsDown: Number;
    poster: String;
}

// Define the chema of the model for a movie 
export const MovieSchema: Schema = new Schema({
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
export const Movie: Model<IMovie> = model('movies', MovieSchema);

export default { Movie, MovieSchema };
