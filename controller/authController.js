import Auth from '../models/authModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const resisterUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const authExit = await Auth.findOne({ email });
      if (authExit) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const auth = await Auth.create({
        name,
        email,
        password: hashedPassword
      });
  
      res.status(201).json({
        _id: auth._id,
        name: auth.name,
        email: auth.email
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

//Login

const loginUser = async(req, res) => {
  try {
    const {email, password} = req.body;
    const auth = await Auth.findOne({email});

    if( !auth) {
        return res.status(400).json({
            message: "invalid credentials"});
    }

    const isMatch = await
    bcrypt.compare(password, auth.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "invalid password"});
        }

        const token = jwt.sign(
            {authId:auth._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.cookie("token", token, {
          httpOnly: true,
          secure: true,       
          sameSite: "none",    
          maxAge: 7 * 24 * 60 * 60 * 1000,
          path: "/"
        });
        
        res.status(200).json({
            token,
            authId: auth._id,
            message: "Login successful"
        })
  } catch (error) { 
    console.log("login error:", error);  
     res.status(500).json({ message: error.message });
  }
};




export {resisterUser, loginUser}