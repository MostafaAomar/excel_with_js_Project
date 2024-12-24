// Function to extract meaningful text from HTML
function extractTextFromHTML(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Remove unwanted elements (e.g., navbars, scripts, forms, footers)
    const unwantedSelectors = ['nav', 'script', 'form', 'footer'];
    unwantedSelectors.forEach(selector => {
        const elements = doc.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });

    // Extract and return plain text from the body
    return doc.body.textContent.trim();
}

// Function to perform the search
async function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!searchTerm) {
        return; // Exit if the search term is empty
    }

    // List of pages to search
    const pages = [
        { name: 'About Page', url: 'about.html' },
        { name: 'Search Page', url: 'index.html' },
        { name: 'Home Page', url: 'home.html' },
        { name: 'Input Form Page', url: 'inputForm.html' }
    ];

    let hasResults = false;

    // Loop through each page and search for the term
    for (const page of pages) {
        try {
            console.log(`Fetching content from: ${page.url}`);
            const response = await fetch(page.url);

            if (!response.ok) {
                console.error(`Failed to fetch ${page.url}: ${response.status}`);
                continue;
            }

            let rawContent = await response.text();
            console.log(`Raw content from ${page.url}:`, rawContent);

            // Process the content to extract meaningful text
            const content = extractTextFromHTML(rawContent);
            console.log(`Processed content from ${page.url}:`, content);

            // Split content into sentences and search for matches
            const sentences = content.split(/[.!?]/); // Split into sentences by punctuation
            sentences.forEach(sentence => {
                if (sentence.toLowerCase().includes(searchTerm)) {
                    console.log(`Match found: "${sentence.trim()}"`);
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.textContent = sentence.trim();

                    // Add click event to navigate to the page with the search term highlighted
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

    // Display message if no results were found
    if (!hasResults) {
        resultsDiv.textContent = `"${searchTerm}" not found.`; // Display "not found" message
    }
}

// Attach the search function to the input field (input event)
document.getElementById('searchInput').addEventListener('input', search);
