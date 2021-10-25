import {Schema, model, Model, Document} from 'mongoose'

export interface IMovie extends Document {
    title: String;
    thumbsUp: Number;
    year: Number;
    genre: [String];
    actors: [String];
    thumbsDown: Number;
    poster: String;
}

export const MovieSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumbsUp: {
        type: Number,
        required: true},
    year: {
        type: Number,
        required: true},
    genre: {
        type: [String],
        required: true},
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

export const Movie: Model<IMovie> = model('movies', MovieSchema);

export default{Movie, MovieSchema};
