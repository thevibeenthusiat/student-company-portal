document.addEventListener('DOMContentLoaded', function() {
    // User type selection
    const userTypeButtons = document.querySelectorAll('.user-type');
    let current_user_type = 'student';

    userTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            current_user_type = button.dataset.type;
        });
    });

    // Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // For now, accept any credentials as mentioned in requirements
            if (email && password) {
                // Store user type in session storage
                sessionStorage.setItem('user_type', current_user_type);
                sessionStorage.setItem('user_email', email);

                // Redirect to appropriate dashboard
                window.location.href = `dashboards/${current_user_type}.html`;
            }
        });
    }
}); 