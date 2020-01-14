# **Revenue Monster Pre-interview Test**

**Demo:**

![Demo](https://s5.gifyu.com/images/ezgif.com-video-to-gif096b8fabd21e6729.gif)

**Overview**

This project is part of a pre-interview test for an internship that I am seeking. This test is based on the requirements from [here](https://revenuemonster.github.io/). I have mostly fulfilled the requirements and this is the outcome of the work. This project contains two parts: the frontend and the backend. The backend fetches data and images of top the 20 movies of 2019 from The Movie DB API and caches it to the local server. The frontend requests and displays these data. The frontend can also query multiple section of the data which includes the movie name, image name, description and original link of the image. The backend handles these queries by doing a simple string match with local cache data. 

**Setup**
```
Terminal 1:
cd backend
npm install
npm start

Terminal 2:
cd frontend
Set port number in ./src/server.js if necessary
npm install
npm start
```

**Technologies**

 - React
 - React Bootstrap
 - Node.js / Express.js

**Functionalities**

For each of the functionalities below I have put the hyperlink to the code snippet.
 
 Frontend
 
 - [Fetches movie data](https://github.com/mohamadHarith/Revenue-Monster-Pre-interview/blob/63cb95ba658e70db0f66672760a837d3dd834ebf/frontend/src/App.js#L31-L45) from backend 
 - [Displays the movie data.](https://github.com/mohamadHarith/Revenue-Monster-Pre-interview/blob/63cb95ba658e70db0f66672760a837d3dd834ebf/frontend/src/App.js#L111-L145) 
 - [Queries data to backend.](https://github.com/mohamadHarith/Revenue-Monster-Pre-interview/blob/63cb95ba658e70db0f66672760a837d3dd834ebf/frontend/src/App.js#L71-L98)
 
 Backend
 
 - [Fetches movie data](https://github.com/mohamadHarith/Revenue-Monster-Pre-interview/blob/63cb95ba658e70db0f66672760a837d3dd834ebf/backend/services/movieDataService.js#L7-L28) from The Movie DB API.
 - [Parses the data from the API and caches the data and images](https://github.com/mohamadHarith/Revenue-Monster-Pre-interview/blob/63cb95ba658e70db0f66672760a837d3dd834ebf/backend/services/movieDataService.js#L30-L89) to the local server.
 - [Handle client query.](https://github.com/mohamadHarith/Revenue-Monster-Pre-interview/blob/63cb95ba658e70db0f66672760a837d3dd834ebf/backend/services/movieDataService.js#L101-L124)
 - [Deletes the cached data on termination.](https://github.com/mohamadHarith/Revenue-Monster-Pre-interview/blob/63cb95ba658e70db0f66672760a837d3dd834ebf/backend/App.js#L30-L38)
 
 **API Endpoints**
 
 ***Root endpoint***
 
 ```http://localhost:PORT//revenuMonsterPreinterviewTest```
 
 ***Sub endpoints***
 
```
/movieData
 - Method: GET
 - Request body: none
 - Query paramaters: none
 - Route parameters: none
```
```
/movieImage
 - Method: GET
 - Request body: none
 - Query paramaters: none
 - Route parameters: fileName
```
```
/searchMovie
 - Method: POST
 - Request body: queryString
 - Query paramaters: none
 - Route parameters: none
```
