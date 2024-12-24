// Function to perform the search and dynamically fetch content
async function search() {
    // Get the search term entered by the user and convert it to lowercase for case-insensitive search
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

    // Get the container for displaying search results
    const resultsDiv = document.getElementById('results');

    // Clear any previous search results
    resultsDiv.innerHTML = "";

    // If the input is empty, hide the results and exit the function
    if (!searchTerm) {
        resultsDiv.style.display = "none"; // Hide results div
        return;
    }

    // List of pages to search through, defined as an array of objects with page name and URL
    const pages = [
        { name: 'About Page', url: 'about.html' },
        { name: 'Search Page', url: 'index.html' },
        { name: 'Home Page', url: 'home.html' },
        { name: 'Input Form Page', url: 'inputForm.html' }
    ];

    // A flag to check if any results are found
    let hasResults = false;

    // Loop through each page to fetch and search its content
    for (const page of pages) {
        try {
            // Fetch the HTML content of the page
            const response = await fetch(page.url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${page.url}`); // Log error if fetch fails
            }
            let text = await response.text(); // Get the page content as text

            // Remove script tags to avoid unnecessary or injected scripts
            text = text.replace(/<script[\s\S]*?<\/script>/gi, "");

            // Parse the HTML content into a DOM object for easier manipulation
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            // Remove the navbar to exclude its content from the search
            const navbar = doc.querySelector('nav'); // Adjust selector if your navbar has a different structure
            if (navbar) navbar.remove(); // Remove the navbar from the DOM representation

            // Extract plain text content from the body, excluding HTML tags
            const content = doc.body.textContent || "";

            // Split the content into sentences using punctuation marks
            const sentences = content.split(/[.!?]/);

            // Check each sentence to see if it contains the search term
            sentences.forEach(sentence => {
                if (sentence.toLowerCase().includes(searchTerm)) {
                    // Create a new div element for each matching sentence
                    const resultItem = document.createElement("div");
                    resultItem.className = "result-item"; // Assign a CSS class for styling
                    resultItem.textContent = sentence.trim(); // Set the sentence text

                    // Add a click event to navigate to the page with the search term highlighted
                    resultItem.addEventListener("click", () => {
                        window.location.href = `${page.url}#highlight=${encodeURIComponent(searchTerm)}`;
                    });

                    // Append the result item to the results container
                    resultsDiv.appendChild(resultItem);

                    // Mark that at least one result was found
                    hasResults = true;
                }
            });
        } catch (error) {
            console.error(`Error fetching ${page.url}:`, error); // Log errors if fetching fails
        }
    }

    // If no results are found, display a "not found" message
    if (!hasResults) {
        resultsDiv.textContent = `"${searchTerm}" not found.`;
    }

    // Show or hide the results div based on whether results were found
    resultsDiv.style.display = hasResults ? "block" : "none";
}

// Add an event listener to perform the search whenever the user types in the search input
document.getElementById('searchInput').addEventListener('input', search);

// Add an event listener to hide the dropdown when clicking outside the search input or results container
document.addEventListener('click', (event) => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    // Check if the clicked element is outside both the search input and results container
    if (!searchInput.contains(event.target) && !resultsDiv.contains(event.target)) {
        resultsDiv.style.display = "none"; // Hide the results container
    }
});

// Add an event listener to ensure results are visible when the search input is focused
document.getElementById('searchInput').addEventListener('focus', () => {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv.innerHTML) {
        resultsDiv.style.display = "block"; // Show results if there are any
    }
});
