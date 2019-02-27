import {requireContext} from '../requireContext'
import assert from 'assert';
import {join} from 'path';

describe(`Requires a Directory with all the modules inside, by default files named "index.js" or "test.js" will be excluded
  Has 3 arguments - named parameters - 1 mandatory :
  -> pathOfFolderToRequire (mandatory)
     .: The absolute path of the folder       
  -> includeRegex
     .: A regex pattern to include files  
        default: '.js',
  -> excludeRegex
     .: A regex pattern to exclude files
        default: 'test.js|index.js'
  `, function() {
  var tests = [
    {
      message:`It skips "index.js" files and those who end with ".test.js"`,
      args: {
        pathOfFolderToRequire:join(__dirname, '..', 'sanitizer', 'NpmPackage','/'),
      },
      expected: {
        length:3,
      }
    },
    {
      message:`It includes all '.js' files, including tests`,
      args: {
        pathOfFolderToRequire:join(__dirname, '..', 'sanitizer', 'NpmPackage','/'),
        includeRegex : '.js',
        excludeRegex : 'NONE.test.js'
      },
      expected: {
        length:5,
      }
    },
    {
      message:`It includes all 'test.js' files`,
      args: {
        pathOfFolderToRequire:join(__dirname, '..', 'sanitizer', 'NpmPackage','/'),
        includeRegex : 'test.js',
        excludeRegex : 'NONE.test.js'
      },
      expected: {
        length:1,
      }
    },
  ];

  tests.forEach(function(test) {
    it(`${test.message} expecting: '${JSON.stringify(test.expected)}' `, function() {
      let res = requireContext(test.args);
      assert.strictEqual(Object.keys(res).length, test.expected.length);
    });
  });
});

