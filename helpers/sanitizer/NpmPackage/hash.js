// import packageNameNPM from './packageNameNPM';
// import packageVersionNPM  from './packageVersionNPM'; 

const packageHashNPM = function(npmPackage){
	
	console.log(`heyy  ${npmPackage.name}__${npmPackage.version}`)
	return  `${npmPackage.name}__${npmPackage.version}`
};

module.exports = packageHashNPM
