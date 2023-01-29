const authRoutes = require("./auth.route");

exports.registerRoutes = (app) => {
  app.use("/auth", authRoutes);
};
