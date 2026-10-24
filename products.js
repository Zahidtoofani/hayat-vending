document.addEventListener("DOMContentLoaded", () => {
    
    // --- EMAILJS CONFIGURATION ---
    // PASTE YOUR SERVICE KEY HERE
    const EMAILJS_SERVICE_ID = "service_ab6vspe"; 
    // You also need a template ID and Public Key from EmailJS dashboard
    const EMAILJS_TEMPLATE_ID = "template_n3fqsi1";
    const EMAILJS_PUBLIC_KEY = "8og170yJc3gM8rApv";

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // --- MODAL LOGIC ---
    const modal = document.getElementById("quoteModal");
    const closeModal = document.querySelector(".close-modal");
    const quoteButtons = document.querySelectorAll(".get-quote-btn");
    const modalProductName = document.getElementById("modalProductName");
    const selectedProductInput = document.getElementById("selectedProduct");
    const quoteForm = document.getElementById("quoteForm");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitQuoteBtn");

    // Open Modal
    quoteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const productName = btn.getAttribute("data-product");
            modalProductName.textContent = `Inquiring about: ${productName}`;
            selectedProductInput.value = productName;
            modal.classList.add("active");
            formStatus.textContent = ""; // Clear previous messages
        });
    });

    // Close Modal (X button)
    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // Close Modal (Click outside)
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // --- FORM SUBMISSION LOGIC ---
    quoteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        submitBtn.textContent = "SENDING...";
        submitBtn.disabled = true;
        formStatus.textContent = "";
        formStatus.className = "form-status";

        // Gather data
        const templateParams = {
            product: selectedProductInput.value,
            business_name: document.getElementById("businessName").value,
            phone: document.getElementById("phoneNumber").value || "Not provided",
            message: document.getElementById("quoteMessage").value,
            to_email: "info@hayatvending.ae" // The email address that receives the quote
        };

        // Send via EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(() => {
                formStatus.textContent = "Success! Your quote request has been sent.";
                formStatus.classList.add("success");
                quoteForm.reset();
                submitBtn.textContent = "SEND REQUEST";
                submitBtn.disabled = false;
                
                // Close modal after 3 seconds
                setTimeout(() => {
                    modal.classList.remove("active");
                    formStatus.textContent = "";
                }, 3000);
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                formStatus.textContent = "Failed to send. Please try again or contact us directly.";
                formStatus.classList.add("error");
                submitBtn.textContent = "SEND REQUEST";
                submitBtn.disabled = false;
            });
    });

    // --- MOBILE MENU TOGGLE ---
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
