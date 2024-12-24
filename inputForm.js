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

    const data = await response.json();
    console.log(data);  // Log the response from the server

    // Handle the success message
    const msg = document.getElementById('alertMessage');
    if (data.message) {
      msg.innerText = data.message;
      msg.style.color = 'green'; // Set text color to green for success
    } else if (data.error) {
      msg.innerText = "Error: " + data.error;
      msg.style.color = 'red'; // Set text color to red for error
    }

    // Display the message for 30 seconds and then disappear 
    setTimeout(() => { msg.innerText = ''; }, 30000); // 30000 milliseconds = 30 seconds
// Clear the form inputs
 event.target.reset();
  } catch (error) {
    console.error("Error submitting the form: ", error);
    const msg = document.getElementById('alertMessage');
    msg.innerText = "Error: " + error.message;
    msg.style.color = 'red'; // Set text color to red for error
    setTimeout(() => { msg.innerText = ''; }, 30000);
  }
}

