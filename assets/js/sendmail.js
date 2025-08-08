document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const subject = encodeURIComponent(document.getElementById('subject').value);
    const message = encodeURIComponent(document.getElementById('message').value);;

    // Compose mailto link with subject and body
    const mailtoLink = `mailto:henrikhaa14@gmail.com?subject=${subject}&body=${message}`;

    // Open user's mail client
    window.location.href = mailtoLink;
});