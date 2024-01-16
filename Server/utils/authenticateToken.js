import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token){
        const err = new Error("Unauthorized");
        err.statusCode = 401;
        return next(err)
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if(!decoded) {
        const err = new Error("Invalid token. Forbidden");
        err.statusCode = 403;
        return next(err);
    }

    req.userId = decoded.userId;

    next();
}

export default authenticateToken;