document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;

    // Create notification popup
    const notificationPopup = document.createElement('div');
    notificationPopup.className = 'notification-popup';
    notificationPopup.innerHTML = `
        <div class="notification-content">
            <div class="icon"></div>
            <div class="message">
                <div class="title"></div>
                <div class="description"></div>
            </div>
        </div>
        <button class="close-button">&times;</button>
    `;
    document.body.appendChild(notificationPopup);

    // Function to show notification
    function showNotification(type, title, description) {
        const popup = document.querySelector('.notification-popup');
        popup.className = `notification-popup ${type}`;
        
        const icon = popup.querySelector('.icon');
        icon.textContent = type === 'success' ? '✓' : '✕';
        
        popup.querySelector('.title').textContent = title;
        popup.querySelector('.description').textContent = description;
        
        popup.classList.add('show');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            popup.classList.remove('show');
        }, 5000);
    }

    // Close button functionality
    notificationPopup.querySelector('.close-button').addEventListener('click', () => {
        notificationPopup.classList.remove('show');
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault(); // Prevent form from submitting traditionally
        
        // Validate form
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const subject = form.querySelector('#subject').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !subject || !message) {
            showNotification('error', 'Error', 'Please fill in all required fields.');
            return;
        }

        // Disable submit button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        try {
            const response = await fetch('/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                showNotification('success', 'Message Sent!', 'Thank you for contacting us. We will get back to you soon.');
                form.reset();
            } else {
                showNotification('error', 'Error', data.message || 'Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification('error', 'Error', 'Failed to send message. Please try again later.');
        } finally {
            // Re-enable submit button and restore original text
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}); 