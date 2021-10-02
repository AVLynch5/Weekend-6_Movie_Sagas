import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState } from "react";

function AddMovie() {
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

    return(
        <>
            {JSON.stringify(genreList)}
            <br/>
            {JSON.stringify(newMovie)}
            <h3>Add a new movie:</h3>
            <form>
                <input required placeholder="Movie Title" type="text" value={newMovie.title} onChange={(event) => setNewMovie({...newMovie, title: event.target.value})} />
                <input required placeholder="Poster URL" type="text" value={newMovie.poster} onChange={(event) => setNewMovie({...newMovie, poster: event.target.value})} />
                <input required placeholder="Movie Description" type="text" value={newMovie.description} onChange={(event) => setNewMovie({...newMovie, description: event.target.value})}/>
                <select required name="genresDropdown" label="Select Genres">
                    {genreList.map((genre) => {
                        return(<option key={genre.id} value={genre.id} onClick={(event) => setNewMovie({...newMovie, genres: [...newMovie.genres, event.target.value]})}>{genre.name}</option>);
                    })}
                </select>
            </form>
        </>
    );
}

export default AddMovie;