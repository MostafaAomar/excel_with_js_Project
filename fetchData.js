

const API_KEY = 'AIzaSyAo6tF7st8WemuuhTilX6aFTmKMbaG25k4';//'AIzaSyBzuh1lR-rHL0PkgxX4NaqM0wgxnLTLJRA';//moode gmail <='AIzaSyAo6tF7st8WemuuhTilX6aFTmKMbaG25k4'; zomar gamil<=// Replace with your API key everyc api for gamil account
const SHEET_ID = '1V4rrev9ymFY50IqnC7RCrcOxd-L2IBsC7oDo_pDSYbk';//'18n_B-0KPMm6IyicQIAYbIKkKGc4kitJ1l6F2zQzkEtU';//moode gmail <= '1V4rrev9ymFY50IqnC7RCrcOxd-L2IBsC7oDo_pDSYbk'; zomar gamil<=
const RANGE = 'Sheet1!A1:C10'; // Replace 'test' with your sheet name

async function fetchSheetData() {
  try {
    const response = await fetch(`https://content-sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();

    if (data.values) {
      const sheetContainer = document.getElementById('sheetData'); // Replace tableBody with a container div
      sheetContainer.innerHTML = ''; // Clear any existing data

      // Populate the container with fetched data
      data.values.forEach((row, index) => {
        const rowDiv = document.createElement('div'); // Create a row container div
        rowDiv.classList.add('row'); // Add a class for styling if needed

        row.forEach((cell, cellIndex) => {
          const cellDiv = document.createElement('div'); // Create a cell div
          cellDiv.textContent = cell;

          // Apply class 'left' for the first column and 'right' for others
          cellDiv.classList.add(cellIndex === 0 ? 'left' : 'right');

          rowDiv.appendChild(cellDiv); // Append cell div to the row
        });

        sheetContainer.appendChild(rowDiv); // Append the row to the container
      });
    } else {
      console.error('No data found in the sheet.');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Fetch data on page load
window.onload = fetchSheetData;
