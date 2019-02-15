// ----------------------------
//  DEPENDENCIES
// ----------------------------

const debug = require('debug');
const path = require('path');
const npmSearchDAL = require('./npmSearch.dal');
const sleep = require('../../helpers/sleep');
const fetch = require('../../helpers/fetch');
const {packageNPM} = require ('../../helpers/sanitizer');
const NPM_REGISTRY = process.env.NPM_REGISTRY;
const flatCache = require('flat-cache');

const log = debug('controllers:npmSearch');
var npmSearchCache = flatCache.load('npmSearchCache') //,path.resolve('./helpers/cache/db'));

// ----------------------------
//  CONTROLLER
// ----------------------------

const getPackageInfo = async ({name, version, depthLevel}) => {
    
    depthLevel --;
    if (depthLevel<0){
        return {name, version};
    }

    let npmPackage = packageNPM({name,version});
    let ret={
         name,
         version:npmPackage.version
    };
    let res;
    let cacheValue = npmSearchCache.getKey( `${npmPackage.name}__${npmPackage.version}`);
    if (cacheValue){
        console.error(`From cache: ${npmPackage.name}__${npmPackage.version}!`)
        res = cacheValue;
    }
    else {

        let url = `${NPM_REGISTRY}${npmPackage.name}/${npmPackage.version}`
        log(`@ getPackageInfo url: ${url}`)
        res = await fetch({url, transactionId: 2121});
        npmSearchCache.setKey( `${npmPackage.name}__${npmPackage.version}`, 
        {
            name:npmPackage.name, 
            version:npmPackage.version, 
            data:{
                dependencies:res.data.dependencies,
                devDependencies:res.data.devDependencies
            }
        }); 
        npmSearchCache.save();  

    }

    if(res.data.dependencies){
        ret["dependencies"] = [];
        await Promise.all(Object.entries(res.data.dependencies).map(async ([key, val]) => {
            const t = await getPackageInfo({name:key, version:val, depthLevel:depthLevel})
           ret["dependencies"].push(t);
        }));
        /** /
        for (const [key, val] of Object.entries(res.data.dependencies)) {
           let t = await getPackageInfo({name:key, version:val, depthLevel:depthLevel})
           ret["dependencies"].push(t);
           
        }
        /**/
    }

    if(res.data.devDependencies){
        ret["devDependencies"] = [];
        
        await Promise.all(Object.entries(res.data.devDependencies).map(async ([key, val]) => {
            const t = await getPackageInfo({name:key, version:val, depthLevel:depthLevel})
           ret["devDependencies"].push(t);
        }));
        /** /
        for (const [key, val] of Object.entries(res.data.devDependencies)) {
           let t = await getPackageInfo({name:key, version:val, depthLevel:depthLevel})
           
           ret["devDependencies"].push(t);
           // console.log('have --> t ',key, val, t);          // the name of the current key. 
        }
        /**/
    }

    // await sleep(2000)  
    return ret;
};

const getPackageInfoSlow = async ({name, version, depthLevel}) => {
    
    depthLevel --;
    if (depthLevel<0){
        return {name, version};
    }
    //if ()
    let npmPackage = packageNPM({name,version});
    console.error(npmPackage)
    console.log(`Package name:${name} ver${npmPackage.version}`)
    //let packageVersion = version ? `/${npmPackage.version}`: `/latest`;   
    let url = `${NPM_REGISTRY}${npmPackage.name}/${npmPackage.version}`
    log(`@ getPackageInfo url: ${url}`)
    let res = await fetch({url, transactionId: 2121});

    let ret={
         name,
         version
    };

    if(res.data.dependencies){
        ret["dependencies"] = [];
     
        for (const [key, val] of Object.entries(res.data.dependencies)) {
           let t = await getPackageInfo({name:key, version:val, depthLevel:depthLevel})
           
           ret["dependencies"].push(t);
           // console.log('have --> t ',key, val, t);          // the name of the current key. 
        }
        
    }

    if(res.data.devDependencies){
        ret["devDependencies"] = [];
     
        for (const [key, val] of Object.entries(res.data.devDependencies)) {
           let t = await getPackageInfo({name:key, version:val, depthLevel:depthLevel})
           ret["devDependencies"].push(t);
        }
     
    }

    return ret;
};



const getAll = (ctx, next) => {
    console.log('@ npmSearchController')
    
    searchCtx = [];

    return npmSearchDAL.find({ctx: searchCtx})
        // .then(val => {json(val)})
        // .catch()

  }


const getSingle = (ctx, next) => {
    console.log('@ npmSearchController')
    if(ctx.source.indexOf([`keypad`, `app`, `sms`])>0 )
    // return res.json({ message: 'Retrieved Key Events' });
    {
    return npmSearchDAL.find({source: ctx.source})
        .then(val => {json(val)})
        .catch()
      
    }
    
    return { message: 'Npm Search from CONTROLLER' }

  }

const npmSearchController = {
    getAll:getAll,
    getPackageInfo:getPackageInfo
}; 

module.exports = npmSearchController;
