// Crear peliculas
createFilms()
  .then(spanishMovies => {
    if (spanishMovies.length == 100)
      recursiveFunction(spanishMovies)
  })
  .catch(error => console.log(error))