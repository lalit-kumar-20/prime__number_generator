// PrimeNumberGenerator.js

class PrimeNumberGenerator {
    constructor() {}
  
    generate(start, end, algorithm) {
      if (algorithm === 'SieveOfEratosthenes') {
        return this.sieveOfEratosthenes(start, end);
      } else if (algorithm === 'SieveOfSundaram') {
        return this.sieveOfSundaram(start, end);
      } else if (algorithm === 'TrialDivision') {
        return this.trialDivision(start, end);
      } else {
        throw new Error('Invalid algorithm specified');
      }
    }
  
    sieveOfEratosthenes(start, end) {                // Time Complexity O(N*log(log(N)))  and Space Complexity O(N)
        let primes = [];
        primes[0] = primes[1] = false;
        for(let i = 2; i <= end; i++){
            primes[i] = true;
        }
        for (let p = 2; p * p <= end; p++) {
            if (primes[p]) {
                for (let i = p * p; i <= end; i += p) {
                    primes[i] = false;
                }
            }
        }
        return primes.reduce((result, isPrime, number) => {
            if (isPrime && number >= start) result.push(number);
            return result;
        }, []);
    }

    
    // Test the function
    //console.log(sieveOfEratosthenes(10)); // Output: [2, 3, 5, 7]
    
    
    
    // Sieve of Sundaram algorithm
     sieveOfSundaram(start, end) {                               // Time Complexity O(N*logN)  and Space Complexity O((N-1)/2)
        // Adjust the upper limit to produce enough primes
        const limit = Math.floor((end - 1) / 2);
    
        // Initialize an array to mark composites
        const composites = new Array(limit + 1).fill(false);
    
        // Perform the Sieve of Sundaram algorithm
        for (let i = 1; i <= limit; i++) {
            for (let j = i; i + j + 2 * i * j <= limit; j++) {
                composites[i + j + 2 * i * j] = true;
            }
        }
    
        // Generate the prime numbers from the marked array
        const primes = [];
    
        // Include the first prime number, 2, as it's not generated by the algorithm
        if (start <= 2 && end >= 2) {
            primes.push(2);
        }
    
        // Generate the odd prime numbers starting from 3
        for (let i = 1; i <= limit; i++) {
            if (!composites[i]) {
                const primeNumber = 2 * i + 1;
                if (primeNumber >= start && primeNumber <= end) {
                    primes.push(primeNumber);
                }
            }
        }
    
        return primes;
    }
    
    
    // Test the function
    //console.log(sieveOfSundaram(1, 10)); // Output: [2, 3, 5, 7]
    
    
    // Trial division algorithm
    trialDivision(start, end) {                         // Time Complexity O(N*sqrt(N))  and Space Complexity O(1)
        const primes = [];
        for (let i = 2; i <= end; i++) {
            let isPrime = true;
            for (let j = 2; j * j <= i; j++) {
                if (i % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime && i >= start) primes.push(i);
        }
        return primes;
    }
}
  
  module.exports = PrimeNumberGenerator;
  