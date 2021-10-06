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
            <Grid container>
                {movies.map(movie => {
                    return (<Grid item xl={3} lg={3} md={3} sm={6} xs={12}><MovieItem key={movie.id} movie={movie} /></Grid>);
                })}
            </Grid>
        </main>

    );
}

export default MovieList;