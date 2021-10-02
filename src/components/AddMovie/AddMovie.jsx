import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function AddMovie() {
    const dispatch = useDispatch();
    const genreList = useSelector(store => store.genres);

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
        </>
    );
}

export default AddMovie;