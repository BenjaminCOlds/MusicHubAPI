const { Router } = require('express');
const apiController = require('../controller/MusicHubApiController')
const router = Router();

router.get('/artists', apiController.artists_get)

module.exports = router;