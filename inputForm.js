async function submitForm(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form data
  const formData = new FormData(event.target);
  const formObject = {};
  formData.forEach((value, key) => { formObject[key] = value });

  // Send the data to Google Apps Script Web App
  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxwZkflMzfiAhmUKLufzhtDNtmsLWB-lDj6ppl26Cq-gtPFeOvHMM3LfUOqGFMSdt99/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formObject),
    });

    const data = await response.json();
    console.log(data);  // Log the response from the server

    // Handle the success message
    if (data.message) {
      alert(data.message);
    } else if (data.error) {
      alert("Error: " + data.error);
    }
  } catch (error) {
    console.error("Error submitting the form: ", error);
    alert("Error: " + error.message);
  }
}
