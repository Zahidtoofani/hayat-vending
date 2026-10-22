document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. About Section Image Slider ---
    const slides = document.querySelectorAll('.about-slider .slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change image every 3 seconds
    setInterval(nextSlide, 3000);

    // --- 2. KPI Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    // Use Intersection Observer to trigger counting when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target');
                    const count = +counter.innerText;
                    const inc = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + inc);
                        setTimeout(updateCount, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        observer.observe(counter);
    });

    // --- 3. Testimonial Carousel ---
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 1; // Start at the middle card

    function updateCarousel() {
        // Remove active class from all
        cards.forEach(card => card.classList.remove('active'));
        
        // Add active class to current
        cards[currentIndex].classList.add('active');

        // Calculate translation based on screen size
        let cardWidth;
        if (window.innerWidth <= 768) {
            cardWidth = 100; // 1 card per view
            track.style.transform = `translateX(-${currentIndex * cardWidth}%)`;
        } else if (window.innerWidth <= 992) {
            cardWidth = 50; // 2 cards per view
            // Center the active card
            track.style.transform = `translateX(-${(currentIndex * cardWidth) - 25}%)`;
        } else {
            cardWidth = 33.333; // 3 cards per view
            // Center the active card
            track.style.transform = `translateX(-${(currentIndex * cardWidth) - 33.333}%)`;
        }
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Handle window resize for responsive carousel
    window.addEventListener('resize', updateCarousel);

    // Initialize carousel position
    updateCarousel();

    // --- 4. Simple Form Handler ---
    const form = document.getElementById('messageForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent successfully. (Simulation)');
        form.reset();
    });

    // --- 5. Add Review Button Handler ---
    document.getElementById('addReviewBtn').addEventListener('click', () => {
        alert('Review submission feature coming soon!');
    });

    // --- 6. Mobile Menu Toggle (Basic implementation) ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        if(navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(26, 26, 26, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.textAlign = 'center';
        }
    });

});