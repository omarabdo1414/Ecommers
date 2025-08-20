// Password toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const userName = document.getElementById('userName').value.trim();
            const password = document.getElementById('password').value.trim();
            
            // Basic validation
            if (!userName || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Add loading state to button
            const submitButton = document.getElementById('signIn');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            submitButton.disabled = true;
            
            // Simulate login process (replace with your actual login logic)
            setTimeout(() => {
                // Your existing login logic here
                const userName = document.getElementById('userName').value;
                const password = document.getElementById('password').value;
                
                // Get stored users
                const users = JSON.parse(localStorage.getItem('users')) || [];
                
                // Find user
                const user = users.find(u => u.userName === userName && u.password === password);
                
                if (user) {
                    // Store current user
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    showNotification('Login successful!', 'success');
                    
                    // Redirect to home page after a short delay
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                } else {
                    showNotification('Invalid username or password', 'error');
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }
            }, 1500);
        });
    }
});

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



