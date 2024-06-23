const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');


const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const outlanguageDir = path.join(outputPath, "c");

if (!fs.existsSync(outlanguageDir)) {
    fs.mkdirSync(outlanguageDir, { recursive: true });
}

const executeC = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputFilename = `${jobId}.exe`;
    const outPath = path.join(outlanguageDir, outputFilename);

    return new Promise((resolve, reject) => {
        exec(`gcc ${filepath} -o ${outPath} && ${outPath}`, // Modified command to run output file directly
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                if (stderr) {
                    reject(error);
                }
                resolve(stdout);
            });
    });
};

module.exports = {
    executeC,
};



