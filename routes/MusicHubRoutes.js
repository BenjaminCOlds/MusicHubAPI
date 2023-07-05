const { Router } = require('express');
const apiController = require('../controller/MusicHubApiController')
const router = Router();

router.get('/search/:searchTerm', apiController.search_get)
router.get('/artists', apiController.artists_get)
router.get('/artists/:id', apiController.artists_id_get)
router.post('/artists/add', apiController.artists_add_post)
router.get('/albums', apiController.albums_get)
router.get('/albums/:id', apiController.albums_id_get)
router.post('/albums/add', apiController.albums_add_post)
router.get('/albums/genre/:genre', apiController.albums_genre_get)
router.patch('/albums/update/:id', apiController.albums_update_patch)
router.patch('/artists/update/:id', apiController.artists_update_patch)
router.delete('/artists/delete/:id', apiController.artist_delete)
router.delete('/albums/delete/:id', apiController.album_delete)

module.exports = router;