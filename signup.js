document.addEventListener('DOMContentLoaded', function() {
    alert('Page loaded'); // Debug alert 1
    
    const userTypeButtons = document.querySelectorAll('.user-type');
    const studentFields = document.getElementById('student-fields');
    const companyFields = document.getElementById('company-fields');
    const signupForm = document.getElementById('signup-form');
    
    let currentUserType = 'student';

    // Handle user type selection
    userTypeButtons.forEach(button => {
        button.addEventListener('click', () => {
            alert('User type button clicked: ' + button.dataset.type); // Debug alert 2
            userTypeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentUserType = button.dataset.type;
            
            if (currentUserType === 'student') {
                studentFields.style.display = 'block';
                companyFields.style.display = 'none';
            } else {
                studentFields.style.display = 'none';
                companyFields.style.display = 'block';
            }

            signupForm.reset();
            clearErrors();
        });
    });

    // Handle form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted'); // Debug alert 3
            clearErrors();

            try {
                if (validateForm()) {
                    alert('Form validation passed'); // Debug alert 4
                    
                    const userData = {
                        type: currentUserType,
                        email: document.getElementById('email').value,
                        password: document.getElementById('password').value,
                        username: document.getElementById('username').value
                    };

                    if (currentUserType === 'student') {
                        userData.dob = document.getElementById('dob').value;
                        userData.gender = document.getElementById('gender').value;
                        userData.school = document.getElementById('school').value;
                    } else {
                        userData.companyName = document.getElementById('company-name').value;
                        userData.contact = document.getElementById('contact').value;
                    }

                    alert('User data created: ' + JSON.stringify(userData)); // Debug alert 5

                    // Get existing users or initialize empty array
                    const users = JSON.parse(localStorage.getItem('users') || '[]');

                    // Check if email already exists
                    if (users.some(user => user.email === userData.email)) {
                        alert('Email already exists'); // Debug alert 6
                        showError('email', 'This email is already registered');
                        return;
                    }

                    // Add new user
                    users.push(userData);
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('User saved to localStorage'); // Debug alert 7

                    // Set current user
                    localStorage.setItem('currentUser', JSON.stringify(userData));
                    alert('Current user set'); // Debug alert 8

                    // Redirect to dashboard
                    const dashboardUrl = `dashboards/${currentUserType}.html`;
                    alert('Redirecting to: ' + dashboardUrl); // Debug alert 9
                    window.location.href = dashboardUrl;
                } else {
                    alert('Form validation failed'); // Debug alert 10
                }
            } catch (error) {
                alert('Error occurred: ' + error.message); // Debug alert 11
                console.error('Error during signup:', error);
                showError('general', 'An error occurred during signup');
            }
        });
    } else {
        alert('Signup form not found!'); // Debug alert 12
    }
});

function validateForm() {
    let isValid = true;

    // Validate common fields
    if (!validateField('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address')) isValid = false;
    if (!validateField('password', /.{6,}/, 'Password must be at least 6 characters long')) isValid = false;
    if (!validateField('username', /.{3,}/, 'Username must be at least 3 characters long')) isValid = false;

    const currentUserType = document.querySelector('.user-type.active').dataset.type;

    // Validate type-specific fields
    if (currentUserType === 'student') {
        if (!validateField('dob', /^\d{4}-\d{2}-\d{2}$/, 'Please select your date of birth')) isValid = false;
        if (!validateField('gender', /.+/, 'Please select your gender')) isValid = false;
        if (!validateField('school', /.+/, 'Please enter your school name')) isValid = false;
    } else {
        if (!validateField('company-name', /.+/, 'Please enter company name')) isValid = false;
        if (!validateField('contact', /^\+?[\d\s-]{10,}$/, 'Please enter a valid contact number')) isValid = false;
    }

    return isValid;
}

function validateField(fieldId, regex, errorMessage) {
    const field = document.getElementById(fieldId);
    const value = field.value.trim();

    if (!regex.test(value)) {
        showError(fieldId, errorMessage);
        return false;
    }
    return true;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    const field = document.getElementById(fieldId);
    
    if (errorElement && field) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.parentElement.classList.add('error');
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