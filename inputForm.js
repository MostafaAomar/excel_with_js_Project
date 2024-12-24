async function submitForm(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = new FormData(event.target);
  const formObject = {};
  formData.forEach((value, key) => { formObject[key] = value });

  // Send the data to Google Apps Script Web App
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbz_LyEdBy_urgwjZylFRB9FpBL_k06BXdi-emUnH_Fnv5b7mofk8rHHaWT3YXq2pxJL/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(formObject),
    });

    const result = await response.text();
    alert(result); // Success message
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to save data. Please try again.');
  }
}

