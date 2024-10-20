require('dotenv').config();
const fs = require('fs');
const generateDocumentation = require('./generateDocumentation');
const app = require('./app');

const swaggerFilePath = './swagger.json'; 
const testFilePath = './userTest.js';    
const apiKey = process.env.OPENAI_API_KEY;

// Function to read file contents
function readFileContent(testFilePath) {
    try {
        return fs.readFileSync(testFilePath, 'utf-8');
    } catch (error) {
        console.error(`Error reading file ${testFilePath}:`, error);
        return null;
    }
}

// Function to parse Swagger JSON file
function parseSwaggerFile(swaggerFilePath) {
    try {
        const swaggerContent = readFileContent(swaggerFilePath);
        return swaggerContent ? JSON.parse(swaggerContent) : null;
    } catch (error) {
        console.error(`Error parsing Swagger file ${swaggerFilePath}:`, error);
        return null;
    }
}

// Function to generate documentation
async function generateDocs() {
    try {
        const swaggerData = parseSwaggerFile(swaggerFilePath);
        const testFileContent = readFileContent(testFilePath);

        if (!swaggerData || !testFileContent) {
            console.error('Failed to read Swagger data or test file content');
            return;
        }

        const documentation = await generateDocumentation(swaggerData, testFileContent, apiKey);
        console.log('Generated Documentation: \n', documentation);
    } catch (error) {
        console.error('Error generating documentation:', error);
    }
}

// Start the Express server and generate documentation
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Generate documentation after the server starts
    generateDocs();
});
