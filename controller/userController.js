import User from "../models/userModel.js";
import mongoose from "mongoose";


//get user
const getUser = async (req, res) => {
    const user = await User.find();
    res.json(user)
}


// create use
const createUser = async (req, res) => {
  try {
    

    console.log("BODY 👉", req.body);
    console.log("file", req.file)

    const { name, age, gmail } = req.body; 
    const image = req.file ?
    req.file.filename : null;

    if (!name || !age || !gmail){
      return
res.status(400).json({message: "name & age is required"});
    }

    const user = await User.create({
      name,
      age,
      gmail,
      image
    });

    res.status(201).json({
      msg: "user created successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

    
//get adhar
const adharcard = async(req,res) => {
    const adhar = await Adhar.find()
    res.json(adhar)
};
//get allnames
const allname = async(req, res) => {
    try {
        const name = await Name.find();
        res.json(name)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
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
    createUser,
adharcard,
allname,
update,
userDelete};






