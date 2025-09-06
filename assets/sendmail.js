// Enhanced Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            // Validate form data
            const validation = validateForm(formData);
            
            if (!validation.isValid) {
                showFormStatus('error', validation.message);
                return;
            }
            
            // Show loading state
            showFormStatus('info', 'Sending message...');
            
            // Simulate form submission (in a real implementation, you'd send to a server)
            setTimeout(() => {
                // For now, we'll use the mailto approach but with better formatting
                const mailtoLink = composeMailtoLink(formData);
                
                // Show success message
                showFormStatus('success', 'Message prepared! Opening your email client...');
                
                // Open email client after a short delay
                setTimeout(() => {
                    // Try to open the email client
                    try {
                        window.location.href = mailtoLink;
                        console.log('Attempting to open email client...'); // Debug log
                    } catch (error) {
                        console.error('Error opening email client:', error);
                        showFormStatus('error', 'Error opening email client. Please try again.');
                    }
                }, 1500);
                
                // Reset form after successful submission
                setTimeout(() => {
                    contactForm.reset();
                    hideFormStatus();
                }, 3000);
                
            }, 1000);
        });
        
        // Add real-time validation
        addRealTimeValidation();
    }
    
    // Form validation function
    function validateForm(data) {
        if (!data.name) {
            return { isValid: false, message: 'Please enter your name.' };
        }
        
        if (!data.email) {
            return { isValid: false, message: 'Please enter your email address.' };
        }
        
        if (!isValidEmail(data.email)) {
            return { isValid: false, message: 'Please enter a valid email address.' };
        }
        
        if (!data.subject) {
            return { isValid: false, message: 'Please enter a subject.' };
        }
        
        if (!data.message) {
            return { isValid: false, message: 'Please enter your message.' };
        }
        
        if (data.message.length < 10) {
            return { isValid: false, message: 'Message must be at least 10 characters long.' };
        }
        
        return { isValid: true, message: '' };
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Compose mailto link with better formatting
    function composeMailtoLink(data) {
        const emailBody = `Hello Tiny Teacup,\n\nI'm reaching out regarding: ${data.subject}\n\n${data.message}\n\nBest regards,\n${data.name}\n${data.email}`;
        
        const mailtoLink = `mailto:tinyteacup.studio@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(emailBody)}`;
        console.log('Generated mailto link:', mailtoLink); // Debug log
        return mailtoLink;
    }
    
    // Show form status message
    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        // Scroll to form status if it's not visible
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // Hide form status
    function hideFormStatus() {
        formStatus.style.display = 'none';
    }
    
    // Add real-time validation
    function addRealTimeValidation() {
        const inputs = contactForm.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
    
    // Validate individual field
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        clearFieldError(field);
        
        if (!value) {
            showFieldError(field, `${getFieldLabel(fieldName)} is required.`);
            return false;
        }
        
        if (fieldName === 'email' && !isValidEmail(value)) {
            showFieldError(field, 'Please enter a valid email address.');
            return false;
        }
        
        if (fieldName === 'message' && value.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long.');
            return false;
        }
        
        return true;
    }
    
    // Show field error
    function showFieldError(field, message) {
        field.style.borderBottomColor = '#ff6b6b';
        field.style.boxShadow = 'inset 0 -1px 0 0 #ff6b6b';
        
        // Create error message element
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }
    
    // Clear field error
    function clearFieldError(field) {
        field.style.borderBottomColor = 'var(--color-border-dark)';
        field.style.boxShadow = 'none';
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }
    
    // Get human-readable field label
    function getFieldLabel(fieldName) {
        const labels = {
            name: 'Name',
            email: 'Email',
            subject: 'Subject',
            message: 'Message'
        };
        
        return labels[fieldName] || fieldName;
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add scroll reveal effect for sections
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});