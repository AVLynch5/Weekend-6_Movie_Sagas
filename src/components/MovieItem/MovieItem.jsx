import { useHistory } from "react-router";

function MovieItem({movie}){
    const history = useHistory();

    //function goToDetails - called on image click. Takes movieID as input param. Calls dispatch and sends movieID as payload.
    const goToDetails = (movieID) => {
        //dispatch({type: 'FETCH_MOVIE_DETAILS', payload: movieID});//no longer needed due to params id
        //console.log('The movieID is', movieID);//test
        //route user to details/:id page where id dynamically acquired using params
        history.push(`/details/${movieID}`);
    }
    return(
        <>
            <div key={movie.id} >
                <h3>{movie.title}</h3>
                <img src={movie.poster} alt={movie.title} onClick={() => goToDetails(movie.id)}/>
            </div>
        </>
    );
}

export default MovieItem;