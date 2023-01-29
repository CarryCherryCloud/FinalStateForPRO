const pool = require("../../utils/db");

exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("ccc_pid", { path: '/' })
    req.session.destroy();

    return res.status(200).json({
      type: "success",
      message: "You have logout successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
