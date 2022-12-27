const app = require('../app');
const supertest = require('supertest');

describe('POST /stars', function () {
    it('should return status 200', function (done) {
        supertest(app)
            .post('/stars')
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

describe('GET /stars', function () {
    it('should return status 200', function (done) {
        supertest(app)
            .get('/stars')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});
