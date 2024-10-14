import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import dotenv from "dotenv";

//! .env dosyasını projenin içinde kullanır
dotenv.config();

// app config 
//! app: Express uygulamasını başlatan değişken
//! port: Sunucunun hangi port üzerinde çalışacağını belirler
const app = express()
const port = 4000

// middleware
//! sunucuya gelen JSON formatındaki istek verilerini otomatik olarak ayrıştırır
//! CORS izinlerini sağlar
app.use(express.json())
app.use(cors())

// db connection
//! veritabanına bağlandı
connectDB();

// api endpoints
//! foodRouter'ı /api/food yoluna yönlendiren bir middleware ekler
app.use("/api/food",foodRouter)
//! resim uploads/sample.jpg olarak kaydedilmişse tarayıcıda images/sample.jpg adresinden erişilebilir
app.use("/images",express.static("uploads"))

//! "http://localhost:4000/" adresine gelen isteklerde "API Working" yanıtı döner
app.get("/",(req,res)=>{
    res.send("API Working")
})

//! Sunucunun belirtilen port üzerinde çalışmasını sağlar
app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`);
})