import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root123',
  database: 'moviesdb',
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  // Get all movies
  static async getAll({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // Get genre ids
      const [genres] = await connection.query(
        'SELECT id, name FROM genre WHERE LOWER(name) = ?;',
        [lowerCaseGenre]
      )

      if (genre.length === 0) return []

      // Get id from the first genre result
      const [{ id }] = genres

      // Get all movies ids from db table
      // need the query to movie_genres
      // use join
      // return results
      const [movies] = await connection.query(
        'SELECT M.title, M.year, M.director, M.duration, M.poster, M.rate, BIN_TO_UUID(M.id) AS id ' +
          'FROM movie AS M ' +
          'INNER JOIN movie_genres AS MG ON M.id = MG.movie_id ' +
          'WHERE MG.genre_id = ?;',
        [id]
      )
      return movies
    }

    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;'
    )

    return movies
  }

  // Get movie by ID
  static async getById({ id }) {
    const [movies] = await connection.query(
      'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (movies.length === 0) return null

    return movies[0]
  }

  // Create movie
  static async create({ input }) {
    const {
      genre: genreInput,
      title,
      year,
      duration,
      director,
      rate,
      poster,
    } = input

    // pending to create the connection with genre
    // -------------------------------------------

    // Insert
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        `INSERT INTO movie (id, title, year, director, duration, poster, rate) 
              VALUES (UUID_TO_BIN(?),?, ?, ?, ?, ?, ?)`,
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (err) {
      throw new Error('Could not create movie')
      // and send that to an internal service eg sendLog(err)
    }

    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate,
     BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);`,
      [uuid]
    )
    return movies[0]
  }

  static async delete({ id }) {
    try {
      await connection.query('DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [
        id,
      ])
    } catch (err) {
      throw new Error('Could not delete movie')
    }
  }

  static async update({ id, input }) {
    // pending work
    const { title, year, duration, director, rate, poster } = input

    try {
      await connection.query(
        `UPDATE movie 
           SET title = ?, year = ?, duration = ?, director = ?, rate = ?, poster = ? 
           WHERE id = UUID_TO_BIN(?);`,
        [title, year, duration, director, rate, poster, id]
      )

      const [movies] = await connection.query(
        `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id 
           FROM movie 
           WHERE id = UUID_TO_BIN(?);`,
        [id]
      )

      return movies[0]
    } catch (err) {
      console.error('Error updating movie:', err)
      throw new Error('Could not update movie')
    }
  }
}
