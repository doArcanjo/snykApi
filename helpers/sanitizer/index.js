import {requireContext} from '../requireContext'
const t = requireContext({
	pathOfFolderToRequire:`${__dirname}/NpmPackage/`,
	includeRegex : 'index.js',
	excludeRegex : 'test.js'
});

module.exports={npm:t.index};
// export default t;
