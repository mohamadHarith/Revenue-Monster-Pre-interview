const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path')
const {API_KEY} = require('../API_KEY');


/**
 * fetches raw data from the API
 */
const fetchRawData = async()=>{
    try {
        //fetch movie data
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019`
        )
        .then((res)=>{
            if(res.status==200){
                res.json().then((data)=>{
                    parseData(data);
                })
            }
            else{
                throw new Error('Something went wrong');
            }
        })
    } catch (error) {
        throw new Error(error.message);
    }
}

/**
 * 
 *parses the raw data into a format that we want and saves images
 */
const parseData = async(rawData)=>{
    
 try {

       //remove unnecessary data
       delete(rawData.page);
       delete(rawData.total_results);
       delete(rawData.total_pages);
   
       rawData.results.forEach((item, index)=>{
   
           delete(item.popularity);
           delete(item.vote_count);
           delete(item.video);
           delete(item.adult);
           delete(item.backdrop_path);
           delete(item.original_title);
           delete(item.genre_ids);
           delete(item.original_language);
           item.imageFileName =  item.poster_path.split('/')[1];
           item.originalLink = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
           let posterPath = item.poster_path;
           delete(item.poster_path);
           
           //fetch images
           fetch(`https://image.tmdb.org/t/p/w500${posterPath}`).then((res)=>{
               if(res.status == 200){
                   res.buffer().then((data)=>{
                       //  store image 
                       fs.mkdirSync(path.join(__dirname, '../data/movieImages'),{recursive:true});
                       
                       fs.writeFile(path.join(__dirname,`../data/movieImages${posterPath}`), data, (err)=>{
                           if(err){throw err}
                       }); 
                   })
               }
               else{
                   throw new Error('Something went wrong');
               }
           }).catch((error)=>{
               console.log(error.message);            
           });
       });
   
       //store parsed data
       fs.mkdirSync(path.join(__dirname, '../data'),{recursive:true})
   
       fs.writeFile(path.join(__dirname,'../data/movieData.json'), JSON.stringify(rawData.results), (err)=>{
           if(err){throw err}
       }); 
     
 }catch(error){
    throw new Error(error.message);
 }

}

const getMovieData = async()=>{
    try{
        const data = JSON.parse(await fs.readFileSync(path.join(__dirname, '../', './data/movieData.json')));
        return data;
        
    }catch(error){
        throw new Error(error.message);
    }
}

const searchMovie = async(queryString)=>{
    try{
        const data = await getMovieData();
        let matchedData = [];
        for(var i=0; i<data.length; i++){
            if(data[i].title.toLowerCase().replace(/ /g, "").includes(queryString.toLowerCase().replace(/ /g, ""))){
                matchedData.push(data[i]);
            }
            else if(data[i].overview.toLowerCase().replace(/ /g, "").includes(queryString.toLowerCase().replace(/ /g, ""))){
                matchedData.push(data[i]);
            }
            else if(data[i].imageFileName.toLowerCase().replace(/ /g, "").includes(queryString.toLowerCase().replace(/ /g, ""))){
                matchedData.push(data[i]);
            }
            else if(data[i].originalLink.toLowerCase().replace(/ /g, "").includes(queryString.toLowerCase().replace(/ /g, ""))){
                matchedData.push(data[i]);
            }
        }
        //console.log(matchedData);
        return matchedData;      
    }catch(error){
        throw new Error(error.message);
    }
}

module.exports={fetchRawData, getMovieData, searchMovie}

//searchItem('complex family ties that bind them as they are pulled');




