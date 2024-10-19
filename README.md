# Automated Technical Documentation Generator
Swagger is a tool used to describe and document RESTful APIs. It usually contains details about available endpoints, request parameters, and response formats. The documentation can be in JSON or YAML format.

Unit tests are scripts written to test small pieces of code, such as individual functions or endpoints, to make sure they work as expected.

This repository has a solution for automating the generation of swagger technical documentation and unit test cases into comprehensive technical documents using ChatGPT to help new developers quickly understand a codebase or project.

## Dependencies Installed

- `npm install openai`: To interact with the ChatGPT API.
- `npm install swagger-parser`: To parse Swagger documentation.
- `npm install axios`: To handle HTTP requests, if needed.
- `fs-extra`: For file system operations.
<!-- - `jest`: A testing framework -->

## Steps to run the Project in your Local Machine

### Step 1: Download all the necessary dependencies

```bash
npm install
```

### Step 2: Integrate Swagger and Unit Test Parsing

- `swaggerParser.js`: This script will read and parse the Swagger file to extract details about the API endpoints.
- `unitTestParser.js`: This script will read unit test cases and extract the descriptions of each test.

### Step 3: Integrate GPT for Documentation Generator

- `generateDocumentation.js`: This script file will generate the details about the API in the documentation.