import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

//! express uygulaması için yeni bir router oluşturur
const foodRouter = express.Router();

// Image Storage Engine

//! yüklenen dosyaların nasıl depolanacağını belirler
const storage = multer.diskStorage({
  // Yüklenen dosyaların nereye kaydedileceğini belirler
  destination: "uploads",
  // Yüklenen dosyaya özel bir isim verir
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

//! daha önce tanımlanan depolamayı kullanarak Multer middleware'ini oluşturur
const upload = multer({ storage: storage });

//! post isteği /add yoluna gelince ürün ekler
foodRouter.post("/add", upload.single("image"), addFood);
//! get isteği /list yoluna gelince listFood çalışsın, tüm ürünler gelsin
foodRouter.get("/list", listFood);
//! post isteği /remove yoluna gelince ürün siler
foodRouter.post("/remove", removeFood);

export default foodRouter;
