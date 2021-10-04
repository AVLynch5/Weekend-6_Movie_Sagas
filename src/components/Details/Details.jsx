import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {useParams} from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

    //array containing movie obj
    const movieToShowArr = useSelector(store => store.movieDeets);
    //movie obj
    const movieToShow = movieToShowArr[0];

    //handle backToHome
    const handleHome = () => {
        history.push("/");
        dispatch({type: 'CLEAR_MOVIE_DETAILS'});
    }

    return(
        <>
            <h3>Movie Details:</h3>
            {/*<p>{JSON.stringify(movieToShow)}</p>*/}
            <img src={movieToShow.poster} />
            <p>Movie Title: {movieToShow.title}</p>
            <p>Movie Genres: {movieToShow.json_agg.join(', ')}</p>
            <div className="descriptionBox">
                <p>Movie Description: {movieToShow.description}</p>
            </div>
            <button onClick={handleHome}>Back to List</button>
        </>
    );
}

export default Details;