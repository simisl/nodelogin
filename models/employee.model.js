import mongoose from "mongoose";

const emp = mongoose.model(
    "employee",
    new mongoose.Schema({
        name:{type:String,required:true},
        password:{type:String,required:true}
    })
)

export const employee = {emp}