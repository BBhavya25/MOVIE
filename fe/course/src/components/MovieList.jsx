import { useEffect, useState } from "react";
import axios from "axios";

const MovieList = ({ setUser }) => {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: "", genre: "", year: "", rating: "", description: "" });
  const [editingMovie, setEditingMovie] = useState(null);

  // Fetch Movies
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies", { withCredentials: true })
      .then((res) => setMovies(res.data))
      .catch(() => alert("Error fetching movies"));
  }, []);

  // Handle Input Change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add Movie
  const addMovie = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/movies", form, { withCredentials: true });
      setMovies([...movies, res.data]); // Append new movie
      setForm({ title: "", genre: "", year: "", rating: "", description: "" }); // Reset form
    } catch {
      alert("Failed to add movie");
    }
  };

  // Edit Movie
  const editMovie = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/movies/${id}`, form, { withCredentials: true });
      setMovies(movies.map((movie) => (movie._id === id ? res.data : movie))); // Update UI
      setEditingMovie(null);
      setForm({ title: "", genre: "", year: "", rating: "", description: "" }); // Reset form
    } catch {
      alert("Failed to update movie");
    }
  };

  // Delete Movie
  const deleteMovie = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, { withCredentials: true });
      setMovies(movies.filter((movie) => movie._id !== id)); // Remove from UI
    } catch {
      alert("Failed to delete movie");
    }
  };

  // Logout
  const logout = async () => {
    await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
    setUser(false);
  };

  return (
    <div className="movie-container">
      <h2>Your Movies</h2>

      {/* Add/Edit Movie Form */}
      <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} />
      <input type="text" name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
      <input type="number" name="year" placeholder="Year" value={form.year} onChange={handleChange} />
      <input type="number" name="rating" placeholder="Rating" value={form.rating} onChange={handleChange} />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      
      {editingMovie ? (
        <button onClick={() => editMovie(editingMovie)}>Save Changes</button>
      ) : (
        <button onClick={addMovie}>Add Movie</button>
      )}

      {/* Movie List */}
      <ul>
        {movies.map((movie) => (
          <li key={movie._id}>
            <strong>{movie.title}</strong> - {movie.genre} ({movie.year}) - ⭐ {movie.rating}
            <p>{movie.description}</p>
            <button onClick={() => { setEditingMovie(movie._id); setForm(movie); }}>Edit</button>
            <button onClick={() => deleteMovie(movie._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MovieList;
