document.getElementById('primeForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const start = formData.get('start');
    const end = formData.get('end');
    const algorithm = formData.get('algorithm');
    console.log(formData, start, end , algorithm)

    const response = await fetch('http://localhost:3000/generate-primes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start, end, algorithm })
    });

    const data = await response.json();
    displayResults(data);
});

function displayResults(data) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Prime numbers found: ${data.primes.join(', ')}</p>
        <p>Elapsed Time: ${data.elapsedTime} milliseconds</p>
        <p>Total Primes: ${data.primeCount}</p>
    `;
}
