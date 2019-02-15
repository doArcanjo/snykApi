const fetch = require('node-fetch');
const debug = require('debug');
const log = debug('helpers:fetch');

const fetcha = async ({url,transactionId}) => {
  let res =""; 	
  let resJson="";

  try {
    res = await fetch(url);
    resJson = await res.json();
  } catch (err) {
  	log(url, err, transactionId)
  	return {
  		data: `please Contact support with code ${transactionId}`,
  		status: 500	
  	}
  }
  const { status } = res; 
  return {
  	data: resJson,
  	status: status
  }
}

module.exports=fetcha;
