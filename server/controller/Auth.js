import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Auth from "../model/Auth.js"; // Sequelize model

dotenv.config();

// User Register
export const UserRegister = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if the email is already in use
    const existingUser = await Auth.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create a new user
    const user = await Auth.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: "7 years" });

    return res.status(201).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during registration", error: error.message });
  }
};

// User Login
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Auth.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT, { expiresIn: "9999 years" });

    return res.status(200).json({ token, user });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred during login", error: error.message });
  }
};
