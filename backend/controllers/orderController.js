import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//! Bu fonksiyon, kullanıcının sipariş verdiğinde çağrılıyor. Sipariş bilgilerini veritabanına kaydediyor.
//! Stripe Checkout oturumu oluşturarak ödeme sürecini başlatıyor.
// placing user model for frontend
const placeOrder = async (req, res) => {
  // Siparişin başarılı veya başarısız olma durumlarına göre yönlendirme yapılacak olan frontend URL'si.
  const frontend_url = "http://localhost:5173";
  try {
    // Yeni bir sipariş oluşturuluyor. req.body içindeki veriler kullanıcının frontend'den gönderdiği sipariş bilgilerini içeriyor.
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    // Sipariş MongoDB veritabanına kaydediliyor.
    await newOrder.save();
    // Sipariş verildikten sonra, kullanıcının alışveriş sepetindeki ürünler temizleniyor.
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Stripe Checkout oturumu için gerekli olan ürün bilgileri hazırlanıyor.
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100 * 80,
      },
      quantity: item.quantity,
    }));

    // Sepete "Delivery Charges" (Kargo Ücreti) adında bir ek ücret ekleniyor. Ücreti burada sabit olarak 2 INR gösterildi.
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // Stripe API'si kullanılarak bir ödeme oturumu oluşturuluyor.
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.josn({ success: false, message: "Error" });
  }
};

export { placeOrder, verifyOrder };
