const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API uchun Swagger dokumentatsiyasi",
    },
    servers: [
      {
        url: "https://authnode-llkl.onrender.com/", // Server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // Swagger uchun yo'llar
});

module.exports = {
  swaggerUI,
  swaggerSpec,
};
