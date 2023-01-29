const { validationResult } = require("express-validator");

const pool = require("../../utils/db");
const { checkPassword } = require("../../utils/password.util");

exports.login = async (req, res, next) => {
  // return api fields validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next({
      status: 422,
      message: "User input error",
      data: errors.mapped(),
    });
  }

  const { email, password } = req.body;

  try {
    const [[currentUser]] = await pool.execute(
      "SELECT uuid, username, email, password FROM users WHERE email = ?",
      [email]
    );

    // verify email
    if (currentUser === undefined) {
      return next({ status: 400, message: "Incorrect email address" });
    }
    delete currentUser.email;

    // verify password
    const matchPassword = await checkPassword(password, currentUser.password);
    if (!matchPassword) {
      return next({ status: 400, message: "Incorrect password" });
    }
    delete currentUser.password;

    req.session.user = {
      uuid: currentUser.uuid,
      username: currentUser.username,
    }

    res.status(200).json({
      type: "success",
      message: "You have loggedin successfully",
      data: {
        uuid: currentUser.uuid,
        username: currentUser.username,
      },
    });
  } catch (error) {
    next(error);
  }
};
