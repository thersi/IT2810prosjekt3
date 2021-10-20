const Movs = require('../model.ts');

const res = {
    Query: {
        movies () { //prøv å endre denne til ny logikk
            return Movs.find()
            .then((movie: any[]) => {
                return movie.map((r: { _doc: any; }) => ({...r._doc}))
            })
            .catch((err: any) => {
                console.error(err)
            })
        }
    },
    Mutation: { //prøvd å endre denne men får feilmelding i apollo på localhost
        createMovie: (args: { title: String; thumbsUp: Number; year: Number; genre: [String]; actors: [String]; thumbsDown: Number; }) => {
            const {title, thumbsUp, year, genre, actors, thumbsDown} = args
            const movieObj = new Movs({
                title, 
                thumbsUp,
                year,
                genre,
                actors,
                thumbsDown
            })
            return movieObj.save()
                .then((result: { _doc: any; }) => {
                    return{ ...result._doc}
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }
    }
}
module.exports = { res };