const SwaggerParser = require('swagger-parser');

async function parseSwagger(filePath) {
  try {
    const api = await SwaggerParser.parse(filePath);
    return api;
  } catch (error) {
    console.error('Error parsing Swagger:', error);
  }
}

module.exports = parseSwagger;