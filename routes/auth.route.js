const { Router } = require("express");
const router = Router();
const {
  register,
  login,
  logout,
  me,
} = require("../controllers/auth.controller");
const {
  payload,
  checkIsAdmin,
  loginLimiter,
} = require("../middlewares/payload");

/**
 * @swagger
 * auth/register:
 *   post:
 *     summary: Foydalanuvchini ro'yxatdan o'tkazish
 *     description: Yangi foydalanuvchi ro'yxatdan o'tkazish uchun endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Foydalanuvchining email manzili
 *               password:
 *                 type: string
 *                 description: Foydalanuvchining paroli
 *               name:
 *                 type: string
 *                 description: Foydalanuvchining ismi
 *     responses:
 *       201:
 *         description: Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Yaroqsiz so'rov
 */
router.post("/register", register);

/**
 * @swagger
 * auth/login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirishi
 *     description: Foydalanuvchi tizimga kirish uchun endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Foydalanuvchining email manzili
 *               password:
 *                 type: string
 *                 description: Foydalanuvchining paroli
 *     responses:
 *       200:
 *         description: Tizimga muvaffaqiyatli kirish
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Noto'g'ri login ma'lumotlari
 */
router.post("/login", loginLimiter, login);

/**
 * @swagger
 * auth/logout:
 *   post:
 *     summary: Foydalanuvchini tizimdan chiqarish
 *     description: Foydalanuvchini tizimdan chiqish uchun endpoint
 *     responses:
 *       200:
 *         description: Tizimdan muvaffaqiyatli chiqish
 */
router.post("/logout", logout);

/**
 * @swagger
 * auth/me:
 *   get:
 *     summary: Foydalanuvchi haqidagi ma'lumotlarni olish
 *     description: Login qilingan foydalanuvchi haqidagi ma'lumotlarni olish uchun endpoint
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Foydalanuvchi ma'lumotlari muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   description: Foydalanuvchining email manzili
 *                 name:
 *                   type: string
 *                   description: Foydalanuvchining ismi
 *                 isAdmin:
 *                   type: boolean
 *                   description: Foydalanuvchi adminmi yoki yo'qmi
 *       401:
 *         description: Authentifikatsiya xatosi yoki token yo'q
 *       403:
 *         description: Foydalanuvchi admin emas
 */
router.get("/me", payload, checkIsAdmin, me);

module.exports = router;
