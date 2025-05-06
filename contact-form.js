document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
  
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Get form data
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value.trim(),
        message: document.getElementById('message').value.trim()
      };
  
      // Validate form data
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        formStatus.textContent = 'Please fill in all required fields.';
        formStatus.className = 'form-status error';
        formStatus.style.display = 'block';
        return;
      }
  
      try {
        // Show loading state
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
  
        // Send the form data to the same server
        const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        const data = await response.json();
  
        if (data.success) {
          // Show success message
          formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
          formStatus.className = 'form-status success';
          
          // Reset form
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Failed to send message');
        }
      } catch (error) {
        // Show error message
        formStatus.textContent = 'Failed to send message. Please try again later.';
        formStatus.className = 'form-status error';
        console.error('Error:', error);
      }
    });
  }); 