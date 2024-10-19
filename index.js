require('dotenv').config()
const generateDocumentation = require('./generateDocumentation');
const swaggerFilePath = '';
const testFilePath = '';
const apiKey = process.env.OPENAI_API_KEY;

(async () => {
    const documentaiton = await generateDocumentation(swaggerFilePath, testFilePath, apiKey);
    console.log('Generated Documentation: \n', documentaiton);
})