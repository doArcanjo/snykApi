// ----------------------------
//  DEPENDENCIES
// ----------------------------

const express = require('express');
const debug = require('debug');
const controller = require('./npmSearch.controller');
const requestsCache = require('../../middleware/requestsCache');
const log = debug('routes:npmSearch');
// ----------------------------
//  ROUTER
// ----------------------------

const router = express.Router();
router.get('/', function(req,res,next){
	log(`I´m @ npmSearch routes Main`)
	return res.json(controller.getAll(req.params,next));
});

router.get('/package', function(req,res,next){
	log(`I´m @ npmSearch package`)
	return res.json(controller.getAll(req.params,next));
});

router.get("/package/:name/:version?",requestsCache(10), async (req, res, next) => {
   let result = await controller
   		.getPackageInfo({
   			name: req.params.name, 
			   version: req.params.version,
			   depthLevel: 2
   		});
   		
   return res.json(result);			

})


// ----------------------------
//  EXPORT
// ----------------------------

module.exports = router;
