import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AddMovie() {
    const dispatch = useDispatch();

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
        </>
    );
}

export default AddMovie;