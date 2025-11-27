// script.js
// Smooth scrolling and section switching
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

// Navbar active link handling
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        
        // Remove active class from all sections and nav links
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        
        // Add active class to target section and current link
        document.getElementById(targetId).classList.add('active');
        this.classList.add('active');
    });
});

// Registration form handling
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Simulate registration success
    alert(Welcome to MusicHub, ${name}! Your account has been created successfully.);
    this.reset();
});

// Horizontal scroll on hover
document.querySelectorAll('.horizontal-scroll').forEach(scrollContainer => {
    scrollContainer.addEventListener('wheel', (e) => {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
    });
});

// Smooth hover animations for cards
document.querySelectorAll('.instrument-card, .music-genre, .course-category').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.05)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Auto-scroll horizontal containers
function autoScroll() {
    document.querySelectorAll('.horizontal-scroll').forEach(container => {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
        }
    });
}

setInterval(autoScroll, 50);

// Initialize first section as active
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('home').classList.add('active');
});