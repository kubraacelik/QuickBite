import jwt from "jsonwebtoken";

// Bu kod, kullanıcıdan gelen istekteki token'ı doğrulamak için kullanılır. Token geçersizse veya yoksa, kullanıcıya 
// yetkisiz olduğunu belirten bir yanıt döner. Token geçerliyse, kullanıcı kimliği req.body.userId olarak eklenir ve 
// işlem bir sonraki adıma geçer.
const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authMiddleware;
