const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res, next) => {
    try {
        if (req.session.user?.username) next(); //TODO: check how to auth session cookie
        else {
            if (!req.session.user) {
                req.session.user = {
                    uuid: uuidv4()
                };
            }
            return res.status(403).json({
                type: "Forbidden",
                data: {
                    uuid: req.session.user.uuid,
                },
            });
        }
    } catch (err) {
        next(err);
    }
};