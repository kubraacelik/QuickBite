import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item

//! yiyecekleri veritabanına eklemek için tanımlanan asenkron fonksiyon
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  //! yeni bir yiyecek nesnesi oluşturur
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  //! veritabanına kaydeder
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood };
