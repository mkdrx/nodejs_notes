const express = require('express')
// To create IDs
const crypto = require('node:crypto')
const movies = require('./movies.json')

const app = express()
app.use(express.json())

app.disable('x-powered-by')

// Get all movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// Get a movie | path-to-regexp
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const { title, genre, year, director, duration, rate, poster } = req.body

  const newMovie = {
    id: crypto.randomUUID(),
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster,
  }

  // This would not be REST since we are saving the state into memory
  movies.push(newMovie)

  res.status(201).json(newMovie) // updates client's cache
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`)
})