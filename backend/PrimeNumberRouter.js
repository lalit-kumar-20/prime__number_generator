
const express = require('express');

class PrimeNumberRouter {                      // A class named primeNumberRouter
  constructor(controller) {                 // defines a constructor which takes constroller which is instance of the class PrimeNumberController
    this.controller = controller;            
    this.router = express.Router();         // this is to create a new router instance which is going to handle all http requests
    this.router.post('/generate-primes', this.generatePrimes.bind(this));          // created a endpoint /generate-primes  which is gonna call generatePrime Method of the controller class
  }

  generatePrimes(req, res) {
    return this.controller.generatePrimes(req, res);             // here generatePrime Method of the controller called
  }
}

module.exports = PrimeNumberRouter;
