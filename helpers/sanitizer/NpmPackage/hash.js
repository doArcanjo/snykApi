const packageHashNPM = function(npmPackage){
	return  `${npmPackage.name}__${npmPackage.version}`
};

module.exports = packageHashNPM
