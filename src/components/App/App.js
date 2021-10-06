import {HashRouter as Router, Route, Switch, Link} from 'react-router-dom';
import './App.css';
import MovieList from '../MovieList/MovieList'
import AddMovie from '../AddMovie/AddMovie';
import Details from '../Details/Details';
import { Container } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Header from '../Header/Header';

function App() {
  return (
    <Container className="App" >
      <Paper elevation={8}>
        <Header />
        <Router>       
          <Route path="/" exact>
            <Link to="/addmovie">Add a Movie</Link> 
            <MovieList />
          </Route>
          {/* Details page */}
          <Route path="/details/:movieid">
            <Details />
          </Route>
          {/* Add Movie page */}
          <Route path="/addmovie">
            <AddMovie />
          </Route>
        </Router>
      </Paper>
    </Container>
  );
}


export default App;
