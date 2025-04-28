// Elements
const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const usernameInput = document.getElementById('username');
const usernameContainer = document.getElementById('usernameContainer');
const usernameValidation = document.getElementById('usernameValidation');
const nextButton = document.getElementById('nextButton');

// Simulated database of registered usernames
const registeredUsernames = ['john', 'jane', 'admin'];

// Simulated database of registered emails
const registeredEmails = ['test@example.com', 'user@pledgebear.com'];

// Password strength levels
const strengthLevels = {
    weak: { color: '#FF5252', text: 'Weak' },
    medium: { color: '#FFC107', text: 'Medium' },
    strong: { color: '#4CAF50', text: 'Strong' }
};

// Username validation regex
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

// Step 1: Username validation
usernameInput.addEventListener('input', (e) => {
    const value = e.target.value;
    
    // Reset styles
    usernameContainer.className = 'input-container';
    usernameValidation.className = 'validation-message';
    usernameValidation.innerHTML = '';
    
    if (value && !usernameRegex.test(value)) {
        showUsernameError('Username must be 3-20 characters long and contain only letters, numbers, and underscores');
        nextButton.disabled = true;
    } else if (registeredUsernames.includes(value)) {
        showUsernameError('This username is already taken');
        nextButton.disabled = true;
    } else if (value && usernameRegex.test(value)) {
        usernameContainer.className = 'input-container valid';
        usernameValidation.className = 'validation-message valid';
        usernameValidation.innerHTML = `
            <i class="fas fa-check-circle"></i>
            This username is available
        `;
        nextButton.disabled = false;
    } else {
        nextButton.disabled = true;
    }
});

// Step 1: Next button click handler
nextButton.addEventListener('click', () => {
    if (!nextButton.disabled) {
        step1.classList.remove('active');
        step2.classList.add('active');
        document.querySelectorAll('.step')[0].classList.add('completed', 'inactive');
        document.querySelectorAll('.step')[1].classList.remove('inactive');
    }
});

// Add Enter key handler for username input
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !nextButton.disabled) {
        step1.classList.remove('active');
        step2.classList.add('active');
        document.querySelectorAll('.step')[0].classList.add('completed', 'inactive');
        document.querySelectorAll('.step')[1].classList.remove('inactive');
    }
});

function showUsernameError(message) {
    usernameContainer.className = 'input-container invalid';
    usernameValidation.className = 'validation-message invalid';
    usernameValidation.innerHTML = `
        <i class="fas fa-times-circle"></i>
        ${message}
    `;
}

// Step 2 Elements
const step2Button = document.getElementById('step2Button');
const backButton = document.getElementById('backButton');
const emailInput = document.getElementById('email');
const emailContainer = document.getElementById('emailContainer');
const emailValidation = document.getElementById('emailValidation');
const recaptchaContainer = document.getElementById('recaptchaContainer');
const passwordInput = document.getElementById('password');
const passwordContainer = document.getElementById('passwordContainer');
const togglePassword = document.getElementById('togglePassword');
const passwordStrengthBar = document.getElementById('passwordStrengthBar');
const passwordStrengthText = document.getElementById('passwordStrengthText');
const verificationCode = document.getElementById('verificationCode');
const verificationMessage = document.getElementById('verificationMessage');
const resendCode = document.getElementById('resendCode');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Step 2: Email validation
emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();
    const isValidEmail = emailRegex.test(email);
    const isRegistered = registeredEmails.includes(email);
    
    if (!isValidEmail) {
        showEmailError('Please enter a valid email address');
        step2Button.disabled = true;
        recaptchaContainer.style.display = 'none';
    } else if (isRegistered) {
        showEmailError('This email is already registered');
        step2Button.disabled = true;
        recaptchaContainer.style.display = 'none';
    } else {
        emailValidation.textContent = '';
        emailContainer.classList.remove('error');
        recaptchaContainer.style.display = 'block';
    }
});

// Add recaptcha checkbox handler
document.getElementById('recaptcha').addEventListener('change', (e) => {
    const isValidEmail = emailRegex.test(emailInput.value.trim());
    const isEmailRegistered = registeredEmails.includes(emailInput.value.trim());
    const password = passwordInput.value;
    step2Button.disabled = !(password.length >= 8 && isValidEmail && !isEmailRegistered && e.target.checked);
});

// Add Enter key handler for email input
emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (!step2Button.disabled) {
            step2Button.click();
        }
    }
});

// Step 2: Password validation
passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    updatePasswordStrength(password);
    
    const isValidEmail = emailRegex.test(emailInput.value.trim());
    const isEmailRegistered = registeredEmails.includes(emailInput.value.trim());
    const recaptchaChecked = document.getElementById('recaptcha').checked;
    step2Button.disabled = !(password.length >= 8 && isValidEmail && !isEmailRegistered && recaptchaChecked);
});

// Add Enter key handler for password input
passwordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (!step2Button.disabled) {
            step2Button.click();
        }
    }
});

// Step 2: Toggle password visibility
togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
});

// Step 2: Back button handler
backButton.addEventListener('click', () => {
    step2.classList.remove('active');
    step1.classList.add('active');
    document.querySelectorAll('.step')[0].classList.remove('completed', 'inactive');
    document.querySelectorAll('.step')[1].classList.add('inactive');
});

// Step 2: Next button handler
step2Button.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    const recaptchaChecked = document.getElementById('recaptcha').checked;

    if (!email || !emailRegex.test(email)) {
        showEmailError('Please enter a valid email address');
        return;
    }

    if (!recaptchaChecked) {
        alert('Please verify that you are not a robot');
        return;
    }

    if (password.length < 8) {
        alert('Password must be at least 8 characters long');
        return;
    }

    if (verificationCode.style.display !== 'block') {
        verificationCode.style.display = 'block';
        verificationMessage.style.display = 'block';
        step2Button.textContent = "Let's See Your Page!";
        step2Button.disabled = true;
        return;
    }

    const code = document.getElementById('code').value;
    if (code.length !== 6) {
        alert('Please enter the 6-digit verification code');
        return;
    }

    step2.classList.remove('active');
    step3.classList.add('active');
    document.querySelectorAll('.step')[1].classList.add('completed', 'inactive');
    document.querySelectorAll('.step')[2].classList.remove('inactive');
});

// Step 2: Verification code input handler
document.getElementById('code').addEventListener('input', (e) => {
    const code = e.target.value;
    step2Button.disabled = code.length !== 6;
});

// Add Enter key handler for verification code
document.getElementById('code').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if (!step2Button.disabled) {
            step2Button.click();
        }
    }
});

// Step 2: Resend code handler
resendCode.addEventListener('click', () => {
    verificationMessage.style.display = 'block';
    verificationMessage.textContent = 'A new verification code has been sent to your email. Please check your inbox.';
    alert('A new verification code has been sent to your email');
});

function showEmailError(message) {
    emailValidation.textContent = message;
    emailContainer.classList.add('error');
}

// Social login buttons
document.querySelectorAll('.social-button').forEach(button => {
    button.addEventListener('click', () => {
        const platform = button.textContent.trim();
        alert(`Signing in with ${platform}...`);
    });
});

// Sign in link handler
signInLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Redirecting to sign in page...');
});

// Step 3: Back button handler
const backButtonStep3 = document.getElementById('backButtonStep3');
backButtonStep3.addEventListener('click', () => {
    step3.classList.remove('active');
    step2.classList.add('active');
    document.querySelectorAll('.step')[2].classList.add('inactive');
    document.querySelectorAll('.step')[1].classList.remove('inactive');
});

// Step 3: Image upload handler
const imageUpload = document.getElementById('pageImage');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const imageUploadPlaceholder = document.querySelector('.image-upload-placeholder');
const imageUploadContainer = document.querySelector('.image-upload-container');
const publishButton = document.getElementById('publishButton');

// Step 3: Image upload functionality
imageUpload.addEventListener('change', () => {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewImage.src = e.target.result;
            imagePreview.style.display = 'block';
            imageUploadPlaceholder.style.display = 'none';
            // Enable the continue button when image is uploaded
            publishButton.disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

// Step 3: Drag and drop functionality
imageUploadContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    imageUploadContainer.classList.add('drag-over');
});

imageUploadContainer.addEventListener('dragleave', () => {
    imageUploadContainer.classList.remove('drag-over');
});

imageUploadContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    imageUploadContainer.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            previewImage.src = e.target.result;
            imagePreview.style.display = 'block';
            imageUploadPlaceholder.style.display = 'none';
            // Enable the continue button when image is uploaded
            publishButton.disabled = false;
        };
        reader.readAsDataURL(file);
    }
});

// Step 3: Preview content handler
const causeName = document.getElementById('causeName');
const headlineText = document.getElementById('headlineText');
const optionalText = document.getElementById('optionalText');
const previewHeadline = document.getElementById('previewHeadline');
const previewOptionalText = document.getElementById('previewOptionalText');

// Donation amount inputs
const donationAmount1 = document.getElementById('donationAmount1');
const donationAmount2 = document.getElementById('donationAmount2');
const donationAmount3 = document.getElementById('donationAmount3');
const donationAmountButtons = document.querySelectorAll('.donation-grid .donation-amount:not(:last-child)');

// Update donation amounts in preview
function updateDonationAmounts() {
    const amounts = [donationAmount1, donationAmount2, donationAmount3];
    donationAmountButtons.forEach((button, index) => {
        if (amounts[index]) {
            const amountSpan = button.querySelector('.amount');
            if (amountSpan) {
                amountSpan.textContent = `$${amounts[index].value}`;
            }
        }
    });
}

// Add event listeners for donation amount inputs
[donationAmount1, donationAmount2, donationAmount3].forEach(input => {
    input.addEventListener('input', updateDonationAmounts);
});

// Initialize preview content
previewHeadline.textContent = headlineText.value || 'Join us today and support our cause';
previewOptionalText.textContent = optionalText.value || '';
updateDonationAmounts();

// Update preview content on input
causeName.addEventListener('input', () => {
    const prefix = titlePrefix.value === 'custom' ? customTitlePrefix.value : titlePrefix.value;
    updatePreviewTitle(prefix || 'Donate to');
});

headlineText.addEventListener('input', () => {
    previewHeadline.textContent = headlineText.value || 'Join us today and support our cause';
});

optionalText.addEventListener('input', () => {
    previewOptionalText.textContent = optionalText.value || '';
});

// Step 3: Title prefix functionality
const titlePrefix = document.getElementById('titlePrefix');
const customTitlePrefix = document.getElementById('customTitlePrefix');
const previewTitle = document.getElementById('previewTitle');

// Hide custom input initially
customTitlePrefix.style.display = 'none';

// Handle dropdown change
titlePrefix.addEventListener('change', function() {
    if (this.value === 'custom') {
        customTitlePrefix.style.display = 'block';
        customTitlePrefix.focus();
        updatePreviewTitle(customTitlePrefix.value);
    } else {
        customTitlePrefix.style.display = 'none';
        updatePreviewTitle(this.value);
    }
});

// Handle custom input change
customTitlePrefix.addEventListener('input', function() {
    updatePreviewTitle(this.value);
});

// Update preview title
function updatePreviewTitle(prefix) {
    const causeName = document.getElementById('causeName').value || 'Cause Name';
    const previewMainTitle = document.getElementById('previewMainTitle');
    if (previewMainTitle) {
        previewMainTitle.innerHTML = `${prefix} <span id="previewCauseNameRight">${causeName}</span>`;
    }
}

// Initialize preview title
updatePreviewTitle(titlePrefix.value);

// Step 3: Donation amount buttons
const donationButtons = document.querySelectorAll('.donation-amount');
donationButtons.forEach(button => {
    button.addEventListener('click', () => {
        donationButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Step 3: Frequency buttons
const frequencyButtons = document.querySelectorAll('.frequency-button');
frequencyButtons.forEach(button => {
    button.addEventListener('click', () => {
        frequencyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Step 3: Payment buttons
const paymentButtons = document.querySelectorAll('.payment-option');
paymentButtons.forEach(button => {
    button.addEventListener('click', () => {
        paymentButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Step 3: Publish button handler
publishButton.addEventListener('click', () => {
    if (!causeName.value) {
        alert('Please enter a cause name');
        return;
    }

    if (!imagePreview.src || imagePreview.src.includes('data:image/svg+xml')) {
        alert('Please upload an image');
        return;
    }

    // Move to step 3
    step2.classList.remove('active');
    step3.classList.add('active');
    document.querySelectorAll('.step')[1].classList.add('completed', 'inactive');
    document.querySelectorAll('.step')[2].classList.remove('inactive');
});

// Step 2: Password strength calculation
function updatePasswordStrength(password) {
    let strength = 0;
    let color = strengthLevels.weak.color;
    let text = strengthLevels.weak.text;

    if (password.length >= 8) strength++;
    if (password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^A-Za-z0-9]/)) strength++;

    if (strength >= 4) {
        color = strengthLevels.strong.color;
        text = strengthLevels.strong.text;
    } else if (strength >= 2) {
        color = strengthLevels.medium.color;
        text = strengthLevels.medium.text;
    }

    passwordStrengthBar.style.width = `${(strength / 4) * 100}%`;
    passwordStrengthBar.style.backgroundColor = color;
    passwordStrengthText.textContent = text;
    passwordStrengthText.style.color = color;
}

// Add recaptcha click handler
document.querySelector('.recaptcha-container').addEventListener('click', function(e) {
    const checkbox = document.getElementById('recaptcha');
    if (e.target !== checkbox) {
        checkbox.checked = !checkbox.checked;
        checkbox.dispatchEvent(new Event('change'));
    }
});

// Custom Select Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const selectContainer = document.querySelector('.custom-select-container');
    const selectTrigger = document.querySelector('.custom-select-trigger');
    const options = document.querySelectorAll('.custom-option');
    const hiddenSelect = document.getElementById('titlePrefix');
    const customTitlePrefix = document.getElementById('customTitlePrefix');
    const triggerText = selectTrigger.querySelector('span');

    // Toggle dropdown
    selectTrigger.addEventListener('click', () => {
        selectContainer.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!selectContainer.contains(e.target)) {
            selectContainer.classList.remove('open');
        }
    });

    // Handle option selection
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Update selected option
            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            
            // Update trigger text and hidden select value
            const value = option.getAttribute('data-value');
            triggerText.textContent = option.textContent;
            hiddenSelect.value = value;

            // Handle custom option
            if (value === 'custom') {
                customTitlePrefix.style.display = 'block';
                customTitlePrefix.focus();
                updatePreviewTitle(customTitlePrefix.value);
            } else {
                customTitlePrefix.style.display = 'none';
                updatePreviewTitle(value);
            }

            // Close dropdown
            selectContainer.classList.remove('open');
        });
    });

    // Handle keyboard navigation
    selectContainer.addEventListener('keydown', (e) => {
        if (!selectContainer.classList.contains('open')) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
                e.preventDefault();
                selectContainer.classList.add('open');
            }
        } else {
            const activeOption = document.querySelector('.custom-option:focus');
            const options = [...document.querySelectorAll('.custom-option')];
            
            switch(e.key) {
                case 'Escape':
                    selectContainer.classList.remove('open');
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    if (activeOption) {
                        const prevOption = options[options.indexOf(activeOption) - 1];
                        if (prevOption) prevOption.focus();
                    }
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    if (!activeOption) {
                        options[0].focus();
                    } else {
                        const nextOption = options[options.indexOf(activeOption) + 1];
                        if (nextOption) nextOption.focus();
                    }
                    break;
                case 'Enter':
                case ' ':
                    if (activeOption) {
                        activeOption.click();
                    }
                    break;
            }
        }
    });
}); 