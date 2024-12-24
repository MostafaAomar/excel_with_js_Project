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
            console.log(`Fetching content from: ${page.url}`); // Debug: Log the URL being fetched

            // Fetch the page content
            const response = await fetch(page.url);
            console.log(`Response status for ${page.url}:`, response.status); // Debug: Log the response status

            if (!response.ok) {
                throw new Error(`Failed to fetch ${page.url}`);
            }

            let text = await response.text();
            console.log(`Raw content fetched from ${page.url}:`, text); // Debug: Log raw HTML content

            // Filter out unwanted scripts
            text = text.replace(/<script[\s\S]*?<\/script>/gi, "");

            // Parse HTML content and extract text excluding navbar
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Remove navbar text
            const navbar = doc.querySelector('nav');
            if (navbar) navbar.remove();

            const content = doc.body.textContent || ""; // Extract plain text from body
            console.log(`Processed text content from ${page.url}:`, content); // Debug: Log processed text

            // Search for the term within the page content
            const sentences = content.split(/[.!?]/); // Split into sentences
            sentences.forEach((sentence) => {
                console.log(`Checking sentence: "${sentence.trim()}"`); // Debug: Log each sentence
                if (sentence.toLowerCase().includes(searchTerm)) {
                    console.log(`Match found in sentence: "${sentence.trim()}"`); // Debug: Log matched sentence
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
