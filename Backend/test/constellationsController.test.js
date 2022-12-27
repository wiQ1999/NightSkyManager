const app = require('../app');
const supertest = require('supertest');

describe('POST /constellations', function () {
    it('should return status 200', function (done) {
        supertest(app)
            .post('/constellations')
            .send({
                name: "test",
                description: "test",
                link: "test",
                related: []
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /constellations', function () {
    it('should return status 200', function (done) {
        supertest(app)
            .get('/constellations')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});
