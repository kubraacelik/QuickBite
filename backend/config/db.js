//!  MongoDB veritabanına bağlanır

import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://kkbracelik92:celikubra%40903@cluster0.oahyu.mongodb.net/quickbite").then(()=>console.log("DB Connected"));
}