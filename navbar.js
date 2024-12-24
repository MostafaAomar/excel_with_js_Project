async function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!searchTerm) {
        resultsDiv.style.display = "none"; // Hide results if input is empty
        return;
    }

    const pages = [
        { name: 'About Page', url: 'about.html' },
        { name: 'Search Page', url: 'index.html' },
        { name: 'Home Page', url: 'home.html' },
        { name: 'Input Form Page', url: 'inputForm.html' }
    ];

    let hasResults = false;

    for (const page of pages) {
        try {
            console.log(`Fetching content from: ${page.url}`);

            const response = await fetch(page.url);
            if (!response.ok) {
                console.error(`Failed to fetch ${page.url}: ${response.status}`);
                continue;
            }

            let text = await response.text();
            console.log(`Raw content from ${page.url}:`, text);

            // Remove <script> and <nav> tags
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Remove navbar and scripts
            const navbar = doc.querySelector('nav');
            if (navbar) navbar.remove();
            text = (doc.body.textContent || "").replace(/<script[\s\S]*?<\/script>/gi, "").trim();

            console.log(`Processed content from ${page.url}:`, text);

            // Search for the term
            const sentences = text.split(/[.!?]/);
            sentences.forEach((sentence) => {
                if (sentence.toLowerCase().includes(searchTerm)) {
                    console.log(`Match found in: "${sentence.trim()}"`);
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.textContent = sentence.trim();

                    resultItem.addEventListener('click', () => {
                        window.location.href = `${page.url}#highlight=${encodeURIComponent(searchTerm)}`;
                    });

                    resultsDiv.appendChild(resultItem);
                    hasResults = true;
                }
            });
        } catch (error) {
            console.error(`Error processing ${page.url}:`, error);
        }
    }

    if (!hasResults) {
        resultsDiv.textContent = `"${searchTerm}" not found.`;
    }

    resultsDiv.style.display = hasResults ? "block" : "none"; // Show results only if found
}
