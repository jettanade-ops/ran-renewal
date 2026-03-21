window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
        nav.classList.remove('glass-panel');
    } else {
        nav.classList.remove('nav-scrolled');
        nav.classList.add('glass-panel');
    }
});

function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // Create 40 floating particles
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Randomize size between 1.5px and 4px
        const size = Math.random() * 2.5 + 1.5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Randomize horizontal start position (0% - 100%)
        const left = Math.random() * 100;
        particle.style.left = `${left}%`;
        
        // Randomize animation duration between 8s and 20s
        const duration = Math.random() * 12 + 8;
        particle.style.animationDuration = `${duration}s`;
        
        // Randomize animation delay between 0s and 10s
        const delay = Math.random() * 10;
        particle.style.animationDelay = `${delay}s`;
        
        // Randomize color: either gold or white with respective glow
        if (Math.random() > 0.4) {
            particle.style.backgroundColor = '#FACC15';
            particle.style.boxShadow = '0 0 6px 1px rgba(250, 204, 21, 0.5)';
        } else {
            particle.style.backgroundColor = '#FFFFFF';
            particle.style.boxShadow = '0 0 4px 1px rgba(255, 255, 255, 0.3)';
        }
        
        container.appendChild(particle);
    }
}

// Initialize particles when the DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}

let isScrollingFromNav = false;

function updateActiveNavLink() {
    const links = document.querySelectorAll('.nav-link');
    const path = window.location.pathname;
    
    // If on download page
    if (path.includes('download.html')) {
        links.forEach(l => {
            if (l && l.getAttribute('href') && l.getAttribute('href').includes('download.html')) {
                l.classList.add('active');
            } else if (l) {
                l.classList.remove('active');
            }
        });
        return; 
    }
    
    // Skip scroll spy updates if we are actively scrolling to a clicked nav link
    if (isScrollingFromNav) {
        return;
    }
    
    // If on index page, track scroll
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';
    
    if (window.scrollY > 300) {
        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            if (window.scrollY >= (sectionTop - window.innerHeight / 3)) {
                currentSection = sec.getAttribute('id');
            }
        });
    }

    links.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentSection === 'home' && (href === '#' || href === 'index.html' || href === 'index.html#')) {
            link.classList.add('active');
        } else if (currentSection && currentSection !== 'home' && href && href.includes(`#${currentSection}`)) {
            link.classList.add('active');
        }
    });
}

function initNavClickListener() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && (href.startsWith('#') || href.includes('index.html#'))) {
                // Instantly update UI and block scroll spy
                isScrollingFromNav = true;
                
                links.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Replay the hero animation if clicking back to Home
                if (href === '#' || href.endsWith('index.html#')) {
                    const reveals = document.querySelectorAll('.animate-premium-reveal');
                    reveals.forEach(el => {
                        el.style.animation = 'none';
                        el.style.opacity = '0'; // Hide while scrolling
                    });
                    
                    // Wait for smooth scroll to nearly finish before flowering the text
                    setTimeout(() => {
                        reveals.forEach(el => {
                            void el.offsetWidth; // Force Reflow
                            el.style.animation = '';
                            el.style.opacity = '';
                        });
                    }, 500); 
                }
                
                // Unblock scroll spy after smooth scroll finishes (roughly 800ms)
                setTimeout(() => {
                    isScrollingFromNav = false;
                }, 800);
            }
        });
    });
}

window.addEventListener('scroll', updateActiveNavLink);

window.addEventListener('load', () => {
    initNavClickListener();
    
    // If the page loads with a hash (e.g. from download.html to index.html#events), 
    // the browser will auto-smooth-scroll down. Block scroll spy to prevent flash bugs.
    if (window.location.hash && (window.location.pathname === '/' || window.location.pathname.includes('index.html'))) {
        isScrollingFromNav = true;
        
        const links = document.querySelectorAll('.nav-link');
        links.forEach(l => {
            l.classList.remove('active');
            const href = l.getAttribute('href');
            if (href && (href === window.location.hash || href.includes(window.location.hash))) {
                l.classList.add('active');
            }
        });
        
        setTimeout(() => {
            isScrollingFromNav = false;
        }, 1000);
    } else {
        updateActiveNavLink();
    }
});

// Initial validation if page is loaded instantly without hash
if (!window.location.hash) {
    updateActiveNavLink();
}

// Mask the transparent navbar during page unloads to hide background rendering glitches
window.addEventListener('beforeunload', () => {
    const nav = document.getElementById('navbar');
    if (nav) {
        nav.classList.add('nav-scrolled');
        nav.classList.remove('glass-panel');
    }
});
