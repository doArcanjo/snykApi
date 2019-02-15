const express = require('express');
const helmet = require("helmet");  
const cors = require("cors");  
const bodyParser = require('body-parser');
// No - reverse proxy work 
// var compression = require("compression"); 

const npmSearchRoutes = require('./services/npmSearch/npmSearch.route');

const app = express();

app.use(bodyParser.json());
app.use(cors()); 
app.use(helmet()); 
//  "/api/v1"
let apiPrependPath = process.env.API_PATH + process.env.API_VERSION;

app.use(apiPrependPath, npmSearchRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Snyk!');
});

// app.use("/api/events", events.API);
// app.use("/api/forms", forms);

/* Remove */
const listEndpoints = require('express-list-endpoints')
console.log(listEndpoints(app));
/**/


module.exports = app;