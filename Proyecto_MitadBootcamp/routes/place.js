const express = require('express');
const router = express.Router();
const PlaceController = require('../controllers/placeController');
const uploadFile = require('../middlewares/multer');

// localhost:3000/place
router.get('/', (req, res) => {
  res.redirect('/place/allPlaces')
});

router.get('/allPlaces', PlaceController.allPlaces);

router.get('/onePlace/:place_id', PlaceController.onePlace);

router.get('/createPlaceForm/:city_id', PlaceController.createForm);

router.post('/createPlace/:city_id', uploadFile('places'), PlaceController.createPlace);

router.get('/editPlaceForm/:place_id', PlaceController.editPlaceForm);

router.post('/editPlace/:place_id', uploadFile('places'), PlaceController.editPlace);

router.get('/logicDeletePlace/:place_id', PlaceController.logicDeletePlace);

module.exports = router;