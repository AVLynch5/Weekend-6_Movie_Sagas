import { useSelector } from "react-redux";
import { useHistory } from "react-router";

function Details() {
        //array containing movie obj
        const movieToShowArr = useSelector(store => store.movieDeets);
        //movie obj
        const movieToShow = movieToShowArr[0];
        const history = useHistory();

        //handle backToHome
        const handleHome = () => {
            history.push("/");
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