import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ChangePassword from "./components/ChangePassword";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [auth, setAuth] = useState("login");
  const [user, setUser] = useState(false);

  if (user) return <MovieList setUser={setUser} />;
  if (auth === "signup") return <Signup setAuth={setAuth} />;
  if (auth === "changePassword") return <ChangePassword setAuth={setAuth} />;
  return <Login setAuth={setAuth} setUser={setUser} />;
}

export default App;
