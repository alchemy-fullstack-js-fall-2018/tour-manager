require('dotenv').config();
const createLocationWeather = require('../../lib/util/location');

describe('location services', () => {

    it('finds city, state, and weather for a zip', done => {
       
        const req = {
            body: { zip: '97209' }
        };
        let called = false;
        let error;
        const next = err => {
            called = true;
            error = err;
            
            expect(called).toBeTruthy();
            expect(error).toBeUndefined();
            expect(req.location).toEqual({ location: expect.any(Object), weather: expect.any(Object) });
            done();
        };
        createLocationWeather()(req, null, next);

    });
});
