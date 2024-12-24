async function submitForm(event) {
  event.preventDefault(); // Prevent form reload
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxYe2fbetgn8j_N818ngbRZxZt5t300VMZrwavSe9Uc0JjxCePB6Olk4AMxV2oqnL0k/exec',  {
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
