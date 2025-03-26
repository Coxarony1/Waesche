const fs = require("fs");
const path = require("path");

exports.handler = async () => {
    try {
        const filePath = path.join(__dirname, "data", "daten.csv");
        console.log("Dateipfad:", filePath);

        if (!fs.existsSync(filePath)) {
            console.error("⚠️ CSV-Datei nicht gefunden!");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "CSV-Datei nicht gefunden" })
            };
        }

        const csvData = fs.readFileSync(filePath, "utf8");
        console.log("Rohdaten:", csvData);

        const parsedData = csvData
            .split(/\r?\n/)
            .map(row => row.split(";").map(cell => cell.trim()));

        console.log("Parse Ergebnis:", parsedData);

        return {
            statusCode: 200,
            body: JSON.stringify(parsedData)
        };
    } catch (error) {
        console.error("❌ Fehler beim Laden:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Fehler beim Laden der CSV-Daten" })
        };
    }
};
