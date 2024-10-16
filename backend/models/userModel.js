import mongoose from "mongoose";

//! //! kullanıcıların özelliklerini tanımlayan bir Mongoose şeması
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  }, { minimize: false }
);

//! model, veritabanındaki belgelerle etkileşim kurar
const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
