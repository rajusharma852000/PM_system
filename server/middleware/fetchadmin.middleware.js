const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');

const fetchadmin = (req, res, next) => {
    try {
        const authToken = req.header('admin-token');
        if (!authToken) {
            return res.status(400).send({message: "Authenticate using valid token"});
        }

        const payload = jwt.verify(authToken, JWT_SECRET);
        req.admin = payload.admin;
        next();
    }
    catch(error){
        return res.status(401).json({ message: "Please authenticate using valid token" });
    }
}

module.exports = fetchadmin;