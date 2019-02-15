// ----------------------------
//  DEPENDENCIES
// ----------------------------

const express = require('express');
const debug = require('debug');
const request = require('supertest');

const app = express();

let apiPrependPath = process.env.API_PATH + process.env.API_VERSION;

// ----------------------------
//  Service to Test
// ----------------------------

const serviceToTest = "npmSearch";
const router = require(`./${serviceToTest}.route.js`);
const log = debug(`test:routes:${serviceToTest}`);

// ----------------------------
//  Initialization
// ----------------------------

app.use(apiPrependPath, router);

// ----------------------------
//  Tests
// ----------------------------

let npmSearchRoute1=`${apiPrependPath}/package/express`;

describe(`GET ${npmSearchRoute1}`, function() {
  it('It should respond with latest package, when no package version passed', async () => {
    const response = await request(app)
      .get(npmSearchRoute1)
      .set('Accept', 'application/json')
      .expect(200);
      /** /
      .expect('Content-Type', /text/)
      /**/
     // console.log(response.body)
     // assert.ok(response.status === 200);


  });
});

