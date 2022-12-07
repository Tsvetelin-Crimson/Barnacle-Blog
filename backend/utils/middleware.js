const { verifyToken, verifyAdmin } = require('../services/auth/authService')

function requireAuthentication() {
    return (req, res, next) => {
        const jwtToken = req.headers["bearer"]
        try {
            const decodedToken = verifyToken(jwtToken);
            req.user = decodedToken;
            next();
        } catch (error) {
            res.status(401).json({error: 'You must be loggied in!'});
        }
    }
}

function requireAdminPrivileges() {
    return async (req, res, next) => {
        try {
            const isAdmin = await verifyAdmin(req.user._id);
            req.isAdmin = isAdmin;
            next();
        } catch (error) {
            res.status(403).json({error: 'You must be an admin!'});
        }
    }
}


module.exports = {
    requireAuthentication,
    requireAdminPrivileges,
}