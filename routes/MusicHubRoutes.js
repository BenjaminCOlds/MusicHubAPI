const { Router } = require('express');
const apiController = require('../controller/MusicHubApiController')
const router = Router();

router.get('/artists', apiController.artists_get)
router.post('/artists/add', apiController.artists_add_post)
router.post('/albums/add', apiController.albums_add_post)

module.exports = router;