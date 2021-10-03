const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
    //need to post each genre id in newMovie.genres array - for loop
    for (let genreID of req.body.genres) {
      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, genreID]).then(result => {
        //Now that both are done, send back success!
        res.sendStatus(201);
      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })
    }

// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

router.get('/:id', (req, res) => {
  //get movieID from url
  const movieID = req.params.id;
  const queryText = 
    `SELECT * FROM
    (SELECT "movies"."id", "movies"."title", "movies"."poster", "movies"."description", json_agg("genres"."name")
    FROM "movies"
    INNER JOIN "movies_genres" 
    ON "movies"."id" = "movies_genres"."movie_id"
    INNER JOIN "genres"
    ON "genres"."id" = "movies_genres"."genre_id"
    GROUP BY "movies"."id", "movies"."title", "movies"."poster", "movies"."description") AS "displayTable"
    WHERE "id" = $1;`;
  pool.query(queryText, [movieID])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('ERROR: Get movie details', error);
      res.sendStatus(500)
    })
});

module.exports = router;