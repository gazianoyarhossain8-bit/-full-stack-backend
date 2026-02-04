import jwt from 'jsonwebtoken';
import Auth from '../models/authModel.js';

const protect = async(req, res ,next) => {
    const token = req.cookies.token; 

    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.auth = await Auth.findById(decoded.authId).select("-password");
        next();
    } catch (error) {
        returnres.status(401).json({
            message: "Invalid token"
        });
    }   

};
export default protect;