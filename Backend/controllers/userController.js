const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Problems = require('../models/Problem');

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if any required fields are missing
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Validate password format
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ 
        message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      });
    }

    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with the same email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    user.token = token;
    user.password = undefined;

    res.status(200).json({ message: 'You have successfully registered!', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide both email and password" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please provide a valid email address" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    // Set token in cookie
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      message: "You have successfully logged in!",
      success: true,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const create = async (req, res) => {
  const creater = req.user._id;

  const { name, statement, SampleInput, SampleOutput, testCases } = req.body;

  try {
      const newProblem = await Problem.create({
          name: name,
          statement: statement,
          SampleInput: SampleInput,
          SampleOutput: SampleOutput,
          testCase: testCases,
          createdBy: creater,
      });

      res.status(201).json(newProblem); // Send back the created problem if needed
  } catch (error) {
      console.error('Error creating problem:', error);
      res.status(500).send('Error creating problem');
  }
};


const logout = (req, res) => {
  // Clear the cookie
  res.clearCookie('token');
  // Respond with a success message
  res.json({ message: 'Logout successful' });
};

module.exports = { register, login, create, logout };
