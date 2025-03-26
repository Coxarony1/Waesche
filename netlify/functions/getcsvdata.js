const fs = require("fs");
const path = require("path");

console.log("Serverless function 'getcsvdata' is running...");
exports.handler = async (event, context) => {
    try {
        console.log("Attempting to read CSV file...");
        // Corrected path to the CSV file
        const filePath = path.join(__dirname, "data", "daten.csv");
        console.log("Attempting to read file at:", filePath); // Debugging log

        const csvData = fs.readFileSync(filePath, "utf8");
        console.log("File read successfully."); // Debugging log

        // Parse the CSV data
        const parsedData = csvData
            .split(/\r?\n/)
            .map(row => row.split(";").map(cell => cell.trim()));

        return {
            statusCode: 200,
            body: JSON.stringify(parsedData),
        };
    } catch (error) {
        console.error("Error in serverless function:", error);
        console.error("Error loading CSV:", error); // Debugging log
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error loading CSV data" }),
        };
    }
};
