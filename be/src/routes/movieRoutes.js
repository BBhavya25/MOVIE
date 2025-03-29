import express from "express";
import { getMovies, addMovie, deleteMovie,updateMovie } from "../controllers/movieController.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", addMovie);
router.delete("/:id", deleteMovie);
router.put("/:id", updateMovie);


export default router;
