// ----------------------------
//  DEPENDENCIES
// ----------------------------

const debug = require('debug');
const log = debug('DAL:npmSearch');

// ----------------------------
//  Data Access Layer
// ----------------------------

const find = (ctx, next) => {
    // if(ctx.indexOf([`keypad`, `app`, `sms`])>0 )
    if (ctx)
    {
      return {message: 'npmSearchs'} 
    }
    
    return { message: ' Empty ctx from npmsearch DAL' }

  };

const npmSearchDAL = {
  find:find
}

module.exports = npmSearchDAL ;
