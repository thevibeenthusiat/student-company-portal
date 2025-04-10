document.addEventListener('DOMContentLoaded', function() {
    // User type selection
    const userTypeButtons = document.querySelectorAll('.user-type');
    let currentUserType = 'student';

    userTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentUserType = button.dataset.type;
            clearErrors();
        });
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Get stored users
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            
            // Find matching user
            const user = users.find(u => 
                u.email === email && 
                u.password === password && 
                u.type === currentUserType
            );

            if (user) {
                // Store current user session
                localStorage.setItem('currentUser', JSON.stringify(user));
                
                // Redirect to appropriate dashboard
                window.location.href = `dashboards/${currentUserType}.html`;
            } else {
                // Show error message
                showError('login', 'Invalid email or password');
            }
        });
    }
});

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
} 