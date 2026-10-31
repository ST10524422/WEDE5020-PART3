// ==========================================
// ECOCERE WEBSITE - PART 3 MAIN SCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu Toggle Enhancement
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector("nav ul");
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
    }

    // 2. Lightbox Gallery Enhancement for Images
    const galleryImages = document.querySelectorAll("picture img, .project-card img, img");
    
    if (galleryImages.length > 0) {
        const lightbox = document.createElement("div");
        lightbox.id = "lightbox";
        lightbox.style.cssText = "display:none; position:fixed; z-index:1000; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); justify-content:center; align-items:center; cursor:pointer;";
        
        const lightboxImg = document.createElement("img");
        lightboxImg.style.cssText = "max-width:90%; max-height:90%; border-radius:5px; box-shadow: 0 5px 15px rgba(0,0,0,0.5);";
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);

        galleryImages.forEach(img => {
            img.style.cursor = "pointer";
            img.addEventListener("click", () => {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src;
            });
        });

        lightbox.addEventListener("click", () => {
            lightbox.style.display = "none";
        });
    }

    // 3. Form Validation for Enquiry & Contact Forms
    const enquiryForm = document.querySelector("#enquiry-form");
    const contactForm = document.querySelector("#contact-form");

    if (enquiryForm) {
        enquiryForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (validateForm(enquiryForm)) {
                alert("Success! Your enquiry has been validated and submitted.");
                enquiryForm.reset();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            if (validateForm(contactForm)) {
                alert("Success! Your message has been sent to the EcoCare team.");
                contactForm.reset();
            }
        });
    }
});

// Generic validation helper function
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll("input[required], textarea[required], select[required]");

    inputs.forEach(input => {
        removeError(input);
        
        // Check if empty
        if (!input.value.trim()) {
            showError(input, "This field is required and cannot be left blank.");
            isValid = false;
        } 
        // Specific Email Validation
        else if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                showError(input, "Please enter a valid email address (e.g., user@example.com).");
                isValid = false;
            }
        }
        // Specific Phone Number Validation
        else if (input.type === "tel" || input.name.includes("phone")) {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{10,15}$/;
            if (!phoneRegex.test(input.value)) {
                showError(input, "Please enter a valid phone number (minimum 10 digits).");
                isValid = false;
            }
        }
    });

    return isValid;
}

function showError(input, message) {
    input.style.borderColor = "#e74c3c";
    let errorDiv = input.parentElement.querySelector(".error-message");
    if (!errorDiv) {
        errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        errorDiv.style.color = "#e74c3c";
        errorDiv.style.fontSize = "0.85rem";
        errorDiv.style.marginTop = "4px";
        input.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = message;
}

function removeError(input) {
    input.style.borderColor = "";
    const errorDiv = input.parentElement.querySelector(".error-message");
    if (errorDiv) {
        errorDiv.remove();
    }
}