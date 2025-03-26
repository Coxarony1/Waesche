const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
    try {
        // Corrected path to the CSV file
        const filePath = path.join(__dirname, "data", "daten.csv");
        const csvData = fs.readFileSync(filePath, "utf8");

        // Parse the CSV data
        const parsedData = csvData
            .split(/\r?\n/)
            .map(row => row.split(";").map(cell => cell.trim()));

        return {
            statusCode: 200,
            body: JSON.stringify(parsedData),
        };
    } catch (error) {
        console.error("Error loading CSV:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error loading CSV data" }),
        };
    }
};
