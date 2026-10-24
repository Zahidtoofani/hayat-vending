document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // EMAILJS CONFIGURATION (PASTE YOUR KEYS HERE)
    // ==========================================
    const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID"; 
    const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // You can use one template for all if variables match
    const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
    
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // ==========================================
    // 1. General Modal Setup & Close Logic
    // ==========================================
    const modals = document.querySelectorAll('.modal-overlay');
    const closeButtons = document.querySelectorAll('.close-modal');

    closeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.target.closest('.modal-overlay').classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });

    // ==========================================
    // 2. Hero Section Get a Quote
    // ==========================================
    const heroQuoteBtn = document.getElementById('heroQuoteBtn');
    const heroQuoteModal = document.getElementById('heroQuoteModal');
    const heroQuoteForm = document.getElementById('heroQuoteForm');
    const heroFormStatus = document.getElementById('heroFormStatus');
    const heroSubmitBtn = document.getElementById('heroSubmitBtn');

    heroQuoteBtn.addEventListener('click', () => {
        heroQuoteModal.classList.add('active');
        heroFormStatus.textContent = "";
    });

    heroQuoteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        heroSubmitBtn.textContent = "SENDING...";
        heroSubmitBtn.disabled = true;

        const templateParams = {
            form_type: "Hero Quote Request",
            company: document.getElementById('heroCompany').value,
            contact_person: document.getElementById('heroContactPerson').value,
            message: document.getElementById('heroMessage').value,
            to_email: "zahid@vh.hmail.com"
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                heroFormStatus.textContent = "Success! Request sent.";
                heroFormStatus.className = "form-status success";
                heroQuoteForm.reset();
                heroSubmitBtn.textContent = "SEND REQUEST";
                heroSubmitBtn.disabled = false;
                setTimeout(() => heroQuoteModal.classList.remove('active'), 2000);
            })
            .catch((err) => {
                console.error(err);
                heroFormStatus.textContent = "Failed to send. Try again.";
                heroFormStatus.className = "form-status error";
                heroSubmitBtn.textContent = "SEND REQUEST";
                heroSubmitBtn.disabled = false;
            });
    });

    // ==========================================
    // 3. Footer Message Form
    // ==========================================
    const contactForm = document.getElementById('contactMessageForm');
    const contactFormStatus = document.getElementById('contactFormStatus');
    const contactSubmitBtn = document.getElementById('contactSubmitBtn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        contactSubmitBtn.textContent = "SENDING...";
        contactSubmitBtn.disabled = true;

        const templateParams = {
            form_type: "Footer Contact Message",
            name: document.getElementById('contactName').value,
            email: document.getElementById('contactEmail').value,
            message: document.getElementById('contactMessage').value,
            to_email: "zahid@vh.hmail.com"
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                contactFormStatus.textContent = "Message sent successfully!";
                contactFormStatus.className = "form-status success";
                contactForm.reset();
                contactSubmitBtn.textContent = "SEND MESSAGE";
                contactSubmitBtn.disabled = false;
            })
            .catch((err) => {
                console.error(err);
                contactFormStatus.textContent = "Failed to send. Please try again.";
                contactFormStatus.className = "form-status error";
                contactSubmitBtn.textContent = "SEND MESSAGE";
                contactSubmitBtn.disabled = false;
            });
    });

    // ==========================================
    // 4. About Section Slider
    // ==========================================
    const slides = document.querySelectorAll('.about-slider .slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3000);

    // ==========================================
    // 5. KPI Counter Animation
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const speed = 200; 
                const updateCount = () => {
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
    counters.forEach(counter => observer.observe(counter));

    // ==========================================
    // 6. Testimonial Carousel & Add Review
    // ==========================================
    const track = document.getElementById('reviewTrack');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 1;

    function updateCarousel() {
        const allCards = document.querySelectorAll('.testimonial-card');
        allCards.forEach(card => card.classList.remove('active'));
        
        if (allCards[currentIndex]) {
            allCards[currentIndex].classList.add('active');
        }

        let cardWidth;
        if (window.innerWidth <= 768) cardWidth = 100;
        else if (window.innerWidth <= 992) cardWidth = 50;
        else cardWidth = 33.333;

        track.style.transform = `translateX(-${(currentIndex * cardWidth) - (cardWidth/2)}%)`;
    }

    nextBtn.addEventListener('click', () => {
        const allCards = document.querySelectorAll('.testimonial-card');
        if (currentIndex < allCards.length - 1) {
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
    
    window.addEventListener('resize', updateCarousel);

    // Review Modal Logic
    const addReviewBtn = document.getElementById('addReviewBtn');
    const reviewModal = document.getElementById('reviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const reviewFormStatus = document.getElementById('reviewFormStatus');
    const reviewSubmitBtn = document.getElementById('reviewSubmitBtn');
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('reviewPhoto');
    const imagePreview = document.getElementById('imagePreview');
    let uploadedImageBase64 = "";

    addReviewBtn.addEventListener('click', () => {
        reviewModal.classList.add('active');
        reviewFormStatus.textContent = "";
    });

    // Drag and Drop Logic
    dropZone.addEventListener('click', () => fileInput.click());
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileUpload(e.dataTransfer.files[0]);
        }
    });
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length) handleFileUpload(e.target.files[0]);
    });

    function handleFileUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageBase64 = e.target.result;
            imagePreview.src = uploadedImageBase64;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        reviewSubmitBtn.textContent = "SUBMITTING...";
        reviewSubmitBtn.disabled = true;

        const name = document.getElementById('reviewName').value;
        const ratingVal = document.querySelector('input[name="rating"]:checked').value;
        const message = document.getElementById('reviewMessage').value;

        // 1. Send to EmailJS
        const templateParams = {
            form_type: "New Review Submission",
            name: name,
            rating: ratingVal,
            message: message,
            has_photo: uploadedImageBase64 ? "Yes (See attached)" : "No",
            to_email: "zahid@vh.hmail.com"
        };

        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                // 2. Add to DOM dynamically
                const starsHtml = '<i class="fas fa-star"></i>'.repeat(ratingVal) + '<i class="far fa-star"></i>'.repeat(5 - ratingVal);
                const imgSrc = uploadedImageBase64 || 'https://via.placeholder.com/150?text=User';
                
                const newCard = document.createElement('div');
                newCard.className = 'testimonial-card';
                newCard.innerHTML = `
                    <div class="profile-pic"><img src="${imgSrc}" alt="${name}"></div>
                    <h4>${name}</h4>
                    <div class="stars">${starsHtml}</div>
                    <p>"${message}"</p>
                `;
                
                track.appendChild(newCard);
                
                reviewFormStatus.textContent = "Review submitted successfully!";
                reviewFormStatus.className = "form-status success";
                reviewForm.reset();
                imagePreview.style.display = 'none';
                uploadedImageBase64 = "";
                reviewSubmitBtn.textContent = "SUBMIT REVIEW";
                reviewSubmitBtn.disabled = false;
                
                setTimeout(() => {
                    reviewModal.classList.remove('active');
                    // Jump to the new review
                    currentIndex = document.querySelectorAll('.testimonial-card').length - 1;
                    updateCarousel();
                }, 2000);
            })
            .catch((err) => {
                console.error(err);
                reviewFormStatus.textContent = "Failed to submit review.";
                reviewFormStatus.className = "form-status error";
                reviewSubmitBtn.textContent = "SUBMIT REVIEW";
                reviewSubmitBtn.disabled = false;
            });
    });

    // ==========================================
    // 7. Mobile Menu Toggle
    // ==========================================
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
