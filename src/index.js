import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_GENRES', fetchAllGenres);
    yield takeEvery('ADD_NEW_MOVIE', postNewMovie);
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch(error) {
        console.log('get all movies error', error);
    }   
}

function* fetchAllGenres() {
    //get all genres from the DB
    try {
        const genres = yield axios.get('/api/genre');
        console.log('GET all genres:', genres.data);
        //put action to populate genres reducer
        yield put({type: 'SET_GENRES', payload: genres.data});
    } catch(error) {
        console.log('Error GETting genres', error);
    }
}

function* postNewMovie(action) {
    //POST new movie object to the DB
    try {
        //newMovie is the object from AddMovie.jsx
        const newMovie = action.payload;
        yield axios.post('/api/movie', newMovie);
        //dispatch action to call GET function
        yield put({type: 'FETCH_MOVIES'});
    } catch(error) {
        console.log('POST new movie error', error);
    } 
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
