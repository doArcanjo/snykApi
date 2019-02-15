const request = require('supertest');
const app = require('./app')
let apiPrependPath = process.env.API_PATH + process.env.API_VERSION;
console.log(apiPrependPath)

describe('GET /someNotDefinedRoute', function() {
  it('responds with 404 Not Found', function(done) {
    request(app)
      .get('/someNotDefinedRoute')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(404, done);
  });
});
/**/
describe('GET / (1st API Route Path)', function() {
  it('responds with text', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
});
/**/