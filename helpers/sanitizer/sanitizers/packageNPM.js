import packageNameNPM from './packageNameNPM';
import packageVersionNPM  from './packageVersionNPM'; 

const packageNPM = function({name,version}){
	
	return { 
		version: packageVersionNPM(version),
		name: packageNameNPM(name)
	};
};

module.exports = packageNPM
