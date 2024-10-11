import mongoose from "mongoose";

//! yiyeceklerin özelliklerini tanımlayan bir Mongoose şeması
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
});

//! model, veritabanındaki belgelerle etkileşim kurar
const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
