
module.exports = function(app) {
    const { response } = require("../app");
    const { MovieDb } = require("moviedb-promise")
    const moviedb = new MovieDb("f492b9f59b213027546260a9bfb005d3")
    

    app.get('/', (req, res) => {
        moviedb.movieNowPlaying().then(response => {
            console.log(response)
            res.render('movies-index', { movies: response.results });
        }).catch(console.error)
    })

    app.get("/movies/:id", (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
            console.log(movie)
            res.render("movies-show", { movie: movie })
        }).catch(console.error)
    })

    app.get('/movies/:id', (req, res) => {
        moviedb.movieInfo({ id: req.params.id }).then(movie => {
          moviedb.movieTrailers({ id: req.params.id }).then(videos => {
            movie.trailer_youtube_id = videos.youtube[0].source;
            console.log('VIDEOS.TRAILER_YOUTUBE_ID', movie.trailer_youtube_id);
      
            res.render('movies-show', { movie: movie });
          }).catch(console.error);
        }).catch(console.error);
      });
  
  }