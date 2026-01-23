import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    gmail: {
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
image:{
    type: String,
    required: true
}
    
        
    
})
const User = mongoose.model("users", userSchema);
export default User;
