const { object, string } = require('zod');
const User = require("../models/User");

const userSchema = object({
    firstName: string().min(1).max(50), 
    lastName: string().min(1).max(50), 
    email: string().email(), 
    password: string().min(6), 
});

const validCheck = async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const userData = {
        firstName,
        lastName,
        email,
        password,
    };

    try {
        // Validate user input
        userSchema.parse(userData);
        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).send("Email already exists");
        }
        // If everything is valid, proceed to the next middleware/route
        next();
    } catch (error) {
        // If validation fails, send a 400 Bad Request response with validation errors
        res.status(400).json({ message: "Validation error", error });
    }
};

module.exports = validCheck;
