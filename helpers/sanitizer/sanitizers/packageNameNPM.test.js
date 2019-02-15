const assert = require('assert');
import sanitizer from './packageNameNPM'

const SanitizePackageNames = function(functionFromParent) {

  describe(`Sanitize NPM package names Local`, function() {
    var tests = [
      {args: "express",       expected: "express"},
      {args: `@nuxtjs/apollo`,    expected: `@nuxtjs%2Fapollo`},
      {args: " snyk ", expected: "snyk"}
    ];

    tests.forEach(function(test) {
      it(`"Sanitized" the package name: '${test.args}' into '${test.expected}' `, function() {
        let res;
        if (typeof(functionFromParent) === 'function')
        {
          res =  functionFromParent.apply(null, [test.args]);
        }
        else {
          res = sanitizer(test.args);
        }
        assert.strictEqual(res, test.expected);
      });
    });
  });
}

module.exports = SanitizePackageNames
