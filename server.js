//import app.js
const app = require('./backend/app');
//listen to http://localhost:3000
app.listen(3000,()=>{console.log("express server is running on port 3000")});