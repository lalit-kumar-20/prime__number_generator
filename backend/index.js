const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const primeGenerator = require('./prime_generator_code'); //  primeGenerator.js contains the prime number generation code
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define execution schema for MongoDB
const executionSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    start: Number,
    end: Number,
    elapsedTime: Number,
    algorithm: String,
    primeCount: Number
});

const Execution = mongoose.model('Execution', executionSchema);

app.use(cors()); // Add this line to enable CORS for all routes
app.use(bodyParser.json());

// API endpoint for generating prime numbers
app.post('/generate-primes', async (req, res) => {
    const { start, end, algorithm } = req.body;
    const startTime = Date.now();

    let primes;
    if (algorithm === 'SieveOfEratosthenes') {
        primes = primeGenerator.sieveOfEratosthenes(start,end);
    } else if (algorithm === 'SieveOfSundaram') {
        primes = primeGenerator.sieveOfSundaram(start,end);
    } else if (algorithm === 'TrialDivision') {
        primes = primeGenerator.trialDivision(start,end);
    } else {
        return res.status(400).json({ error: 'Invalid algorithm specified' });
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    const execution = new Execution({
        start,
        end,
        elapsedTime,
        algorithm,
        primeCount: primes.length
    });

    await execution.save();
    
    res.json({
        primes,
        elapsedTime,
        primeCount: primes.length
    });
    console.log(primes)
});

// Allow OPTIONS requests for CORS
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
