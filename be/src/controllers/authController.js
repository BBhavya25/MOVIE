import User from "../models/User.js";

export const signup = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password)
    return res.status(400).json({ message: "All fields are required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already in use" });

  const user = new User({ email, username, password });
  await user.save();
  res.json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email, password });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  req.session.userId = user._id;
  res.json({ message: "Login successful" });
};

export const logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logout successful" });
  });
};

export const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) return res.status(400).json({ message: "All fields are required" });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  user.password = newPassword;
  await user.save();
  res.json({ message: "Password updated successfully" });
};
