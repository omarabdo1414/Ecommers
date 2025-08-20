// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Toggle confirm password visibility
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Password strength checker
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }

    // Password confirmation checker
    if (confirmPasswordInput && passwordInput) {
        confirmPasswordInput.addEventListener('input', function() {
            checkPasswordMatch(passwordInput.value, this.value);
        });
    }

    // Form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            // Validation
            if (!userName || !email || !password || !confirmPassword) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (password.length < 6) {
                showNotification('Password must be at least 6 characters long', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (!agreeTerms) {
                showNotification('Please agree to the Terms & Conditions', 'error');
                return;
            }
            
            // Add loading state to button
            const submitButton = document.getElementById('signUP');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Account...';
            submitButton.disabled = true;
            
            // Simulate registration process
            setTimeout(() => {
                // Your existing registration logic here
                const userName = document.getElementById('userName').value;
                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;
                
                // Get existing users
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Check if user already exists
                const existingUser = users.find(u => u.userName === userName || u.email === email);
                
                if (existingUser) {
                    showNotification('Username or email already exists', 'error');
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                } else {
                    // Add new user
                    const newUser = {
                        userName: userName,
                        email: email,
                        password: password
                    };
                    
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    
                    showNotification('Account created successfully!', 'success');
                    
                    // Redirect to login page after a short delay
                    setTimeout(() => {
                        window.location.href = 'login.html';
                    }, 1500);
                }
            }, 1500);
        });
    }
});

// Password strength checker
function checkPasswordStrength(password) {
    let strength = 0;
    let feedback = '';
    
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // Remove existing strength indicator
    const existingIndicator = document.querySelector('.password-strength');
    if (existingIndicator) {
        existingIndicator.remove();
    }
    
    // Create strength indicator
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    
    const strengthBar = document.createElement('div');
    strengthBar.className = 'password-strength-bar';
    
    if (strength <= 2) {
        strengthBar.classList.add('weak');
        feedback = 'Weak password';
    } else if (strength <= 4) {
        strengthBar.classList.add('medium');
        feedback = 'Medium strength password';
    } else {
        strengthBar.classList.add('strong');
        feedback = 'Strong password';
    }
    
    strengthIndicator.appendChild(strengthBar);
    
    // Add feedback text
    const feedbackText = document.createElement('div');
    feedbackText.style.cssText = `
        font-size: 12px;
        color: #666;
        margin-top: 5px;
        font-family: 'Poppins', sans-serif;
    `;
    feedbackText.textContent = feedback;
    strengthIndicator.appendChild(feedbackText);
    
    // Insert after password input
    const passwordInput = document.getElementById('password');
    if (passwordInput && passwordInput.parentElement) {
        passwordInput.parentElement.parentElement.appendChild(strengthIndicator);
    }
}

// Password match checker
function checkPasswordMatch(password, confirmPassword) {
    const confirmInput = document.getElementById('confirmPassword');
    const inputGroup = confirmInput.parentElement;
    
    if (confirmPassword && password !== confirmPassword) {
        inputGroup.style.borderColor = '#ff4757';
        inputGroup.style.boxShadow = '0 0 0 3px rgba(255, 71, 87, 0.1)';
    } else if (confirmPassword && password === confirmPassword) {
        inputGroup.style.borderColor = '#2ed573';
        inputGroup.style.boxShadow = '0 0 0 3px rgba(46, 213, 115, 0.1)';
    } else {
        inputGroup.style.borderColor = 'transparent';
        inputGroup.style.boxShadow = 'none';
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#2ed573';
        case 'error': return '#ff4757';
        case 'warning': return '#ffa502';
        default: return '#667eea';
    }
}

// Input focus effects
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add focused class if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
});