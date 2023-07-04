const express = require('express');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const { connect } = require('./Database');
const apiRoutes = require('./routes/MusicHubRoutes');
const authRoutes = require('./routes/AuthRoutes')
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.json());



const port = 3000;
connect();

app.listen(port, () => {
    console.log(`Great news! The application has started on port ${port}`);
})

app.use(authRoutes)
app.use(apiRoutes)
