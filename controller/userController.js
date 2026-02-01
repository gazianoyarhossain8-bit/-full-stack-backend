import User from "../models/userModel.js";
import mongoose from "mongoose";


//get user
const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("GET USERS ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};



// create use
const createUser = async (req, res) => {
  try {
    const { name, age, email } = req.body; 
    console.log("BODY", req.body);

    if (!name || !age || !email) {
      return res.status(400).json({
        message: "name, age & email required",
      });
    }
    

    const user = await User.create({
      name,
      age,
      email,
    
    });

    res.status(201).json({
      msg: "user created successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//put user

const update = async(req, res) => {
  try {
    console.log("DB name:",
      mongoose.connection.name);
      console.log("ID:", req.params.id)
    const {name, age, email} = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {name, age,email},
      { new: true}
    );

    res.json(updateUser)
  }catch(error){
    res.status(500).json({
      message: error.message
    })
  }
};
//get delete
const userDelete = async (req, res) => {
const user = await User.findById(req.params.id);

if (!user) {
  return res.status(404).json({
    message: "User not found"})
}

await user.deleteOne();
res.json({
  message: "User deleted succesfully"
})
};

export {
    getUser, 
    createUser,update,userDelete};






