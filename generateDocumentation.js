require('dotenv').config();
const { OpenAI } = require('openai');
const parseSwagger = require('./swaggerParser');
const parseUnitTests = require('./unitTestParser');

async function generateDocumentation(swaggerFilePath, testFilePath, apiKey) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    
    const swaggerData = await parseSwagger(swaggerFilePath);
    const testCases = parseUnitTests(testFilePath);

    try {
        const completion = await openai.completions.create({
            model: 'gpt-3.5-turbo',
            prompt: `You are a senior technical writer, with an expertise in writing API Documentation. Generate technical documentation for a service with the following details:
            API Endpoints: ${JSON.stringify(swaggerData.paths, null, 2)}
            Unit Test Cases: ${JSON.stringify(testCases, null, 2)}
            You have to explain the purpose, functionality, and details.`,
            max_tokens: 1500,
        });
        return completion.choices[0].text.trim();
    } catch (error) {
        console.log("Error generating documentaiton", error);
    }
}

module.exports = generateDocumentation