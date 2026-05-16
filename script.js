// Smooth scrolling and nav
document.querySelectorAll('.nav-dot, .cta').forEach(dot => {
    dot.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.currentTarget.dataset.section || 4;
        const target = section === '4' ? document.getElementById('contact') : document.querySelector(`.section:nth-of-type(${parseInt(section) + 1})`);
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active nav dot
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const scrollPos = window.scrollY + window.innerHeight / 2;
    
    sections.forEach((section, index) => {
        if (section.offsetTop < scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
            document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
            document.querySelector(`[data-section="${index}"]`).classList.add('active');
        }
    });
    
// Progress bar & 3D transforms
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    document.querySelector('.progress').style.width = progress + '%';
    
    // 3D scroll effects
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const scrollProgress = (window.scrollY - rect.top + window.innerHeight / 2) / window.innerHeight;
        const rotateX = (scrollProgress - 0.5) * -10;
        const rotateY = (index % 2 === 0 ? 1 : -1) * (scrollProgress - 0.5) * 5;
        const scale = 1 + Math.abs(scrollProgress - 0.5) * 0.1;
        section.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale}) translateZ(0)`;
    });
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
    localStorage.setItem('theme', newTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '🌙' : '☀️';

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('h2, .project-card').forEach(el => {
                el.classList.add('animate');
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Mouse tilt for hero
document.addEventListener('mousemove', (e) => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const rect = heroContent.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (y / rect.height) * 15;
        const rotateY = (x / rect.width) * 15;
        heroContent.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(50px)`;
    }
});

// Mobile menu or additional features can be added here

