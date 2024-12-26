const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.model");
const RateLimit = require("express-rate-limit");

// Payload middleware
const payload = async (req, res, next) => {
  try {
    // Token mavjudligini tekshiramiz
    if (
      !req.headers.authorization || // Token mavjud emas
      !req.headers.authorization.startsWith("Bearer ") // Token formatida xato
    ) {
      return res
        .status(401)
        .json({ message: "Token yo'q yoki noto'g'ri format" });
    }

    const token = req.headers.authorization.split(" ")[1]; // Tokenni ajratib olamiz
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET); // Tokenni tasdiqlaymiz

    req.user = await Auth.findOne({ _id: decoded._id }); // Foydalanuvchini topamiz
    if (!req.user) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
    }

    next(); // Keyingi middleware ga o'tkazamiz
  } catch (error) {
    res.status(401).json({ message: `Xato: ${error.message}` });
  }
};

// Login rate limit
const loginLimiter = RateLimit({
  windowMs: 15 * 60 * 1000, // 15 daqiqa
  max: 5, // 5 ta urinish limiti
  standardHeaders: true, // Cheklov ma'lumotlarini boshqaruvda qaytaradi
  legacyHeaders: false, // Eski formatdagi `X-RateLimit-*` headerlarini o'chiradi
  message:
    "Siz 15 minut kutib qayta urinib ko'rishingiz kerak, chunki 5 martadan ko'p harakat qildingiz",
});

// Middleware isAdmin check
const checkIsAdmin = (req, res, next) => {
  // Foydalanuvchining admin ekanligini tekshiramiz
  if (!req.user.isAdmin) {
    console.log(req.user); // Foydalanuvchini tekshirish uchun
    return res.status(403).json({ message: "Siz admin emassiz" });
  }
  next(); // Admin bo'lsa keyingi middlewarega o'tkazamiz
};

module.exports = { payload, loginLimiter, checkIsAdmin };
