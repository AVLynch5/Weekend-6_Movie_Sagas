import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieItem from '../MovieItem/MovieItem';
import { Box, Grid } from '@material-ui/core';

function MovieList() {
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    return (
        <main>
            <Box>
                <h2>Here's what's Showing:</h2>
            </Box>
            <Grid
                className="movies"
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
            >
                {movies.map(movie => {
                    return (<MovieItem key={movie.id} movie={movie} />);
                })}
            </Grid>
        </main>

    );
}

export default MovieList;