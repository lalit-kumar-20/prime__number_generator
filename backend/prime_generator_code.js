// function sieveOfEratosthenes(st,n) {
//     let primes =[]
//     primes[0] = primes[1] = false;
//     for(let i=2;i<=n;i++){
//         primes[i]=true;
//     }
//     for (let p = 2; p * p <= n; p++) {
//         if (primes[p]) {
//             for (let i = p * p; i <= n; i += p) {
//                 primes[i] = false;
//             }
//         }
//     }
//     return primes.reduce((result, isPrime, number) => {
//         if (isPrime && number>=st) result.push(number);
//         return result;
//     }, []);
// }

// // Test the function
// //console.log(sieveOfEratosthenes(10)); // Output: [2, 3, 5, 7]



// // Sieve of Sundaram algorithm
// function sieveOfSundaram(start, end) {
//     const limit = Math.floor((end - 1) / 2);
//     const primes = new Array(limit + 1).fill(true);

//     for (let i = 1; i <= limit; i++) {
//         for (let j = i; (i + j + 2 * i * j) <= limit; j++) {
//             primes[i + j + 2 * i * j] = false;
//         }
//     }

//     const result = primes.reduce((result, isPrime, number) => {
//         if (isPrime && number !== 1) {
//             const primeNumber = 2 * number + 1;
//             if (primeNumber >= start && primeNumber <= end) {
//                 result.push(primeNumber);
//             }
//         }
//         return result;
//     }, []);

//     return result;
// }

// // Test the function
// //console.log(sieveOfSundaram(1, 10)); // Output: [2, 3, 5, 7]


// // Trial division algorithm
// function trialDivision(st,n) {
//     const primes = [];
//     for (let i = 2; i <= n; i++) {
//         let isPrime = true;
//         for (let j = 2; j * j <= i; j++) {
//             if (i % j === 0) {
//                 isPrime = false;
//                 break;
//             }
//         }
//         if (isPrime && i>=st) primes.push(i);
//     }
//     return primes;
// }

// module.exports = {
//     sieveOfEratosthenes,
//     sieveOfSundaram,
//     trialDivision
// };