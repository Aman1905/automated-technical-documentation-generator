const fs = require('fs-extra');
const testFilePath = './userTest.js'; 

function parseUnitTests() {
  try {
    const fileContent = fs.readFileSync(testFilePath, 'utf-8');
    // For simplicity, extract test descriptions using regex
    const testCases = fileContent.match(/it\(['"`](.*?)['"`],/g).map(match => match.slice(4, -2));
    return testCases;
  } catch (error) {
    console.error('Error reading unit test file:', error);
  }
}

module.exports = parseUnitTests;
