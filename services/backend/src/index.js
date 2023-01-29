const { createServer } = require('https')
const fs = require('fs');

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const { registerRoutes } = require("./routes");
const { createSocketIOInstance } = require("./socket");
const { globalErrorHandler, notFoundErrorHandler } = require("./middlewares/error.middleware");
const { sessionConfig, corsConfig } = require("./middlewares/session.middleware");

const { NODE_ENV, PORT, ENGINE_URL } = require("./config/env.config");

axios.defaults.baseURL = ENGINE_URL;

const app = express();
const server = createServer({
    key: fs.readFileSync("/app/misc/server.key"),
    cert: fs.readFileSync("/app/misc/server.cert"),
}, app);

const io = createSocketIOInstance(server);

// logging in development environment
if (NODE_ENV === "development") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

// allow cors for frontend to access api routes
app.use(cors(corsConfig));

// parse incomming request into json
app.use(express.json());

// parse incomming cookies in request
app.use(cookieParser());

app.use(sessionConfig);

// parse io to request
app.use((req, res, next) => {
    req.io = io;
    next();
});

// server health check end point
app.get('/', function (req, res) {
    res.status(200).json({
        type: "success",
        message: "server is up and running",
        data: null,
    });
});

// Other routers
registerRoutes(app);

// Error handling
app.use("*", notFoundErrorHandler);
app.use(globalErrorHandler);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
