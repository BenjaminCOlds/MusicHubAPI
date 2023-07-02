const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    albumName: {
        type: String, 
        required: true
    },
    albumArtist: {
        type: String,
        required: true
    },
    tracks: {
        type: Number,
        required: true
    },
    releaseYear: {
        type: Number, 
        required: true
    },
    genre: {
        type: String, 
        required: true
    }
})

const Album = mongoose.model('album', albumSchema);
module.exports = Album;