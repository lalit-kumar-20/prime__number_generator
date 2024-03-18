
const express = require('express');

class PrimeNumberRouter {
  constructor(controller) {
    this.controller = controller;
    this.router = express.Router();
    this.router.post('/generate-primes', this.generatePrimes.bind(this));
  }

  generatePrimes(req, res) {
    return this.controller.generatePrimes(req, res);
  }
}

module.exports = PrimeNumberRouter;
