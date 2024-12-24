async function submitForm(event) {
  event.preventDefault(); // Prevent form reload
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbz3uDrUHHyvru3km6SwvZZS9Dj5O4k8ilXHQ7wYQJqL1WezouUlKLTH9LxI9qdBceNC/exec',  {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.text();
    alert(result); // Success message
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to save data. Please try again.');
  }
}
