const {Configuaration, OpenAIApi} = require('openai');
const parseSwagger = require('./swaggerParser');
const parseUnitTests = require('./unitTestParser');

async function generateDocumentation(swaggerFilePath, testFilePath, apiKey) {
    const configuaration = new Configuaration({apiKey})
    const openai = new OpenAIApi(configuaration);
    const swaggerData = await parseSwagger(swaggerFilePath);
    const testCases = parseUnitTests(testFilePath);

    const prompt = `You are a senior technical writer, with an expertise in writing API Documentation. Generate technical documentation for a service with the following details:
    API Endpoints: ${JSON.stringify(swaggerData.paths, null, 2)}
    Unit Test Cases: ${JSON.stringify(testCases, null, 2)}
    You have to explain the purpose, functionality, and details.`;

    try {
        const completion = await openai.createCompletion({
            model: 'gpt-3.5-turbo',
            prompt,
            max_tokens: 1500,
        });
        return completion.data.choices[0].text.trim();
    } catch (error) {
        console.log("Error generating documentaiton", error);
    }
}

module.exports = generateDocumentation