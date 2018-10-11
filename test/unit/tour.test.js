const Tour = require('../../lib/models/tour');
const { getErrors } = require('./helpers');


describe('tour model', () => {

    it('validates a good model', () => {
        const data = {
            title: 'Circus of Lame Stuff',
            activities: ['bad carnie food', 'one ride thats broken', 'smelly petting zoo'],
            launchDate: new Date(2014, 4, 16),
            stops: [
                {
                    location: {
                        city: 'Portland',
                        state: 'OR',
                        zip: '97209'
                    },
                    weather: {
                        temperature: '80.4 F (26.9 C)',
                        condition: 'Cloudy'
                    },
                    attendance: 450
                }
            ]
        };

        const tour = new Tour(data);
        const jsonTour = tour.toJSON();
        expect(jsonTour).toEqual({ ...data, stops: expect.any(Array), _id: expect.any(Object) });
        expect(jsonTour.stops[0]).toEqual({ ...data.stops[0], _id: expect.any(Object) });
        expect(jsonTour.stops).toHaveLength(1);
    });

});
