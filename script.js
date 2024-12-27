// Enhanced JavaScript for Epic Quest Adventure Website

// Utility function for element selection
const selectElement = (selector) => document.querySelector(selector);
const selectAllElements = (selector) => document.querySelectorAll(selector);

// Smooth scrolling for navigation links
selectAllElements('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetElement = selectElement(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Sticky header with shadow effect
window.addEventListener('scroll', () => {
    const header = selectElement('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky', 'shadow');
    } else {
        header.classList.remove('sticky', 'shadow');
    }
});

// Modal functionality for gallery images
selectAllElements('.media-gallery img').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${image.src}" alt="Gallery Image">
                <span class="close-btn">&times;</span>
            </div>
        `;
        document.body.appendChild(modal);

        const closeModal = () => document.body.removeChild(modal);
        modal.querySelector('.close-btn').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    });
});

// Contact form validation with feedback
const contactForm = selectElement('form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
        const errorMessage = selectElement('.form-error');

        if (!name || !email || !message) {
            e.preventDefault();
            errorMessage.textContent = 'All fields are required.';
            errorMessage.style.display = 'block';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            e.preventDefault();
            errorMessage.textContent = 'Please enter a valid email address.';
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            alert('Thank you for your message! We will respond shortly.');
        }
    });
}

// Dynamic footer year update
const footerYear = selectElement('footer .year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// Tab navigation with animated transitions
selectAllElements('.main-nav ul li a').forEach(tab => {
    tab.addEventListener('click', function (e) {
        e.preventDefault();

        selectAllElements('.main-nav ul li a.active').forEach(activeTab => {
            activeTab.classList.remove('active');
        });
        this.classList.add('active');

        selectAllElements('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                section.style.display = 'none';
            }, 500);
        });

        const targetSection = selectElement(this.getAttribute('href'));
        if (targetSection) {
            setTimeout(() => {
                targetSection.style.display = 'block';
                targetSection.style.opacity = '1';
            }, 500);
        }
    });
});

// Default section visibility
selectAllElements('section').forEach((section, index) => {
    section.style.display = index === 0 ? 'block' : 'none';
    section.style.opacity = index === 0 ? '1' : '0';
});

// Enhanced features: Dark mode toggle
const darkModeToggle = selectElement('#dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });
}

// Animation for section entry
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
        }
    });
}, {
    threshold: 0.1
});

selectAllElements('section').forEach(section => {
    section.classList.add('animate-hidden');
    observer.observe(section);
});
