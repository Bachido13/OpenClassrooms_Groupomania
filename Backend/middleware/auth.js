const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const isAdmin = decodedToken.isAdmin
        req.auth = {
            userId: userId,
            isAdmin: isAdmin
        };
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID not valid'
        } else {
            next()
        }
    } catch (error) {
        res.status(401).json({ error })
    }
}