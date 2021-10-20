const mon = require('mongoose');
const Schema = mon.Schema;
//const { Schema } = mongoose

const movieSchema = new Schema({
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

//module.exports = mon.model('Movies', movieSchema);

const Movies = mon.model('movies', movieSchema)
module.exports = {
    Movies
}
