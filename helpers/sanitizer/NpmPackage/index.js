import {requireContext} from '../../requireContext'

let t = requireContext({
	pathOfFolderToRequire:`${__dirname}/`,
	includeRegex : '.js',
	// if is desired to include tests
	// excludeRegex : 'index.js|null.test.js',
});

const packageNPM = function({name,version}){
	let sanitizedVersion=t.version(version);
	let sanitizedName=t.name(name);

	return { 
		version: sanitizedVersion,
		name: sanitizedName,
		hash: t.hash({version:sanitizedVersion, name:sanitizedName}),
	};
};

module.exports = {packageNPM,...t}
