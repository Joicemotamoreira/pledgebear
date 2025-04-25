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
        // Hide Step 1 and show Step 2
        step1.classList.remove('active');
        step2.classList.add('active');
        
        // Update steps indicator
        document.querySelectorAll('.step')[0].classList.add('completed', 'inactive');
        document.querySelectorAll('.step')[1].classList.remove('inactive');
    }
});

// Add Enter key handler for username input
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !nextButton.disabled) {
        // Hide Step 1 and show Step 2
        step1.classList.remove('active');
        step2.classList.add('active');
        
        // Update steps indicator
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
        // Show recaptcha when email is valid
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
    
    // Enable continue button only if both password and email are valid and recaptcha is checked
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
    // Hide Step 2 and show Step 1
    step2.classList.remove('active');
    step1.classList.add('active');
    
    // Update steps indicator
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

    // If verification code is not visible yet, show it
    if (verificationCode.style.display !== 'block') {
        verificationCode.style.display = 'block';
        verificationMessage.style.display = 'block';
        step2Button.textContent = 'Continue to Step 3';
        step2Button.disabled = true; // Disable button until code is entered
        return;
    }

    // If verification code is visible, check if it's valid
    const code = document.getElementById('code').value;
    if (code.length !== 6) {
        alert('Please enter the 6-digit verification code');
        return;
    }

    // If all validations pass, proceed to Step 3
    step2.classList.remove('active');
    step3.classList.add('active');
    
    // Update steps indicator
    document.querySelectorAll('.step')[1].classList.add('completed', 'inactive');
    document.querySelectorAll('.step')[2].classList.remove('inactive');
});

// Step 2: Verification code input handler
document.getElementById('code').addEventListener('input', (e) => {
    const code = e.target.value;
    // Enable next button only when code is 6 digits
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
    // window.location.href = 'signin.html'; // Uncomment this line when you have a sign in page
});

// Step 3: Back button handler
const backButtonStep3 = document.getElementById('backButtonStep3');
backButtonStep3.addEventListener('click', () => {
    // Hide Step 3 and show Step 2
    step3.classList.remove('active');
    step2.classList.add('active');
    
    // Update steps indicator
    document.querySelectorAll('.step')[2].classList.add('inactive');
    document.querySelectorAll('.step')[1].classList.remove('inactive');
});

// Step 3: Image upload handler
const imageUpload = document.getElementById('pageImage');
const imagePreview = document.getElementById('imagePreview');
const previewImage = document.getElementById('previewImage');
const imageUploadPlaceholder = document.querySelector('.image-upload-placeholder');
const imageUploadContainer = document.querySelector('.image-upload-container');

// Step 3: Image upload functionality
imageUpload.addEventListener('change', () => {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Update both preview images
            imagePreview.src = e.target.result;
            previewImage.src = e.target.result;
            imagePreview.style.display = 'block';
            imageUploadPlaceholder.style.display = 'none';
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
            // Update both preview images
            imagePreview.src = e.target.result;
            previewImage.src = e.target.result;
            imagePreview.style.display = 'block';
            imageUploadPlaceholder.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// Step 3: Preview content handler
const causeName = document.getElementById('causeName');
const websiteLink = document.getElementById('websiteLink');
const headlineText = document.getElementById('headlineText');
const optionalText = document.getElementById('optionalText');
const previewHeadline = document.getElementById('previewHeadline');
const previewOptionalText = document.getElementById('previewOptionalText');

// Initialize preview content
previewHeadline.textContent = headlineText.value || 'Join us today and support our cause';
previewOptionalText.textContent = optionalText.value || '';

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

websiteLink.addEventListener('input', () => {
    // Add website link to the preview content
    const websiteLinkPreview = document.getElementById('previewWebsiteLink');
    if (!websiteLinkPreview) {
        const linkElement = document.createElement('a');
        linkElement.id = 'previewWebsiteLink';
        linkElement.className = 'preview-website-link';
        linkElement.target = '_blank';
        document.querySelector('.preview-content').insertBefore(
            linkElement,
            document.getElementById('previewHeadline')
        );
    }
    const link = document.getElementById('previewWebsiteLink');
    link.href = websiteLink.value;
    link.textContent = websiteLink.value || 'Website Link';
    link.style.display = websiteLink.value ? 'block' : 'none';
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
    const recipientName = document.getElementById('recipientName').value || '[Recipient Name]';
    previewTitle.textContent = `${prefix} ${recipientName}`;
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
const publishButton = document.getElementById('publishButton');
publishButton.addEventListener('click', () => {
    if (!causeName.value) {
        alert('Please enter a cause name');
        return;
    }

    if (!imagePreview.src.includes('data:image/svg+xml')) {
        alert('Please upload an image');
        return;
    }

    // Here you would typically send the data to your server
    alert('Page published successfully!');
    // window.location.href = 'success.html'; // Uncomment this line when you have a success page
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
    if (e.target !== checkbox) { // Evita duplo toggle quando clica diretamente no checkbox
        checkbox.checked = !checkbox.checked;
        // Dispara o evento change para manter a lógica existente
        checkbox.dispatchEvent(new Event('change'));
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Debug log to confirm elements are found
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const usernameInput = document.getElementById('username');
    const usernameContainer = document.querySelector('.username-container');
    const usernameValidation = document.querySelector('.username-validation');
    const nextButton = document.querySelector('.next-button');

    console.log('Elements found:', {
        step1: !!step1,
        step2: !!step2,
        usernameInput: !!usernameInput,
        usernameContainer: !!usernameContainer,
        usernameValidation: !!usernameValidation,
        nextButton: !!nextButton
    });

    // Simulated database of registered usernames
    const registeredUsernames = ['john_doe', 'jane_smith', 'test_user'];

    // Username validation pattern
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

    function showUsernameError(message) {
        usernameValidation.textContent = message;
        usernameValidation.style.color = '#ff4444';
        usernameContainer.classList.add('error');
        usernameContainer.classList.remove('success');
    }

    function showUsernameSuccess(message) {
        usernameValidation.textContent = message;
        usernameValidation.style.color = '#4CAF50';
        usernameContainer.classList.add('success');
        usernameContainer.classList.remove('error');
    }

    // Email validation
    const emailInput = document.getElementById('email');
    const emailContainer = document.querySelector('.email-container');
    const emailValidation = document.querySelector('.email-validation');
    const recaptchaContainer = document.querySelector('.recaptcha-container');
    const recaptchaCheckbox = document.getElementById('recaptcha');
    const continueButton = document.querySelector('.continue-button');

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const registeredEmails = ['test@example.com', 'user@domain.com'];

    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (email === '') {
            emailValidation.textContent = 'Email is required';
            emailValidation.style.color = '#ff4444';
            emailContainer.classList.add('error');
            emailContainer.classList.remove('success');
            recaptchaContainer.style.display = 'none';
            return false;
        }

        if (!emailPattern.test(email)) {
            emailValidation.textContent = 'Please enter a valid email address';
            emailValidation.style.color = '#ff4444';
            emailContainer.classList.add('error');
            emailContainer.classList.remove('success');
            recaptchaContainer.style.display = 'none';
            return false;
        }

        if (registeredEmails.includes(email)) {
            emailValidation.textContent = 'This email is already registered';
            emailValidation.style.color = '#ff4444';
            emailContainer.classList.add('error');
            emailContainer.classList.remove('success');
            recaptchaContainer.style.display = 'none';
            return false;
        }

        emailValidation.textContent = 'Email is valid';
        emailValidation.style.color = '#4CAF50';
        emailContainer.classList.add('success');
        emailContainer.classList.remove('error');
        recaptchaContainer.style.display = 'block';
        return true;
    }

    // Password validation
    const passwordInput = document.getElementById('password');
    const passwordContainer = document.querySelector('.password-container');
    const passwordValidation = document.querySelector('.password-validation');
    const showPasswordToggle = document.querySelector('.show-password-toggle');

    function validatePassword() {
        const password = passwordInput.value;
        
        if (password.length < 8) {
            passwordValidation.textContent = 'Password must be at least 8 characters long';
            passwordValidation.style.color = '#ff4444';
            passwordContainer.classList.add('error');
            passwordContainer.classList.remove('success');
            return false;
        }

        passwordValidation.textContent = 'Password is valid';
        passwordValidation.style.color = '#4CAF50';
        passwordContainer.classList.add('success');
        passwordContainer.classList.remove('error');
        return true;
    }

    // Event listeners
    if (usernameInput) {
        usernameInput.addEventListener('input', function() {
            const username = this.value.trim();
            
            if (username === '') {
                showUsernameError('Username is required');
                nextButton.disabled = true;
                return;
            }

            if (!usernamePattern.test(username)) {
                showUsernameError('Username must be 3-20 characters and can only contain letters, numbers, and underscores');
                nextButton.disabled = true;
                return;
            }

            if (registeredUsernames.includes(username)) {
                showUsernameError('This username is already taken');
                nextButton.disabled = true;
                return;
            }

            showUsernameSuccess('Username is available');
            nextButton.disabled = false;
        });

        usernameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !nextButton.disabled) {
                nextButton.click();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            console.log('Next button clicked');
            if (step1 && step2) {
                step1.classList.remove('active');
                step2.classList.add('active');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !continueButton.disabled) {
                continueButton.click();
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            const isPasswordValid = validatePassword();
            const isEmailValid = validateEmail();
            const isRecaptchaChecked = recaptchaCheckbox.checked;
            
            continueButton.disabled = !(isPasswordValid && isEmailValid && isRecaptchaChecked);
        });
    }

    if (showPasswordToggle) {
        showPasswordToggle.addEventListener('click', function() {
            const type = passwordInput.type === 'password' ? 'text' : 'password';
            passwordInput.type = type;
            this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
        });
    }

    if (recaptchaCheckbox) {
        recaptchaCheckbox.addEventListener('change', function() {
            const isPasswordValid = validatePassword();
            const isEmailValid = validateEmail();
            
            continueButton.disabled = !(isPasswordValid && isEmailValid && this.checked);
        });
    }

    // Initialize button states
    if (nextButton) {
        nextButton.disabled = true;
    }
    if (continueButton) {
        continueButton.disabled = true;
    }
});

// Custom Select Dropdown Implementation
function initializeCustomSelect() {
    const selectContainer = document.querySelector('.custom-select-container');
    const select = document.querySelector('.title-prefix-select');
    const customOptions = document.createElement('div');
    customOptions.className = 'custom-select-options';
    
    // Create custom options
    const options = Array.from(select.options).map(option => ({
        value: option.value,
        text: option.text
    }));

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'custom-select-option';
        optionElement.textContent = option.text;
        
        if (option.value === select.value) {
            optionElement.classList.add('selected');
        }
        
        optionElement.addEventListener('click', () => {
            // Update select value
            select.value = option.value;
            
            // Update selected option styling
            customOptions.querySelectorAll('.custom-select-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            optionElement.classList.add('selected');
            
            // Handle custom option
            if (option.value === 'custom') {
                customTitlePrefix.style.display = 'block';
                updatePreviewTitle(customTitlePrefix.value || 'Donate to');
            } else {
                customTitlePrefix.style.display = 'none';
                updatePreviewTitle(option.value);
            }
            
            // Close dropdown
            selectContainer.classList.remove('open');
        });
        
        customOptions.appendChild(optionElement);
    });
    
    selectContainer.appendChild(customOptions);
    
    // Toggle dropdown
    select.addEventListener('click', (e) => {
        e.stopPropagation();
        selectContainer.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!selectContainer.contains(e.target)) {
            selectContainer.classList.remove('open');
        }
    });
}

// Initialize custom select when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCustomSelect);
} else {
    initializeCustomSelect();
}

// Title prefix functionality
document.addEventListener('DOMContentLoaded', function() {
    const titlePrefix = document.getElementById('titlePrefix');
    const customTitlePrefix = document.getElementById('customTitlePrefix');

    if (titlePrefix && customTitlePrefix) {
        // Hide custom input initially
        customTitlePrefix.style.display = 'none';

        // Handle select change
        titlePrefix.addEventListener('change', function() {
            if (this.value === 'custom') {
                customTitlePrefix.style.display = 'block';
                updatePreviewTitle(customTitlePrefix.value || 'Donate to');
            } else {
                customTitlePrefix.style.display = 'none';
                updatePreviewTitle(this.value);
            }
        });

        // Handle custom input changes
        customTitlePrefix.addEventListener('input', function() {
            if (titlePrefix.value === 'custom') {
                updatePreviewTitle(this.value || 'Donate to');
            }
        });
    }
});

function updatePreviewTitle(prefix) {
    const causeName = document.getElementById('causeName')?.value || 'Cause Name';
    const previewMainTitle = document.getElementById('previewMainTitle');
    if (previewMainTitle) {
        previewMainTitle.innerHTML = `${prefix} <span id="previewCauseNameRight">${causeName}</span>`;
    }
} 