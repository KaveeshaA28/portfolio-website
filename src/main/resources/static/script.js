// ===== CONTACT FORM — calls Spring Boot API =====
document.getElementById('contactForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const btn = document.getElementById('sendBtn');
    const response = document.getElementById('formResponse');

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        response.className = 'form-response success';
        response.textContent = '✅ ' + result.message;
        document.getElementById('contactForm').reset();

    } catch (error) {
        response.className = 'form-response error';
        response.textContent = '❌ Something went wrong. Please try again.';
    }

    btn.textContent = '📨 Send Message';
    btn.disabled = false;
});

// ===== SKILL BAR ANIMATION =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-fill');
            fills.forEach(fill => {
                fill.style.width = fill.getAttribute('data-width');
            });
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) observer.observe(skillsSection);

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = '#6c63ff';
        }
    });
});
