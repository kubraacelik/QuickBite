import userModel from "../models/userModel.js";

//! add items to user cart
const addToCart = async (req, res) => {
  try {
    // Kullanıcıyı ID'si ile bulur
    let userData = await userModel.findById(req.body.userId);

    // Kullanıcının mevcut sepet verisini alır
    let cartData = await userData.cartData;

    // Sepette bu ürün yoksa, ürün ID'sine karşılık 1 olarak başlatır.
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    }
    // Sepette zaten varsa, miktarı 1 artırır.
    else {
      cartData[req.body.itemId] += 1;
    }

    // Güncellenen sepeti veritabanına kaydeder
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // İşlem başarılıysa bir yanıt döner
    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);

    // Hata olursa bir hata mesajı döner
    res.json({ success: false, message: "Error" });
  }
};

//! remove items to user cart
const removeFromCart = async (req, res) => {
  try {
    // Kullanıcıyı ID'si ile bulur
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    // Sepette bu ürün varsa ve miktarı 0'dan büyükse 1 azalt
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    // Güncellenen sepet verisini veritabanına kaydet
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });

    // İşlem başarılıysa bir yanıt döner
    res.json({ success: true, message: "Removed From Cart" });
  } catch (error) {
    console.log(error);

    // Hata olursa bir hata mesajı döner
    res.json({ success: false, message: "Error" });
  }
};

//! fetch user
const getCart = async (req, res) => {
    try {
      // Kullanıcıyı ID'si ile bulur
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
  
      // Başarılıysa, sepet verilerini JSON olarak döner
      res.json({ success: true, cartData });
    } catch (error) {
      console.log(error);
  
      // Hata olursa bir hata mesajı döner
      res.json({ success: false, message: "Error" });
    }
  };
  

export { addToCart, removeFromCart, getCart };
