const express = require("express");
require("dotenv").config();
require("colors");
const cors = require("cors");
const coonectDB = require("./config/db");
coonectDB();
const app = express();
// Swagger endpointi

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const corsOptions = {
  origin: ["http://localhost:5173/", "http://localhost:5174/"], // Ruxsat berilgan domenlar
  methods: ["GET", "POST"], // Ruxsat berilgan metodlar
  credentials: true, // Cookie'lar yoki autentifikatsiya uchun
};

app.use(cors(corsOptions));

app.use(cors());
const { swaggerUI, swaggerSpec } = require("./swaggerConfig");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// Routes

app.use("/auth", require("./routes/auth.route"));

app.use("/", (req, res) => {
  res.redirect("/api-docs");
});
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`.bgBlue);
});
