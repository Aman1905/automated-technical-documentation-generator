require('dotenv').config();
const { OpenAI } = require('openai');
const parseSwagger = require('./swaggerParser');
const parseUnitTests = require('./unitTestParser');
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function generateDocumentation(swaggerFilePath, testFilePath, apiKey) {
    const testCases = parseUnitTests(testFilePath);
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    let swaggerData;
    try {
        swaggerData = await parseSwagger(swaggerFilePath);
    } catch (error) {
        console.error("Failed to parse Swagger file:", error);
        throw new Error("Swagger parsing failed.");
    }

    if (!swaggerData || !swaggerData.paths) {
        throw new Error("Invalid Swagger data: 'paths' is undefined.");
    }

    // Retry logic with exponential backoff
    let retries = 3;
    let delay = 5000; // Start with 5 seconds

    for (let i = 0; i < retries; i++) {
        try {
            const completion = await openai.completions.create({
                model: 'gpt-3.5-turbo',
                prompt: `Generate technical documentation for a service with the following details:
                API Endpoints: ${JSON.stringify(swaggerData.paths, null, 2)}
                Unit Test Cases: ${JSON.stringify(testCases, null, 2)}
                Explain the purpose, functionality, and details.`,
                max_tokens: 200,
            });
            return completion.choices[0].text.trim();
        } catch (error) {
            if (error.code === 'insufficient_quota' || error.status === 429) {
                console.error(`Quota exceeded or rate limit hit. Retrying in ${delay / 1000} seconds...`, error);
                await wait(delay);
                delay *= 2;  // Exponential backoff: double the wait time for each retry
            } else {
                throw error; // Re-throw other errors
            }
        }
    }

    throw new Error("Failed to generate documentation after multiple retries due to quota/rate limits.");
}


module.exports = generateDocumentation;
