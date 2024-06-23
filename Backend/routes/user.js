const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userController");
const jwt = require('jsonwebtoken');
const validCheck = require("../middleware/validCheck");
const authenticate = require("../middleware/auth");

router.get("/isLogin", authenticate, (req, res) => {
  try {
    // Assuming req.user contains the logged-in user's information including role
    const { role } = req.user;
    res.status(200).json({ role }); // Send the role back in the response
  } catch (error) {
    console.error('Error checking login status:', error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post(`/register`, validCheck, userControllers.register);
router.post(`/login`, userControllers.login);
router.post(`/create`, userControllers.create);
router.get(`/logout`, userControllers.logout);

module.exports = router;
