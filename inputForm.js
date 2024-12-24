async function submitForm(event) {
  event.preventDefault(); // Prevent form reload

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbypfZOlAMBkyM8RZS8waUNhadlpt8IVxuGHvvcCwzd546ulGpVEwB4btSDd2DeXUzao/exec', {
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
