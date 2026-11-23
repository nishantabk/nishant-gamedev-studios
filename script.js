
// =========================
// NISHANT GAMEDEV STUDIOS
// =========================

console.log("Nishant GameDev Studios loaded!");


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(
    ".game-card, .about-section, .section-heading"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, {
        threshold: 0.15
    });

    revealElements.forEach((element) => {
        observer.observe(element);
    });

}


// =========================
// MOBILE HAMBURGER MENU
// =========================

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelector(".nav-links");

    if (navbar && navLinks) {

        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.innerHTML = "☰";

        menuButton.setAttribute("aria-label", "Open navigation menu");
        menuButton.setAttribute("aria-expanded", "false");

        navbar.appendChild(menuButton);

        menuButton.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("show");

            menuButton.innerHTML = isOpen ? "✕" : "☰";
            menuButton.setAttribute("aria-expanded", isOpen);

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );

        });

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show");
                menuButton.innerHTML = "☰";
                menuButton.setAttribute("aria-expanded", "false");

            });

        });

    }


    // =========================
    // EMAILJS CONTACT FORM
    // =========================

    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {

        if (typeof emailjs === "undefined") {

            formStatus.textContent =
                "Email service could not load. Please refresh the page.";

            formStatus.style.color = "#FF5555";

            return;
        }

        // REPLACE THESE THREE VALUES

        const serviceID = "service_i3s8vo8";
        const templateID = "template_fb0pewr";
        const publicKey = "r8D7hgZDZzPJ_IvvM";

        emailjs.init({
            publicKey: publicKey
        });

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const submitButton = contactForm.querySelector(
                'button[type="submit"]'
            );

            submitButton.disabled = true;
            submitButton.textContent = "SENDING...";

            formStatus.textContent = "Sending your message...";
            formStatus.style.color = "#00D9FF";

            emailjs.sendForm(
                serviceID,
                templateID,
                contactForm
            )

            .then(function () {

                formStatus.textContent =
                    "Message sent successfully! Thank you for contacting us.";

                formStatus.style.color = "#39FF14";

                contactForm.reset();

            })

            .catch(function (error) {

                console.error("EmailJS Error:", error);

                formStatus.textContent =
                    "Message could not be sent. Please try again.";

                formStatus.style.color = "#FF5555";

            })

            .finally(function () {

                submitButton.disabled = false;
                submitButton.textContent = "SEND MESSAGE ↗";

            });

        });

    }

});
