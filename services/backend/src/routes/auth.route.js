const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const checkAuth = require("../middlewares/auth.middleware");

const {
  login,
  logout,
  signup,
  fetchCurrentUser,
} = require("../controllers/auth");

const loginValidation = [
  body("email").not().isEmpty().withMessage("Email must be required"),
  body("password").not().isEmpty().withMessage("Password must be required"),
];

const signupValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address must be required")
    .isEmail()
    .withMessage("Incorrect email address"),
  body("password").not().isEmpty().withMessage("Password must be required"),
  body("username").not().isEmpty().withMessage("Username must be required"),
];

router.get("/me", checkAuth, fetchCurrentUser);
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.patch("/logout", checkAuth, logout);

module.exports = router;
