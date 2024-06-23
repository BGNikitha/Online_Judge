const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    statement: {
        type: String,
        required: true
    },
    SampleInput: {
        type: String,
        required: true
    },
    SampleOutput: {
        type: String,
        required: true
    },
    tags: {
        type: String,
       
    },
    testCase : [{
        input: { type: String },
        output: { type: String },
    }],
    
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Problem', ProblemSchema);
