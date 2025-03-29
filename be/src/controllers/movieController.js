import Movie from "../models/Movie.js";

// ✅ Retrieve all movies for the logged-in user
export const getMovies = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

  const movies = await Movie.find({ userId: req.session.userId });
  res.json(movies);
};

// ✅ Add a new movie
export const addMovie = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

  const { title, genre, year, rating, description } = req.body;
  if (!title || !genre || !year || !rating || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newMovie = new Movie({ title, genre, year, rating, description, userId: req.session.userId });
  await newMovie.save();
  res.json(newMovie);
};

// ✅ Update a specific movie
export const updateMovie = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });

  const { title, genre, year, rating, description } = req.body;
  const movie = await Movie.findOneAndUpdate(
    { _id: req.params.id, userId: req.session.userId }, // Ensures users can only update their own movies
    { title, genre, year, rating, description },
    { new: true }
  );

  if (!movie) return res.status(404).json({ message: "Movie not found" });
  res.json(movie);
};

// ✅ Delete a specific movie
export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  if (!id || id.length !== 24) {
    return res.status(400).json({ message: "Invalid Movie ID" });
  }

  try {
    const movie = await Movie.findOneAndDelete({ _id: id, userId: req.session.userId });
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

