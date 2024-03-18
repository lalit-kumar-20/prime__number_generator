const Execution = require('./ExecutionModel');

class PrimeNumberController {
  constructor(generator) {
    this.generator = generator;
  }

  async generatePrimes(req, res) {
    const { start, end, algorithm } = req.body;
    const startTime = Date.now();
    let primes;
    try {
      primes = this.generator.generate(start, end, algorithm);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    // Save execution details to the database
    const execution = new Execution({
      timestamp: new Date(),
      start,
      end,
      elapsedTime,
      algorithm,
      primeCount: primes.length
    });

    try {
      await execution.save();
    } catch (error) {
      console.error('Error saving execution details to the database:', error);
      return res.status(500).json({ error: 'Failed to save execution details to the database' });
    }

    res.json({
      primes,
      elapsedTime,
      primeCount: primes.length
    });
  }
}

module.exports = PrimeNumberController;
