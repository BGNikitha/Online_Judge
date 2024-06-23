const Problems = require('../models/Problem.js');
const { generateFile } = require('../generateFile.js');
const { executeCpp } = require('../executeCpp.js');
const { generateInputFile } = require("../generateInputFile.js");
const User = require("../models/User");

const run = async (req, res) => {
    const { language = 'cpp', code, input } = req.body;

    console.log("Received run request with language:", language);
    console.log(code) ;

    if (code === undefined) {
        console.log("Empty code box detected");
        return res.status(500).json({
            success: false,
            error: "Empty Code Box",
        });
    }

    try {
        console.log("Generating file for language:", language);
        const filePath = await generateFile(language, code);
    
        console.log("Generating input file");
        const fileInputPath = await generateInputFile(input);
    
        console.log("Executing code:", filePath);
        const output = await executeCpp(filePath, fileInputPath);
    
        console.log("Run completed successfully");
        
        console.log(output);
    
        // Send both stdout and stderr in the response
        res.json(output);
    } catch (error) {
        console.log("Runtime error:", error);
        res.status(500).json(error);
    }
};


const storeSubmmision = async ( prolbemId , verdict , score , code  ) => {

    // problemId : {type : String } ,
    // verdict : { type : String } ,
    // score : { type : String } ,
    // submissionTime : { type : String } ,
    // code : { type : String } ,





}


const submit = async (req, res) => {
    try {
        const problemId = req.params.id;
        const { language = 'cpp', code } = req.body;

        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        console.log("Received submit request for problem:", problemId);

        // Validate inputs
        if (!code) {
            console.log("Empty code box detected");
            return res.status(400).json({
                success: false,
                error: "Empty Code Box",
            });
        }

        console.log("Finding problem by ID:", problemId);
        const problem = await Problems.findOne({ _id: problemId });

        if (!problem) {
            console.log("Problem not found:", problemId);
            return res.status(404).json({
                success: false,
                error: "Problem not found",
            });
        }

        const storeSubmissionHistory = async (verdict, score) => {
            const currentTimeInMillis = Date.now();
            const currentTimeInSeconds = Math.floor(currentTimeInMillis / 1000);
            const currentTimeInSecondsString = currentTimeInSeconds.toString();

            req.user.submissionHistory.push({
                problemId: problemId,
                verdict: verdict,
                score: score,
                submissionTime: currentTimeInSecondsString,
                code: code,
            });
            await req.user.save();

            console.log({
                problemId: problemId,
                verdict: verdict,
                score: score,
                submissionTime: currentTimeInSecondsString,
                code: code,
            });
        };

        const testCase = problem.testCase || [];

        console.log("Generating file for language:", language);
        const filePath = await generateFile(language, code);

        let correct = 0;
        let total = testCase.length;
        let verdict = "ACCEPTED"; // Default to ACCEPTED

        console.log("Starting test cases execution");
        for (const test of testCase) {
            console.log("Executing test case:", test);
            const fileInputPath = await generateInputFile(test.input);

            let generatedOutput = "";
            try {
                generatedOutput = await executeCpp(filePath, fileInputPath);
            } catch (error) {
                console.log("Error while executing code:", error);
                if (error === "TLE") {
                    verdict = "TLE";
                } else {
                    verdict = "Error";
                }
                storeSubmissionHistory(verdict, `${correct}/${total}`);
                return res.json({
                    verdict: verdict,
                    correct,
                    total,
                });
            }

            const correctOutput = test.output;

            if (generatedOutput.trim() !== correctOutput.trim()) {
                console.log("Test case failed");
                verdict = "REJECTED";
                break; // Break out of the loop since one test case failed
            }
            correct++;
        }

        console.log("Submit completed successfully");
        storeSubmissionHistory(verdict, `${correct}/${total}`);
        res.json({
            verdict,
            correct,
            total,
        });
    } catch (error) {
        console.log("Error while submitting the code", error);
        res.status(500).send(error);
    }
};


module.exports = {
    run,
    submit,
};