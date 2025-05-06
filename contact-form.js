document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
  
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
  
      try {
        // Show loading state
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';
        formStatus.style.display = 'block';
  
        // Send the form data
        const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
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