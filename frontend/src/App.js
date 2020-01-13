import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ShowDetailsModal from './components/ShowDetailsModal';
import Loader from 'react-loader-spinner'
import {url} from './server';

const WAIT_INTERVAL = 1000;
const ENTER_KEY = 13;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      movieData: [],
      isDataLoaded: false,
      showDetailsModal: false,
      selectedMovie:{},
      queryString:''
    }
  }

  timer = null;

  componentDidMount(){
    this.fetchMovieData();
  }

  fetchMovieData = ()=>{
    fetch(`${url}/revenuMonsterPreinterviewTest/movieData`).then((res)=>{
      if(res.status==200){
        res.json().then((data)=>{
          this.setState({movieData:data, isDataLoaded:true},()=>{console.log(this.state);
          })
        });
      }else{
        throw new Error('Error in fetching movie data');
      }
    }).catch((error)=>{
      this.setState({isDataLoaded:true});
      alert(error.message);
    })
  }

  handleShowDetailsModal=(dataIndex)=>{
    this.setState({showDetailsModal:true, selectedMovie:this.state.movieData[dataIndex]});
  }

  handleHideDetailsModal=()=>{
    this.setState({showDetailsModal:false})
  }

  handleChange=(e)=>{
    this.setState({isDataLoaded:false});
    const queryString = e.target.value;
    clearTimeout(this.timer);
    this.setState({queryString: queryString});
    this.timer = setTimeout(this.searchMovie, WAIT_INTERVAL);
  }

  handleKeyDown = (e) => {
    this.setState({isDataLoaded:false});
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.searchMovie();
    }
  }

  searchMovie=()=>{
    //console.log(this.state.queryString);
    if(this.state.queryString !== ''){
      fetch(`${url}/revenuMonsterPreinterviewTest/searchMovie`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          queryString: this.state.queryString
        })
      }).then((res)=>{
        if(res.status == 200){
          res.json().then((data)=>{
            this.setState({movieData:data, isDataLoaded:true});
          })
        }
        else{
          throw new Error('Something went wrong');
        }
      })
      .catch((error)=>{
        this.setState({isDataLoaded:true});
        alert(error.message);
      })
    }else{
      this.fetchMovieData();
    }
    
  }

  render(){
    return(
      <div style={styles.superContainer}>
          <Navbar bg='dark' variant='dark'>
            <Navbar.Brand>Revenue Monster Pre-interview Test</Navbar.Brand>
          </Navbar>
          <div style={styles.mainContainer}>
              <div style={styles.searchBar}>
                <Form.Control type='text' placeholder='Search from top 20 movies of 2019 by title, description, image file name, or the original link of the image' 
                onChange={(e)=>{this.handleChange(e)}}  onKeyDown={(e)=>{this.handleKeyDown(e)}}/>
              </div>
              {this.state.isDataLoaded ? (
                    <div style={styles.movieList}>
                    {
                      this.state.movieData.length>0 ? (
                        <div style={styles.movieList}>
                          {
                            this.state.movieData.map((item, index)=>{
                              return(
                                <Card style={{width:400, margin:10}}>
                                    <div style={styles.cardImage}>
                                      <img style={{objectFit:'cover', width:'100%', height:'100%', objectPosition:'center' }} 
                                        src={`${url}/revenuMonsterPreinterviewTest/movieImage/${item.imageFileName}`}>  
                                      </img>
                                    </div>
                                  <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>{item.overview}</Card.Text>
                                  </Card.Body>
                                  <Card.Footer>
                                      <Button variant='primary' onClick={()=>{this.handleShowDetailsModal(index)}}>Details</Button>
                                  </Card.Footer>
                                </Card>
                              );
                            })
                          }
                        </div>
                      ):(
                        <p>No data returned.</p>
                      )
                    }
                    <ShowDetailsModal show={this.state.showDetailsModal} data={this.state.selectedMovie} onHide={this.handleHideDetailsModal}/>
                </div>
              ):(
                <Loader type="Oval" color="black" height="30"	width="30"/> 
              )}
          </div>
      </div>
    )
  }
}

const styles = {
  superContainer:{
    width: '100%',
    height: '100%',
    overflow:'hidden'
  },

  mainContainer:{
    width:'90%',
    height:'100%',
    padding:20,
    overflow:'hidden',
    margin:'auto',
    display:'flex',
    flexDirection:'column',
    alignItems:'center'
  },
  searchBar:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    marginBottom:10,
    marginTop:10,
  },
  movieList:{
    width:'100%',
    height:'100%',
    overflow:'scroll',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    flexWrap:'wrap',
  },
  cardImage:{
    width:400,
    height:600,
    overflow:'hidden',
  }
}

export default App;
