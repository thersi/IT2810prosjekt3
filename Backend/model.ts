//import mongoose from 'mongoose'
//const Schema = mongoose.Schema;
//const { Schema } = mongoose
import {Schema, model, Model, Document} from 'mongoose'

interface IMovie extends Document {
    title: String;
    thumbsUp: Number;
    year: Number;
    genre: [String];
    actors: [String];
    thumbsDown: Number;
}

const MovieSchema: Schema = new Schema({
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
    }
});

const Movie: Model<IMovie> = model('movies', MovieSchema);
export default{Movie};


/* export default new Schema<Movie>({
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
    }
}); */

//module.exports = mongoose.model('Movies', movieSchema);

/* const Movies = mongoose.model('movies', movieSchema)
module.exports = {
    Movies
} */
