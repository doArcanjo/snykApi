const {normalize} = require('path');
const debug = require('debug');
const log = debug('helpers:requireContext');


const requireContext = ({pathOfFolderToRequire, includeRegex='.js', excludeRegex='test.js|index.js'}) =>{
  const thePath= normalize(pathOfFolderToRequire);
  let allModules = {};
  var regexIncludes =  new RegExp( includeRegex, 'g' );
  var regexExcludes =  new RegExp( excludeRegex, 'g' );
  require('fs').readdirSync(thePath).forEach(function(file) {

    
    if ( 
        file.match(regexIncludes) !== null 
        // && file !== 'index.js' 
        && file.match(regexExcludes) === null
        ) {
      var name = file.replace('.js', '');
      allModules[name] = require(thePath + file);
    }
  });
  log(allModules)
  return allModules;
  
}

module.exports={requireContext};

