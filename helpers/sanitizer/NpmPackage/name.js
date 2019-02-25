const packageNameNPM = function(name){
/*
  issue: 
  https://stackoverflow.com/questions/50366324/whats-the-npm-registry-url-for-a-scoped-package
  https://stackoverflow.com/questions/44228981/npm-registry-api-scoped-packages	
*/
	
	// if the NPM package is scoped, change "@"" into "%2F" see links above
	if (name.match(/^@/)) {
        name = name.replace(/\//, "%2F");
    }

    // remove all white spaces
    name=name.replace(/\s/g,'')

    return name;
}

module.exports = packageNameNPM
