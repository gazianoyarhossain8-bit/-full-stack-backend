import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async(req, res ,next) => {
    const authHeader =
    req.headers.authorization;

    if (authHeader && 
    authHeader.startsWith("Bearer")){
            try { 
                const token = authHeader.split(" ")[1];

                const decoded = jwt.verify(token,
                    process.env.JWT_SECRET);
                    req.user = await
                    User.findById(decoded.userId).select("-password");
                    next();
            }catch (error) {
                res.status(401).json({
                    message: "invalid Token"
                })
            }
        }else{
            return res.status(401).json({
                message: "No token provider"
            })
        }
        
};
export default protect;