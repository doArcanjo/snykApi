const flatCache = require('flat-cache');
const path = require('path');

//var npmSearchCache = flatCache.load('npmSearchCache11') 
var npmSearchCache = flatCache.load(path.resolve('./helpers/cache/db/npmSearchCache11'));

module.exports= npmSearchCache;
