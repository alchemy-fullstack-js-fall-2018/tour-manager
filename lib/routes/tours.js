const router = require('express').Router();
const Tour = require('../models/tour');
const createLocationWeather = require('../util/location');

const updateOptions = {
    new: true,
    runValidators: true
};

module.exports = router
    .post('/', (req, res) => {
        const { title, activities, launchDate, stops } = req.body;
        Tour.create({ title, activities, launchDate, stops }).then(tour => 
            res.json(tour)
        );
    })
    .get('/', (req, res) => {
        Tour.find().then(tours => res.json(tours));
    })
    .get('/:id', (req, res) => {
        const { id } = req.params;
        Tour.findById(id).then(tour => res.json(tour));
    })
    .post('/:id/stops', createLocationWeather(), (req, res, next) => {
        const { id } = req.params;
        const { location, weather } = req;
        const stop = {
            location: location,
            weather: weather
        };
        Tour.findByIdAndUpdate(id, { $push: { stops: stop } }, updateOptions)
            .then(tour => res.json(tour))
            .catch(next);
    });
