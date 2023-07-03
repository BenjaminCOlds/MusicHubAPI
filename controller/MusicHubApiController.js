const Album = require('../models/Album');
const Artist = require('../models/Artist');


module.exports.artists_get = async (req, res) => {
    try {
        let data = await Artist.find({});
        if (data.length === 0) {
            res.status(404).json({
                error: "No data was found"
            })
        } else {
            res.status(200).json({
                artists: data
            })
        }
    } catch (err) {
        res.status(400).json({
            "error": "Something went wrong on the server."
        })
    }
}

module.exports.artists_id_get = async(req, res) => {
    try {
        let data = await Artist.findById(req.params.id)
        res.status(200).json({
            artist: data
        })
        
    } catch (err) {
        res.status(404).json({
            error: "We couldn't find an artist matching that criteria."
        })
    }
}

module.exports.albums_get = async (req, res) => {
    try {
        let data = await Album.find({});
        if (data.length === 0) {
            res.status(404).json({
                error: "No data was found."
            })
        } else {
            res.status(200).json({
                albums: data
            })
        }
    } catch (err) {
        res.status(400).json({
            "error": "Something went wrong on the server."
        })
    }
}

module.exports.albums_id_get = async (req, res) => {
    try {
        let data = await Album.findById(req.params.id)
        res.status(200).json({
            album: data
        })
    } catch (err) {
        res.status(404).json({
            error: "No data was found."
        })
    }
}

module.exports.search_get = async (req, res) => {
    let data = []
    let albumName = await Album.find({
        "$or": [
            {albumName:{$regex:req.params.searchTerm}}
        ]
    });

    let genreName = await Album.find({
        "$or": [
            {genre: {$regex: req.params.searchTerm}}
        ]
    })

    let artistName = await Artist.find({
        "$or": [
            {artistName: {$regex: req.params.searchTerm}}
        ]
    })

    if (albumName.length != 0 ) {
        data.push(albumName)
    }

    if (genreName.length != 0) {
        data.push(genreName)
    }

    if (artistName.length != 0) {
        data.push(artistName)
    }

    if (data.length != 0) {
        res.status(200).json({
            results: data
        })
    } else {
        res.status(404).json({
            error: "No data was found based on your search criteria."
        })
    }
}

module.exports.artists_add_post = async (req, res) => {
    // Add an Artist
    let artist = req.body;

    if (artist.artistName === undefined || artist.location === undefined || artist.artistFormed === undefined || artist.active === undefined || artist.artistBio === undefined) {
        // Checks if there's an error with submitted data. 
        res.status(406).json({
            error: "Data not inputted correctly."
        })
    } else {
        try {
            let { artistName, location, artistFormed, active, artistBio } = req.body;
            const artist = Artist.create({
                artistName, location, artistFormed, active, artistBio
            })
            res.status(201).json({
                artist: `Successfully created ${(await artist)._id}`
            })
        } catch (err) {
            res.status(406).json({
                error: "Data not inputted correctly."
            })
        }
    }
}

module.exports.albums_add_post = async (req, res) => {
    // Add an Album
    let album = req.body;

    if (album.albumName === undefined || album.albumArtist === undefined || album.tracks === undefined || album.releaseYear === undefined || album.genre === undefined) {
        res.status(406).json({
            error: "Invalid data."
        })
    } else {
        try {
            let { albumName, albumArtist, tracks, releaseYear, genre } = req.body;
            const album = Album.create({
                albumName, albumArtist, tracks, releaseYear, genre
            })
            res.status(201).json({
                album: `Successfully created ${(await album)._id}`
            })
        } catch (err) {
            res.status(406).json({
                error: "Invalid data."
            })
        }
    }
}