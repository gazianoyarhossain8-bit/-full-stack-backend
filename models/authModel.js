import mongoose from "mongoose";
const authSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
})
const Auth = mongoose.model("auths", authSchema);
export default Auth;