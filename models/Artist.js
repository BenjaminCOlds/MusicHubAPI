const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    artistFormed: {
        type: Number,
        required: true 
    },
    active: {
        type: String,
        required: true
    },
    artistBio: {
        type: String, 
        required: true
    }
});


const Artist = mongoose.model('artist', artistSchema);
module.exports = Artist;