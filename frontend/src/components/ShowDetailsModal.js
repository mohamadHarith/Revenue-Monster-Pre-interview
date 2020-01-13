import React from 'react';
import Modal from 'react-bootstrap/Modal';
import {url} from '../server'


class ShowDetailsModal extends React.Component{
    constructor(props){
        super(props);
        this.state={
            show:this.props.show,
            movieData: this.props.data
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.setState({show: this.props.show, movieData: this.props.data});
        }
    }

    handleClose=()=>{
        this.props.onHide();
        this.setState({show:false})
    }
    render(){
        return(
            <Modal show={this.state.show} onHide={this.handleClose} size='lg' scrollable={true}>
                <Modal.Header closeButton>
                <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>ID:</b>{` ${this.state.movieData.id}`}</p>
                    <p><b>Title:</b>{` ${this.state.movieData.title}`}</p>
                    <p><b>Average Vote:</b>{` ${this.state.movieData.vote_average}`}</p>
                    <p><b>Release date:</b>{` ${this.state.movieData.release_date}`}</p>
                    <p><b>Description:</b>{` ${this.state.movieData.overview}`}</p>
                    <p><b>Image file name:</b>{` ${this.state.movieData.imageFileName}`}</p>
                    <p><b>Original image link:</b><a href={this.state.movieData.originalLink}>{` ${this.state.movieData.originalLink}`}</a></p>
                    <p><b>Local image link:</b><a href={`${url}/revenuMonsterPreinterviewTest/movieImage/${this.state.movieData.imageFileName}`}>{` ${url}/revenuMonsterPreinterviewTest/movieImage/${this.state.movieData.imageFileName}`}</a></p>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ShowDetailsModal;