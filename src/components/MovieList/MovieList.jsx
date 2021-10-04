import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import './MovieList.css'

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    //function goToDetails - called on image click. Takes movieID as input param. Calls dispatch and sends movieID as payload.
    const goToDetails = (movieID) => {
        //dispatch({type: 'FETCH_MOVIE_DETAILS', payload: movieID});
        //console.log('The movieID is', movieID);//test
        //route user to details/:id page where id dynamically acquired using params
        history.push(`/details/${movieID}`);
    }

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => goToDetails(movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;