const Album = require('../models/Album')
const Artist = require('../models/Artist')
const User = require('../models/User')
const secret = require('../Secret')
const jwt = require('jsonwebtoken')


module.exports.artists_get = async (req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    let artists = await Artist.find({})
                    if (artists.length === 0) {
                        res.status(404).json( { error: "No artists found" })
                    } else {
                        res.status(200).json( { artists: artists})
                    }
                    
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
}

module.exports.artists_id_get = async(req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    try {
                        let data = await Artist.findById(req.params.id)
                        res.status(200).json( { artist: data})    
                    } catch (err) {
                        res.status(404).json({ error: "Could not find that artist."} )
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated."})
    } 
}

module.exports.albums_get = async (req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    let albums = await Album.find({})
                    if (albums.length === 0) {
                        res.status(404).json( { error: "No albums found" })
                    } else {
                        res.status(200).json( { albums: albums})
                    }
                    
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
}

module.exports.albums_id_get = async (req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    try {
                        let data = await Album.findById(req.params.id)
                        res.status(200).json( { album: data})    
                    } catch (err) {
                        res.status(404).json({ error: "Could not find that album."} )
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated."})
    } 
}

module.exports.search_get = async (req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
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
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
    
   
}

module.exports.artists_add_post = async (req, res) => {
    // Add an Artist
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    let artist = req.body;

                    if (artist.artistName === undefined || artist.location === undefined || artist.artistFormed === undefined || artist.active === undefined || artist.artistBio === undefined) {
                        // Checks if there's an error with submitted data. 
                        res.status(404).json({
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
                            res.status(404).json({
                                error: "Data not inputted correctly."
                            })
                        }
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
}

module.exports.albums_add_post = async (req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    let album = req.body;

                    if (album.albumName === undefined || album.albumArtist === undefined || album.tracks === undefined || album.releaseYear === undefined || album.genre === undefined) {
                        // Checks if there's an error with submitted data. 
                        res.status(409).json({
                            error: "Data not inputted correctly."
                        })
                    } else {
                        try {
                            let { albumName, albumArtist, tracks, releaseYear, genre} = req.body;
                            const album = Album.create({
                                albumName, albumArtist, tracks, releaseYear, genre
                            })
                            res.status(201).json({
                                album: `Successfully created ${(await album)._id}`
                            })
                        } catch (err) {
                            res.status(409).json({
                                error: "Data not inputted correctly."
                            })
                        }
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
    
}

module.exports.albums_genre_get = async (req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    let results = []
                    let genreName = await Album.find({
                        "$or": [
                            {genre: {$regex: req.params.genre}}
                        ]
                    })
                
                    if (genreName.length === 0) {
                        res.status(404).json({
                            error: "Data not found."
                        })
                    } else {
                        results.push(genreName)
                        res.status(200).json({
                            results
                        })
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    }  
}
 
module.exports.albums_update_patch = async (req, res) => {
    // Patch Request for Albums model. 
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    try {
                        let { albumName, albumArtist, tracks, releaseYear, genre } = req.body;
                        let album = await Album.findByIdAndUpdate(req.params.id,
                            {
                                $set: {
                                    albumName, albumArtist, tracks, releaseYear, genre
                                }
                            })
                        res.status(202).json({
                            message: `${req.params.id} has been updated.`
                        })
                    } catch (err) {
                        res.status(404).json({
                            error: `${req.params.id} could not be found in the database.`
                        })
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 

    
}

module.exports.artists_update_patch = async (req, res) => {
    // Patch Request for Artist model
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "You are not authenticated." })
                } else {
                    try {
                        let { artistName, location, artistFormed, active, artistBio } = req.body;
                        let artist = await Artist.findByIdAndUpdate(req.params.id,
                            {
                                $set: {
                                    artistName, location, artistFormed, active, artistBio
                                }
                            })
                        res.status(202).json({
                            message: `${req.params.id} has been updated.`
                        })
                    } catch (err) {
                        res.status(404).json({
                            error: `${req.params.id} could not be found in the database.`
                        })
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
}

module.exports.artist_delete = async(req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "Invalid Token" })
                } else {
                    try {
                        const deletedArtist = await Artist.findByIdAndDelete(req.params.id)
                        res.status(202).json({
                            deletedArtist: deletedArtist
                        })
                    } catch (err) {
                        res.status(404).json({
                            error: `${req.params.id} was not deleted successfully.`
                        })
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
}

module.exports.album_delete = async(req, res) => {
    const token = req.cookies.jwt
    try {
        if (token) {
            jwt.verify(token, secret.secret, async (err) => {
                if (err) {
                    res.status(403).json({ error: "Invalid Token" })
                } else {
                    try {
                        const deletedAlbum = await Album.findByIdAndDelete(req.params.id)
                        res.status(202).json({
                            deletedAlbum: deletedAlbum
                        })
                    } catch (err) {
                        res.status(404).json({
                            error: `${req.params.id} was not deleted successfully.`
                        })
                    }
                }
            })
        } else {
            res.status(403).json({ error: "You are not authenticated." })
        }    
    } catch (err) {
        res.status(403).json({ error: "You are not authenticated"})
    } 
}