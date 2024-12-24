// Function to perform the search and dynamically fetch content
async function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase(); // Get search term and normalize
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
            // Fetch page content
            const response = await fetch(page.url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${page.url}`);
            }
            let text = await response.text(); // Get page text

            // Clean up unwanted script tags
            text = text.replace(/<script[\s\S]*?<\/script>/gi, "");

            // Parse HTML and remove the navbar element
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const navbar = doc.querySelector('nav');
            if (navbar) navbar.remove(); // Remove navbar
            const content = doc.body.textContent || ""; // Get body text

            // Split content into sentences or words (for exact match)
            const sentences = content.split(/[.!?]/); // Split by sentence enders
            sentences.forEach(sentence => {
                const cleanedSentence = sentence.trim().toLowerCase(); // Normalize the sentence

                // Check for exact match (whole word match)
                if (cleanedSentence.includes(searchTerm)) {
                    const resultItem = document.createElement("div");
                    resultItem.className = "result-item";
                    resultItem.textContent = sentence.trim();

                    // Click event to navigate with highlighted search term
                    resultItem.addEventListener("click", () => {
                        window.location.href = `${page.url}#highlight=${encodeURIComponent(searchTerm)}`;
                    });

                    resultsDiv.appendChild(resultItem);
                    hasResults = true;
                }
            });
        } catch (error) {
            console.error(`Error fetching ${page.url}:`, error);
        }
    }

    if (!hasResults) {
        resultsDiv.textContent = `"${searchTerm}" not found.`; // Display "not found" if no matches
    }

    resultsDiv.style.display = hasResults ? "block" : "none"; // Show or hide results
}

// Add event listener for search input
document.getElementById('searchInput').addEventListener('input', search);

// Add event listener to hide dropdown when clicking outside
document.addEventListener('click', (event) => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    // Check if the click is outside the search input or results div
    if (!searchInput.contains(event.target) && !resultsDiv.contains(event.target)) {
        resultsDiv.style.display = "none"; // Hide results
    }
});

// Ensure results are visible when typing or focusing on the input
document.getElementById('searchInput').addEventListener('focus', () => {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv.innerHTML) {
        resultsDiv.style.display = "block"; // Show results
    }
});
