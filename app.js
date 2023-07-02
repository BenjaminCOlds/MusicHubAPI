const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const { connect } = require('./Database');

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const port = 3000;
connect();

app.listen(port, () => {
    console.log(`Great news! The application has started on port ${port}`);
})

app.get('/', (req, res) => {
    res.send('home')
})

app.get('/artists', async (req, res) => {
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
})

app.get('/artists/:id', async (req, res) => {
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
});

app.get('/albums', async (req, res) => {
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
})

app.get('/albums/:id', async (req, res) => {
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
})

app.get('/search/:searchTerm', async(req, res) => {
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
});
