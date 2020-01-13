const {movieDataService} = require('../services')
const path = require('path');

const getMovieData = async(req, res)=>{
    try{
        const data = await movieDataService.getMovieData();
        if(data.length>0){
            res.json(data);
        }
        else{
            throw new Error('Could not get movie data')
        }
    }catch(error){
        console.log(error.message);
        res.status(500).json(error.message);
        
    }
}

const getMovieImage = async(req, res)=>{
    try {
        const {fileName} = req.params;
        res.sendFile(path.join(__dirname, '../', `./data/movieImages/${fileName}`));
    } catch(error){
        console.log(error.message);
        res.status(500).json(error.message);
    }
}

const searchMovie = async(req, res)=>{
    try{
        const {queryString} = req.body;
        const result = await movieDataService.searchMovie(queryString);
        res.json(result);
    }catch(error){
        console.log(error.message);
        res.status(500).json(error.message);
    }
}


module.exports = {getMovieData, getMovieImage, searchMovie}