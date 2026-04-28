// ===== TYPING ANIMATION =====
const typingTexts = [
    "Software Engineering Student",
    "Java Developer",
    "Spring Boot Developer",
    "Full Stack Developer",
    "Looking for Internship 🚀"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.querySelector('.hero-title');

function typeAnimation() {
    const currentText = typingTexts[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeAnimation, 2000);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeAnimation, speed);
}

// Start typing animation
typeAnimation();

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(
    '.skill-card, .project-card, .stat-box, .contact-info-item'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.classList.add('hidden');
    revealObserver.observe(el);
});

// ===== SKILL BAR ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
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
if (skillsSection) skillObserver.observe(skillsSection);

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(108, 99, 255, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = 'none';
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

// ===== CONTACT FORM =====
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

// ===== COUNTER ANIMATION =====
function animateCounter(element, target, suffix = '') {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 30);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statBoxes = entry.target.querySelectorAll('.stat-box h3');
            statBoxes.forEach(box => {
                const text = box.textContent;
                if (text.includes('3')) animateCounter(box, 3, '+');
                if (text.includes('100')) animateCounter(box, 100, '+');
                if (text.includes('4')) animateCounter(box, 4, '+');
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);
