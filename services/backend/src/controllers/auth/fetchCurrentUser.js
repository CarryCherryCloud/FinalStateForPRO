const { db } = require("../../utils/db");

exports.fetchCurrentUser = async (req, res, next) => {
  return res.status(200).json({
    type: "success",
    message: "Fetch current user",
    data: {
      uuid: req.session.user.uuid,
      username: req.session.user.username,
    },
  });
};