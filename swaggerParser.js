const SwaggerParser = require('swagger-parser');

async function parseSwagger(swaggerFilePath) {
  try {
    if (!swaggerFilePath) throw new Error("Swagger file path is undefined");
    const api = await SwaggerParser.parse(swaggerFilePath);
    return api;
  } catch (error) {
    console.error('Error parsing Swagger:', error);
    throw error;  // Re-throw the error to handle it in generateDocumentation.js
  }
}

module.exports = parseSwagger;