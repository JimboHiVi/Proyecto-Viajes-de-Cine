const express = require('express');
const router = express.Router();
const CityController = require('../controllers/cityController');
const uploadFile = require('../middlewares/multer');

// localhost:3000/city
router.get('/', (req, res) => {
  res.redirect('/city/allCities')
});

router.get('/allCities', CityController.allCities);

router.get('/oneCity/:city_id', CityController.oneCity);

router.get('/createCityForm', CityController.createForm);

router.post('/createCity', uploadFile('cities'), CityController.createCity);

router.get('/editCityForm/:city_id', CityController.editCityForm);

router.post('/editCity/:city_id', uploadFile('cities'), CityController.editCity);

router.get('/logicDeleteCity/:city_id', CityController.logicDeleteCity);

module.exports = router;
