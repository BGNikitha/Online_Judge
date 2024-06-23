const Problem = require('../models/Problem'); 
const User = require('../models/User');

const admin = async (req, res) => {
    try {
        
        const problemList = await Problem.find().lean(); 

        res.status(200).json(problemList);
    } catch (error) {
        console.error('Error fetching problems:', error);
        res.status(500).send('Error fetching problems');
    }
};

const create = async (req, res) => {
    const creater = req.user._id;

    const { name, statement, SampleInput, SampleOutput, testCases } = req.body;

    try {
        const newProblem = await Problem.create({
            name: name,
            statement: statement,
            SampleInput: SampleInput,
            SampleOutput: SampleOutput,
            testCase: testCases,
            createdBy: creater,
        });

        res.status(201).json(newProblem); 
    } catch (error) {
        console.error('Error creating problem:', error);
        res.status(500).send('Error creating problem');
    }
};

const edit = async (req, res) => {
    const { name, statement, SampleInput, SampleOutput, testCases } = req.body;

    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).send({ error: 'Problem not found' });
        }

        // Update the problem fields
        problem.name = name;
        problem.statement = statement;
        problem.SampleInput = SampleInput;
        problem.SampleOutput = SampleOutput;
        problem.testCase = testCases;

        await problem.save();

        res.status(200).send({ message: 'Problem updated successfully' });
    } catch (error) {
        console.error('Error updating problem:', error);
        res.status(500).send({ error: 'Error updating problem' });
    }
};

const deleteProblem = async (req, res) => {
    try {
        const result = await Problem.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Problem not found' });
        }
        res.status(200).send({ message: 'Problem deleted successfully' });
    } catch (error) {
        console.error('Error deleting problem:', error);
        res.status(500).send({ error: 'Error deleting problem' });
    }
};

module.exports = {
    admin,
    create,
    edit,
    deleteProblem,
};
