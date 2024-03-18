const mongoose = require('mongoose');

const executionSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    start: Number,
    end: Number,
    elapsedTime: Number,
    algorithm: String,
    primeCount: Number
});

const ExecutionModel = mongoose.model('ExecutionHistory', executionSchema);

module.exports = ExecutionModel;
