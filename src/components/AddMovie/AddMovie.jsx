import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router";
import {TextField} from '@material-ui/core';
import {Select} from '@material-ui/core';
import {InputLabel} from '@material-ui/core';
import {FormControl} from '@material-ui/core';
//needed to style dropdown
import {makeStyles} from '@material-ui/core';
import {MenuItem} from '@material-ui/core';
//import css
import './AddMovie.css';

//function to use makeStyles and access theme styling
const useStyles = makeStyles(theme => ({
    FormControl: {
        width: 150,
        marginTop: '8px'
    },
    TextfieldControl: {
        margin: '8px'
    }
}))
 
function AddMovie() {
    //to apply styles
    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();
    const genreList = useSelector(store => store.genres);

    const [newMovie, setNewMovie] = useState({title: '', poster: '', description: '', genres: []});

    //on page load, call getGenres to populate genresReducer
    useEffect(() => {
        console.log('in useEffect');
        getGenres();
    }, []);

    //function dispatches action to trigger getGenreList
    function getGenres() {
        dispatch({type: 'GET_GENRES'});
    }

    //function handleBack - clear inputs and return user to home
    const handleBack = () => {
        //setNewMovie({title: '', poster: '', description: '', genres: []});
        history.push("/");
    }

    //function checkGenreArray
    const checkGenreArray = (event) => {
        //const idToCheck = event.target.value;
        //alert(idToCheck);//Check idToCheck
        //replace newMovie genres array w/ new array of genre ids
        setNewMovie({...newMovie, genres: typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value});
    }

    //function addNewMovie - dispatch to call POST, clear inputs, return user to home
    const addNewMovie = (event) => {
        //prevent default form behavior
        event.preventDefault();
        //validation - user must select at least one genre
        if (newMovie.genres.length != 0) {
            dispatch({type: 'ADD_NEW_MOVIE', payload: newMovie});
            //setNewMovie({title: '', poster: '', description: '', genres: []});
            history.push("/");
        } else {
            alert('Please select at least one genre');
            return;
        }
    }

    return(
        <>
            {/*JSON.stringify(genreList)*/}
            {/*<br/>*/}
            {/* JSON.stringify(newMovie) */}
            <h3>Add a new movie:</h3>
            <form className="form-box" onSubmit={addNewMovie}>
                <TextField className={classes.TextfieldControl} required label="Movie Title" type="text" value={newMovie.title} onChange={(event) => setNewMovie({...newMovie, title: event.target.value})} variant="outlined"/>
                <TextField className={classes.TextfieldControl} required label="Poster URL" type="text" value={newMovie.poster} onChange={(event) => setNewMovie({...newMovie, poster: event.target.value})} variant="outlined"/>
                <br/>
                <TextField className={classes.TextfieldControl} multiline rows={5} rowsMax={12} required label="Movie Description" type="text" value={newMovie.description} onChange={(event) => setNewMovie({...newMovie, description: event.target.value})} variant="outlined"/>
                <br/>
                <FormControl className={classes.FormControl} variant="outlined">
                    <InputLabel id="genre-dropdown-label">Genres</InputLabel>
                    <Select 
                        labelId="genre-dropdown-label" 
                        id="genre-dropdown" 
                        required 
                        multiple 
                        value={newMovie.genres} 
                        name="genresDropdown" 
                        label="Select Genres" 
                        onChange={(event) => checkGenreArray(event)} 
                        MenuProps={{
                            anchorOrigin: {
                                vertical: "bottom",
                                horizontal: "left"
                            },
                            transformOrigin: {
                                vertical: "top",
                                horizontal: "left"
                            },
                            getContentAnchorEl: null,
                            PaperProps: {
                                style: {
                                    maxHeight: 150,
                                }
                            }
                    }}>
                        {genreList.map((genre) => {
                            return(<MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                                </MenuItem>);
                        })}
                    </Select>
                </FormControl>
                <br/>
                <button onClick={handleBack}>Back</button>
                <button type="submit">Save</button>
            </form>
        </>
    );
}

export default AddMovie;