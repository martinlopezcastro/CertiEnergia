// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const mobileMenu = document.getElementById('mobile-menu');
        
        // Define un pequeño offset para el margen superior al hacer scroll
        // Puedes ajustar este valor (en píxeles) según sea necesario
        const scrollOffset = 80; // Aproximadamente 1 cm en muchos dispositivos, ajusta si es necesario

        // Close mobile menu if open
        if (mobileMenu.classList.contains('mobile-menu-open')) {
            mobileMenu.classList.remove('mobile-menu-open');
            mobileMenu.classList.add('mobile-menu-closed');
            // Optional: Toggle aria-expanded for accessibility
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            if (mobileMenuButton) {
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        }

        if (targetElement) {
            // Wait for the menu transition to complete before scrolling
            // This is a common workaround for issues with scroll-behavior: smooth and dynamic heights
            setTimeout(() => {
                // Calculate the target scroll position, subtracting the offset
                const targetPosition = targetElement.offsetTop - scrollOffset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500); // Adjust delay if needed, based on your CSS transition duration
        }
    });
});

// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('mobile-menu-closed');
    mobileMenu.classList.toggle('mobile-menu-open');
    // Optional: Toggle aria-expanded for accessibility
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
});

// Scroll to Top Button functionality
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

// When the user clicks on the button, scroll to the top of the document
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Optional: Typewriter effect for Hero section title
// const heroTitle = document.querySelector('#inicio h1');
// if (heroTitle) {
//     const text = heroTitle.textContent;
//     heroTitle.textContent = ''; // Clear text
//     let i = 0;
//     const speed = 50; // typing speed in milliseconds

//     function typeWriter() {
//         if (i < text.length) {
//             heroTitle.textContent += text.charAt(i);
//             i++;
//             setTimeout(typeWriter, speed);
//         }
//     }
//     // Call this function after a small delay to allow page load
//     setTimeout(typeWriter, 1000);
// }

// Intersection Observer for animations on scroll
const animateElements = document.querySelectorAll('.animate-fade-in-up, .animate-bounce-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            // Optional: Stop observing once animation has played
            // observer.unobserve(entry.target);
        } else {
            // Optional: Reset animation if element goes out of view
            // entry.target.style.animationPlayState = 'paused';
        }
    });
}, {
    threshold: 0.1 // Trigger when 10% of the element is visible
});

animateElements.forEach(element => {
    element.style.animationPlayState = 'paused'; // Pause animations initially
    observer.observe(element);
});
