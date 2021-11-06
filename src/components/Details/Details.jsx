import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import './Details.css';
import { Button } from '@material-ui/core';

function Details({}) {
    const history = useHistory();
    const dispatch = useDispatch();
    //useParams - can only be declared in the child component of component using Router
    const {movieid} = useParams();

    useEffect(() => {
        console.log(movieid);
        getMovieDetails();
    }, []);

    //GET details function - uses id from url to GET movie details
    const getMovieDetails = () => {
        dispatch({type: 'FETCH_MOVIE_DETAILS', payload: movieid});
    }

    //function to turn movieToShow.join_agg array -> string
    const arrayToString = () => {
        //to solve page load issue - if movieToShow obj undefined (DOM loaded before reducer available), do nothing. But why movieToShow.title/description alreay available?
        if (movieToShow.json_agg == undefined) {
            return;
        }
        //stringify json.agg array for display
        let genreString = movieToShow.json_agg.join(', ');
        return genreString;
    }

    //object containing movie details.
    const movieToShow = useSelector(store => store.movieDeets);

    //handle backToHome
    const handleHome = () => {
        history.push("/");
        dispatch({type: 'CLEAR_MOVIE_DETAILS'});
    }

    //call instance of arrayToString. Prevents DOM load prior to reducer initializing and strinifies genres.
    const genresToShow = arrayToString();
    return(
        <>
            <h3>Movie Details:</h3>
            {/*<p>{JSON.stringify(movieToShow)}</p>*/}
            <img className="img-details-sizing" src={movieToShow.poster} />
            <p>Movie Title: {movieToShow.title}</p>
            <p>Movie Genres: {genresToShow}</p>
            <div className="descriptionBox">
                <p>Movie Description: {movieToShow.description}</p>
            </div>
            <Button variant="outlined" onClick={handleHome}>Back to List</Button>
        </>
    );
}

export default Details;