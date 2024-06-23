const fs = require("fs");
const path = require("path");
const { exec } = require('child_process');


const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}


const outlanguageDir = path.join(outputPath, "py");

if (!fs.existsSync(outlanguageDir)) {
    fs.mkdirSync(outlanguageDir, { recursive: true });
}

const executePy = (filepath) => {
    const jobId = path.basename(filepath).split(".")[0];
    const outputFilename = `${jobId}.txt`;
    const outPath = path.join(outlanguageDir, outputFilename);

    return new Promise((resolve, reject) => {
        exec(`python ${filepath} > ${outPath} 2>&1`, // Redirect stdout and stderr to file
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else {
                    // If you want to return the output, you can read the file and resolve with its contents
                    fs.readFile(outPath, 'utf8', (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                }
            });
    });
};

module.exports = {
    executePy,
};
