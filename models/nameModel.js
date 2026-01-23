import mongoose from "mongoose";

const nameSchema = mongoose.Schema({
    name: String,
})
const Name = mongoose.model("allnames", nameSchema);
export default Name;