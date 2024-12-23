
        // Function to perform the search and dynamically fetch content
        async function search() {
            const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ""; // Clear previous results

            if (!searchTerm) return; // Exit if input is empty

            // List of pages to search
            const pages = [
                { name: 'About Page', url: 'about.html' },
                { name: 'Search Page', url: 'index.html' },
                { name: 'Home Page', url: 'home.html' },
                { name: 'Input Form Page', url: 'inputForm.html' }
            ];

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

                    // Parse HTML content and extract text
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    const content = doc.body.textContent || ""; // Extract plain text from body

                    // Search for the term within the page content
                    const sentences = content.split(/[.!?]/); // Split into sentences
                    sentences.forEach(sentence => {
                        if (sentence.toLowerCase().includes(searchTerm)) {
                            const resultItem = document.createElement("div");
                            resultItem.className = "result-item";
                            resultItem.textContent = sentence.trim() ;

                            // Add click event to navigate to the page with the search term highlighted
                            resultItem.addEventListener("click", () => {
                                window.location.href = `${page.url}#highlight=${encodeURIComponent(searchTerm)}`;
                            });

                            resultsDiv.appendChild(resultItem);
                        }
                    });
                } catch (error) {
                    console.error(`Error fetching ${page.url}:`, error);
                }
            }

            if (!resultsDiv.innerHTML) {
                resultsDiv.textContent = `"${searchTerm}" not found.`; // Display "not found" message
            }
        }

        document.getElementById('searchInput').addEventListener('input', search);

