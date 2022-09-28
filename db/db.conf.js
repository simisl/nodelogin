import mongoose from "mongoose"

const database = mongoose.connect('mongodb+srv://simisann:sannagar@cluster0.fxx4vqs.mongodb.net/staff');
export const db = {database}