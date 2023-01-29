const { v4: uuidv4 } = require('uuid');
const { validationResult } = require("express-validator");

const { hashPassword } = require("../../utils/password.util");
const pool = require("../../utils/db");

exports.signup = async (req, res, next) => {
  // fields validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 422,
      message: "User input error",
      data: errors.mapped(),
    });
  }
  let { username, email, password } = req.body;

  try {
    // check duplicate email
    const [[currentUser]] = await pool.execute(
      "SELECT email FROM users WHERE email = ?",
      [email]
    );

    if (currentUser !== undefined) {
      return next({ status: 400, message: "Email address already exists" });
    }

    // hash password
    password = await hashPassword(password);

    // create new user
    pool.execute("INSERT INTO users (username, email, password, uuid) VALUES (?, ?, ?, ?)", [username, email, password, uuidv4()]);

    return res.status(201).json({ type: "success" });
  } catch (error) {
    next(error);
  }
};
