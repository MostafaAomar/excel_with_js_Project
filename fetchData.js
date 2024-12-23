

const API_KEY = 'AIzaSyBzuh1lR-rHL0PkgxX4NaqM0wgxnLTLJRA';//moode gmail <='AIzaSyAo6tF7st8WemuuhTilX6aFTmKMbaG25k4'; zomar gamil<=// Replace with your API key everyc api for gamil account
const SHEET_ID = '18n_B-0KPMm6IyicQIAYbIKkKGc4kitJ1l6F2zQzkEtU';//moode gmail <= '1V4rrev9ymFY50IqnC7RCrcOxd-L2IBsC7oDo_pDSYbk'; zomar gamil<=
const RANGE = 'Sheet1!A1:C10'; // Replace 'test' with your sheet name

async function fetchSheetData() {
  try {
    const response = await fetch(`https://content-sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();

    if (data.values) {
      const tableBody = document.getElementById('sheetData').querySelector('tbody');
      tableBody.innerHTML = ''; // Clear any existing data

      // Populate the table with fetched data
      data.values.forEach((row, index) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
          const td = document.createElement(index === 0 ? 'th' : 'td');
          td.textContent = cell;
          tr.appendChild(td);
        });
        tableBody.appendChild(tr);
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