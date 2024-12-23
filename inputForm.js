async function submitForm(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('dataForm'));
    const params = new URLSearchParams(formData);

    try {
      const response = await fetch(
        'https://script.google.com/macros/s/AKfycbwmtPNwc2mMN8hW6MR9KZPFddpDIPciEwrh5MkbE3lLQYhFvPnrbA0RM4HbYy5palGz/exec', // Replace with the Web App URL
        {
          method: 'POST',
          body: params,
        }
      );
      const result = await response.text();
      alert(result);
      document.getElementById('dataForm').reset(); // Clear form after submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save data.');
    }
  }