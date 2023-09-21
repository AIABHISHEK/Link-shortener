import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Invalid authorization header');
        error.statusCode = 401;
        res.status(401).json({ message: 'Authentication failed no auth header' });
        // throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'abhishek');
    } catch (error) {
        console.log(error);
        error.statusCode = 500;
    res.status(500).json({ message: 'Authentication failed' });
        throw error;
    }
    if (!decodedToken) {
        const error = new Error('Not Authenticated not valid token');
        error.statusCode = 401;
        // throw error;
        res.status(401).json({ message: 'Authentication failed' });
    }
    console.log(decodedToken);
    req.userId = decodedToken.userId;
    next();
}
export default auth;