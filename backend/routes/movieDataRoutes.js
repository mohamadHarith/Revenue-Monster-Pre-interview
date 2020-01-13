const express = require('express');
const {movieDataController} = require('../controllers');

const router = express.Router();

router.get('/movieData', movieDataController.getMovieData);
router.get('/movieImage/:fileName', movieDataController.getMovieImage);
router.post('/searchMovie', movieDataController.searchMovie);

module.exports = router;