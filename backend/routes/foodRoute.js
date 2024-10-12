import express from "express";
import { addFood } from "../controllers/foodController.js";
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

//! bir POST isteği /add yoluna geldiğinde ne yapılacağını tanımlıyor
foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;
