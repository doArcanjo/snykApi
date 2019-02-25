const packageVersionNPM = function(version){
	
	// if the NPM package has no version we return latest 
	if (!version) {
        return 'latest'
    }

	// if the NPM package has version with "~" remove it 
	if (version.match(/^~/)) {
        version = version.replace(/~/, "");
    }

    // remove "^" from version of a NPM package 
    version=version.replace(/^\^/g,'')

    return version;
}

module.exports = packageVersionNPM
