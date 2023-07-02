const express = require('express');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const { connect } = require('./Database');
const apiRoutes = require('./routes/MusicHubRoutes')

const app = express();

app.use(express.json());


const port = 3000;
connect();

app.listen(port, () => {
    console.log(`Great news! The application has started on port ${port}`);
})

app.use(apiRoutes)