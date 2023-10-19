const CONSTANTS = require('../Config/Constants');
const { verify } = require('../Helpers/JWT');

exports.TokenCheck = (req, res, next) => {
    const authHeader = req.headers.authorization || null;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: CONSTANTS.UNAUTHORIZED,
            status: CONSTANTS.UNAUTHORIZED_HTTP_CODE
        });
    }

    try {
        const userData = verify(token);
        req.userName = userData.userName;
        req.userid = userData.userid;
        next();
    } catch (error) {
        return res.status(401).json({
            message: CONSTANTS.UNAUTHORIZED,
            status: CONSTANTS.UNAUTHORIZED_HTTP_CODE
        });
    }
};
