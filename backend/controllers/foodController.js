import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
//! yiyecekleri veritabanına eklemek için tanımlanan asenkron fonksiyon
const addFood = async (req, res) => {
  // Yüklenen dosyanın sunucuda kaydedildiği dosya adını tutar
  let image_filename = `${req.file.filename}`;

  //! bir foodModel nesnesi oluşturup veritabanına yeni food öğesi eklemek için kullanılıyor
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
