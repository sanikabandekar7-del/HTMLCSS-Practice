function validateForm() {
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
// Email validation (basic safe pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address (example: name@example.com).");
        return false;
    }

    // Phone validation (exactly 10 numeric digits)
    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Phone number must be exactly 10 digits.");
        return false;
    }

    // Password minimum length
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // Confirm password
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    // All validations passed — show success and reset
    document.getElementById("successMsg").style.display = "block";

    setTimeout(() => {
        document.getElementById("successMsg").style.display = "none";
        document.getElementById("regForm").reset();
    }, 2500);

    // Keep return false to prevent actual submission to a server.
    // Change to `return true;` if you want the form to submit to an action URL.
    return false;
}