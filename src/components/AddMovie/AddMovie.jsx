import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router";

function AddMovie() {
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
            {JSON.stringify(genreList)}
            <br/>
            {JSON.stringify(newMovie)}
            <h3>Add a new movie:</h3>
            <form onSubmit={addNewMovie}>
                <input required placeholder="Movie Title" type="text" value={newMovie.title} onChange={(event) => setNewMovie({...newMovie, title: event.target.value})} />
                <input required placeholder="Poster URL" type="text" value={newMovie.poster} onChange={(event) => setNewMovie({...newMovie, poster: event.target.value})} />
                <input required placeholder="Movie Description" type="text" value={newMovie.description} onChange={(event) => setNewMovie({...newMovie, description: event.target.value})}/>
                <select required name="genresDropdown" label="Select Genres" onChange={(event) => setNewMovie({...newMovie, genres: [...newMovie.genres, event.target.value]})}>
                    {genreList.map((genre) => {
                        return(<option key={genre.id} value={genre.id}>{genre.name}</option>);
                    })}
                </select>
                <button onClick={handleBack}>Back</button>
                <button type="submit">Save</button>
            </form>
        </>
    );
}

export default AddMovie;