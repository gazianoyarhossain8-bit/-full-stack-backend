import User from '../models/userModel.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const resisterUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body)
  
      const userExit = await User.findOne({ email });
      if (userExit) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const user = await User.create({
        name,
        email,
        password: hashedPassword
      });
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        gmail: user.gmail
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

//Login

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    const user = await
    User.findOne({email});

    if( !user) {
        return res.status(400).json({
            message: "invalid credentials"});
    }

    const isMatch = await
    bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "invalid password"});
        }

        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );

        res.json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
};




export {resisterUser, loginUser}