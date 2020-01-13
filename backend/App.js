const express = require('express');
const cors = require('cors');
const {movieDataRoutes} = require('./routes');
const fsExtra = require('fs-extra')
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


//init movie data
const {fetchRawData} = require('./services/movieDataService');
fetchRawData();

//routes
app.get('/', (req,res)=>{ res.json('Its working!');});
app.use('/revenuMonsterPreinterviewTest', movieDataRoutes);




//listen to port number specified in environment variable or 5000
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`));




//clean up 
process.stdin.resume();
process.on('SIGINT', async () => {
   fsExtra.emptyDir(path.join(__dirname, './data'), (err)=>{throw err});
});
process.on('SIGHUP', async () => {
   fsExtra.emptyDir(path.join(__dirname, './data'), (err)=>{throw err});
   
});

 








