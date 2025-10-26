// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll event listener for navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.backgroundColor = '#fff';
    }
});

// Contact Form Validation
function validateForm(event) {
    event.preventDefault();
    let isValid = true;
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(error => {
        error.style.display = 'none';
    });

    // Validate Name
    const name = document.getElementById('name');
    if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate Subject
    const subject = document.getElementById('subject');
    if (subject.value.trim().length < 3) {
        showError(subject, 'Subject must be at least 3 characters long');
        isValid = false;
    }

    // Validate Message
    const message = document.getElementById('message');
    if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you within 24 hours.');
        event.target.reset();
    }

    return false;
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Character counter for message
document.getElementById('message').addEventListener('input', function(e) {
    const maxLength = 500;
    const currentLength = e.target.value.length;
    const counterElement = e.target.parentElement.querySelector('.character-count');
    counterElement.textContent = `${currentLength}/${maxLength} characters`;
    
    if (currentLength > maxLength) {
        e.target.value = e.target.value.slice(0, maxLength);
        counterElement.style.color = '#e74c3c';
    } else {
        counterElement.style.color = '#666';
    }
});

// Add animation to timeline items
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-in-out';
    observer.observe(item);
});
