const assert = require('assert');
const sanitizer = require('./index')


describe(`Sanitize NPM package names`, function() {
  var tests = [
    {args: "express",       expected: "express"},
    {args: `@nuxtjs/apollo`,    expected: `@nuxtjs%2Fapollo`},
    {args: " snyk ", expected: "snyk"}
  ];

  tests.forEach(function(test) {
    it(`"Sanitized" the package name: '${test.args}' into '${test.expected}' `, function() {
      let res = sanitizer.packageNameNPM(test.args);
      assert.strictEqual(res, test.expected);
    });
  });
});

/* If is desirable to split the tests... * /
	let res = sanitizer['packageNameNPM.test'](sanitizer.packageNameNPM)
/**/

describe(`Sanitize NPM package version`, function() {
  var tests = [
    {args: "4.12.1",       expected: "4.12.1"},
    {args: ``,    expected: `latest`},
    {args: `~5.2.0`,    expected: `5.2.0`},
    {args: "^6.12.3", expected: "6.12.3"}
  ];

  tests.forEach(function(test) {
    it(`"Sanitized" the package version: '${test.args}' into '${test.expected}' `, function() {
      let res = sanitizer.packageVersionNPM(test.args);
      assert.strictEqual(res, test.expected);
    });
  });
  
});

describe(`Sanitize packages`, function() {
  var tests = [
    { 
    	args: {version: "4.12.1", name:'express' },
    	expected: {version: "4.12.1", name:'express' },
    },
    {
    	args: {version:`^5.2.0`, name:`@nuxtjs/apollo` },
    	expected: {version: "5.2.0", name:"@nuxtjs%2Fapollo"}
    },
    {
    	args: {version: "~6.12.3", name:" snyk "},
    	expected: {version: "6.12.3", name:"snyk"}
    }
  ];

  tests.forEach(function(test) {
    it(`"Sanitized" the package version: '${JSON.stringify(test.args)}'
     into '${JSON.stringify(test.expected)}' `, function() {
      let res = sanitizer.packageNPM(test.args);
      assert.deepEqual(res, test.expected);
    });
  });
  
});