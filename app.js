const express = require('express');
const { connect } = require('./Database');
const apiRoutes = require('./routes/MusicHubRoutes');
const authRoutes = require('./routes/AuthRoutes')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())

const port = 3000;
connect();

app.listen(port, () => {
    console.log(`Great news! The application has started on port ${port}`);
})

app.use(authRoutes)
app.use(apiRoutes)
