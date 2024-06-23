const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes"); //C:\Users\Dell\Desktop\OC\backend\codes

if (!fs.existsSync(dirCodes)) {
    fs.mkdirSync(dirCodes, { recursive: true });
}
const languageFolders = {
    "cpp": "cpp",
    "c": "c",
    "python": "python",
    "java": "java"
};

const generateFile = (language, code) => {
const jobId = uuid(); //2ea93f48-32fd-484f-9b5b-a30f73c2fed5
const filename = `${jobId}.${language}`; // Use backticks for template literals
// return filename;  "2ea93f48-32fd-484f-9b5b-a30f73c2fed5.java"

const languageFolder = languageFolders[language];

    if (!languageFolder) {
        throw new Error(`Unsupported language: ${language}`);
    }

    const languageDir = path.join(dirCodes, languageFolder);

    if (!fs.existsSync(languageDir)) {
        fs.mkdirSync(languageDir, { recursive: true });
    }

const filePath= path.join(languageDir,filename);
fs.writeFileSync(filePath,code);
return filePath;
};

module.exports = {
    generateFile,
};