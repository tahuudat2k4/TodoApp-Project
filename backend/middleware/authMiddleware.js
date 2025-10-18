const JWT = require('jsonwebtoken');
module.exports = async (req, res, next) => {
    try {
        // get token from header
        const token = req.headers['authorization'].split(" ")[1];
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: "Invalid Token",
                    err
                });
            }else{
                req.user = { id: decoded.id };
                next();
            }
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Please provide Auth token",
             error
        });
    }
}