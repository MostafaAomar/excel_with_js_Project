// Function to perform the search and dynamically fetch content
async function search() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = "";

    if (!searchTerm) {
        resultsDiv.style.display = "none";
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
            const response = await fetch(page.url);
            if (!response.ok) {
                throw new Error(`Failed to fetch ${page.url}`);
            }
            let text = await response.text();
            text = text.replace(/<script[\s\S]*?<\/script>/gi, "");

            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const navbar = doc.querySelector('nav');
            if (navbar) navbar.remove();

            const content = doc.body.textContent || "";
            const sentences = content.split(/[.!?]/);

            sentences.forEach(sentence => {
                if (sentence.toLowerCase().includes(searchTerm)) {
                    const resultItem = document.createElement("div");
                    resultItem.className = "result-item";
                    resultItem.textContent = sentence.trim();

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
        resultsDiv.textContent = `"${searchTerm}" not found.`;
    }

    resultsDiv.style.display = hasResults ? "block" : "none";
}

document.getElementById('searchInput').addEventListener('input', search);
document.addEventListener('click', (event) => {
    const searchInput = document.getElementById('searchInput');
    const resultsDiv = document.getElementById('results');

    if (!searchInput.contains(event.target) && !resultsDiv.contains(event.target)) {
        resultsDiv.style.display = "none";
    }
});

document.getElementById('searchInput').addEventListener('focus', () => {
    const resultsDiv = document.getElementById('results');
    if (resultsDiv.innerHTML) {
        resultsDiv.style.display = "block";
    }
});
