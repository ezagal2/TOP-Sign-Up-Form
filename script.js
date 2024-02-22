document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const inputs = document.querySelectorAll('input');
    const passwordInput = document.getElementById('password'); // Make sure this matches your password input's ID
    const confirmPasswordInput = document.getElementById('password-confirmation'); // And this matches your confirm password input's ID

    // Function to check if passwords match
    function passwordsMatch() {
        return passwordInput.value === confirmPasswordInput.value;
    }

    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            const fieldset = this.closest('fieldset');
            fieldset.classList.add('focused');
            fieldset.classList.remove('blurred', 'invalid');
        });

        input.addEventListener('blur', function() {
            const fieldset = this.closest('fieldset');
            fieldset.classList.remove('focused');
            // Check validity and if passwords match
            if (!this.checkValidity() || (this === confirmPasswordInput && !passwordsMatch())) {
                fieldset.classList.add('invalid');
                fieldset.classList.remove('blurred');
                // If passwords don't match, specifically mark confirm password as invalid
                if (this === confirmPasswordInput && !passwordsMatch()) {
                    confirmPasswordInput.setCustomValidity("Passwords do not match.");
                } else {
                    this.setCustomValidity(""); // Ensure to clear custom validity
                }
            } else {
                fieldset.classList.add('blurred');
                this.setCustomValidity(""); // Clear custom validity when valid
            }
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Additional check for password match on submit
        if (!passwordsMatch()) {
            const fieldset = confirmPasswordInput.closest('fieldset');
            fieldset.classList.remove('focused', 'blurred');
            fieldset.classList.add('invalid');
            confirmPasswordInput.setCustomValidity("Passwords do not match.");
        }

        let isFormValid = form.checkValidity(); // This now includes custom validation

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                const fieldset = input.closest('fieldset');
                fieldset.classList.remove('focused', 'blurred');
                fieldset.classList.add('invalid');
            }
        });

        if (isFormValid) {
            console.log('Form is valid. Proceed with submission or further actions.');
            form.submit(); 
        } else {
            console.log('Form is invalid. Please correct the errors.');
            // Reset the custom validity to allow re-checking
            confirmPasswordInput.setCustomValidity("");
        }
    });
});
