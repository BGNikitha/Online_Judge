const Problems = require('../models/Problem') ;
const User = require("../models/User");

const home = async (req, res) => {
    console.log("Home route called");
    try {
        const array = await Problems.find();
        console.log("Found problems:", array);
        res.json(array);
    } catch (error) {
        console.error("Error in home route:", error);
        res.status(500).send(error);
    }
};

const problem = async (req, res) => {
    try {
        const problemId = req.params.id;
        console.log("Problem route called with ID:", problemId);
        const currProblem = await Problems.findOne({ _id: problemId });
        console.log("Found problem:", currProblem);
        res.json(currProblem);
    } catch (error) {
        console.error("Error in problem route:", error);
        res.status(404).send(error);
    }
};


const submissionHistory = async (req, res) => {
    try {
        const problemId = req.params.id;
        console.log("Submission history route called with problem ID:", problemId);

        if (!req.user || !req.user.submissionHistory) {
            console.log("No submission history found for user");
            return res.status(404).send({ error: "No submission history found" });
        }

        const allSubmission = req.user.submissionHistory;
        const currProblemSubmission = allSubmission.filter(submission => submission.problemId === problemId);

        if (!currProblemSubmission.length) {
            console.log("No submissions found for the given problem ID");
            return res.status(404).send({ error: "No submissions found for the given problem ID" });
        }

        const reversedFirstTen = currProblemSubmission.reverse().slice(0, 10);
        res.json(reversedFirstTen);
    } catch (error) {
        console.error("Error in submission history route:", error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};


module.exports = {
    home ,
    problem,
    submissionHistory,
};