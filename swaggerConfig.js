const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Loyihasi",
      version: "1.0.0",
      description: "Bu API loyihasi uchun avtomatlashtirilgan dokumentatsiya",
    },
    servers: [
      {
        url: "http://localhost:5000", // API serveringiz manzili
      },
    ],
  },
  apis: ["./routes/*.js"], // Endpoint joylashgan fayllarni ko'rsating
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUI, swaggerSpec };
