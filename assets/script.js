document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu
    const menuIcon = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('nav ul');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Copyright Year
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current).toLocaleString('en-IN');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toLocaleString('en-IN');
                            if (target === 10000) counter.innerText = "10k"; 
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
});

// 5. Preloader
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.style.display = 'none';
    }, 500);
});

// Failsafe: Remove preloader if load event takes too long
setTimeout(() => {
    document.body.classList.add('loaded');
    const preloader = document.getElementById('preloader');
    if (preloader) preloader.style.display = 'none';
}, 3000);
// 6. Image Skeleton Loader
document.querySelectorAll('.product-img-wrapper.loading img').forEach(img => {
    if (img.complete) {
        img.parentElement.classList.remove('loading');
    } else {
        img.addEventListener('load', () => {
            img.parentElement.classList.remove('loading');
        });
    }
});



// 7. Newsletter Form Handling
document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const existingMsg = form.querySelector('.success-msg');
        if (existingMsg) existingMsg.remove();
        const msg = document.createElement('div');
        msg.className = 'success-msg';
        msg.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Our newsletter is launching soon.';
        form.appendChild(msg);
        form.reset();
        setTimeout(() => msg.remove(), 5000);
    });
});