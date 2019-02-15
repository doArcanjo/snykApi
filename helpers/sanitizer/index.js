import {requireContext} from '../requireContext'
const t = requireContext({
	pathOfFolderToRequire:`${__dirname}/sanitizers/`,
	includeRegex : '.js',
	 // excludeRegex : 'todo.test.js'
});

module.exports=t;
