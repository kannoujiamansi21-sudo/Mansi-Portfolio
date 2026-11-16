
console.log("Mansi Portfolio Website Loaded!");

// =====================================
// EMAILJS INITIALIZATION
// =====================================

const SERVICE_ID = "service_716qvz7";
const TEMPLATE_ID = "template_p63yjig";
const PUBLIC_KEY = "l73WkQ0PoIeNoulJV";

if (typeof emailjs !== "undefined") {
    emailjs.init({
        publicKey: PUBLIC_KEY
    });
}

// =====================================
// CONTACT FORM
// =====================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const formStatus = document.getElementById("formStatus");
        const button = contactForm.querySelector('button[type="submit"]');

        const templateParams = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            subject: document.getElementById("subject").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        if (!templateParams.name || !templateParams.email ||
            !templateParams.subject || !templateParams.message) {
            formStatus.textContent = "Please fill in all fields.";
            return;
        }

        if (typeof emailjs === "undefined") {
            formStatus.textContent = "Email service not loaded. Refresh the page.";
            return;
        }

        button.disabled = true;
        button.textContent = "Sending...";

        formStatus.textContent = "Sending your message...";

        try {

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams
            );

            formStatus.textContent =
                "Thank you! Your message has been sent successfully.";

            contactForm.reset();

        } catch (error) {

            console.error("EmailJS Error:", error);

            formStatus.textContent =
                "Message could not be sent. Please try again.";

        } finally {

            button.disabled = false;
            button.innerHTML =
                'SEND MESSAGE <i class="fa-solid fa-paper-plane"></i>';

        }

    });

}

// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const icon = menuToggle.querySelector("i");

        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");
        }

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            const icon = menuToggle.querySelector("i");

            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }

        });

    });

}
