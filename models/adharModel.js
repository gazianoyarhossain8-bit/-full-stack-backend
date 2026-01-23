import mongoose from "mongoose";

const adharSchema = mongoose.Schema({
    name: String,
    age: Number,
    dob: String,
})

const Adhar = mongoose.model("adharcard", adharSchema);
export default Adhar;