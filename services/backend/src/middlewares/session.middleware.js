const session = require("express-session");
var MySQLStore = require('express-mysql-session')(session);
const { SESSION_SECRET, NODE_ENV, ORIGIN } = require("../config/env.config");
const pool = require('../utils/db')

const sessionConfig = session({
    name: "ccc_pid",
    secret: SESSION_SECRET,
    resave: false,
    credentials: true,
    saveUninitialized: false,
    store: new MySQLStore({}, pool),
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        secure: NODE_ENV === "production" ? "true" : "auto",
        sameSite: NODE_ENV === "production" ? "strict" : "none",
    }
})

const corsConfig = {
    origin: JSON.parse(ORIGIN),
    credentials: true,
};

const wrap = middleware =>
    (socket, next) => middleware(socket.request, {}, next);

module.exports = { sessionConfig, corsConfig, wrap };
