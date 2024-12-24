// Function to perform the search and dynamically fetch content
async function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; // Clear previous results

    if (!searchTerm) {
        resultsDiv.style.display = "none"; // Hide results if input is empty
        return;
    }

    // List of pages to search
    const pages = [
        { name: 'About Page', url: 'about.html' },
        { name: 'Search Page', url: 'index.html' },
        { name: 'Home Page', url: 'home.html' },
        { name: 'Input Form Page', url: 'inputForm.html' }
    ];

    let hasResults = false;

    for (const page of pages) {
        try {
            // Fetch the page content
            const response = await fetch(page.url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${page.url}`);
            }
            let text = await response.text();

            // Filter out unwanted scripts (Live Server injected code)
            text = text.replace(/<script[\s\S]*?<\/script>/gi, "");

            // Parse HTML content and extract text excluding navbar
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Extract content without navbar text
            const navbar = doc.querySelector('nav'); // Adjust selector based on your navbar structure
            if (navbar) navbar.remove(); // Remove navbar from the document
            const content = doc.body.textContent || ""; // Extract plain text from body

            // Debug: Log the content being searched
            console.log("Content being searched:", content);

            // Search for the term within the page content
            const sentences = content.split(/[.!?]/); // Split into sentences
            sentences.forEach(sentence => {
                if (sentence.toLowerCase().includes(searchTerm)) {
                    const resultItem = document.createElement("div");
                    resultItem.className = "result-item";
                    resultItem.textContent = sentence.trim();

                    // Add click event to navigate to the page with the search term highlighted
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

    // Display "not found" message if no results
    if (!hasResults) {
        resultsDiv.textContent = `"${searchTerm}" not found.`;
    }

    resultsDiv.style.display = hasResults ? "block" : "none"; // Show/hide results
}

// Add event listener to search input
document.getElementById('searchInput').addEventListener('input', search);

// Hide dropdown when clicking outside
document.addEventListener('click', (event) => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    // Check if the click is outside the search input or results div
    if (!searchInput.contains(event.target) && !resultsDiv.contains(event.target)) {
        resultsDiv.style.display = "none"; // Hide results
    }
});

// Ensure results are visible when typing
document.getElementById('searchInput').addEventListener('focus', () => {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv.innerHTML) {
        resultsDiv.style.display = "block";
    }
});
