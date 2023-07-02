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