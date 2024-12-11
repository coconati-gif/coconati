document.addEventListener('DOMContentLoaded', function() {
    // Function to scroll left
    function scrollLeft(event) {
        const container = event.target.nextElementSibling; // Get the next sibling (image container)
        if (container) {
            container.scrollLeft -= 400; // Scroll left
        } else {
            console.error("Image container not found.");
        }
    }

    // Function to scroll right
    function scrollRight(event) {
        const container = event.target.previousElementSibling; // Get the previous sibling (image container)
        if (container) {
            container.scrollLeft += 400; // Scroll right
        } else {
            console.error("Image container not found.");
        }
    }

    // Attach event listeners to all scroll buttons
    const scrollButtons = document.querySelectorAll('.scroll-button');
    scrollButtons.forEach(button => {
        if (button.textContent === '←') {
            button.onclick = scrollLeft; // Assign left scroll function
        } else if (button.textContent === '→') {
            button.onclick = scrollRight; // Assign right scroll function
        }
    });
});

function openModal(img) {
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = img.src; // Set the source of the modal image to the clicked image
}

function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none"; // Hide the modal
}

// Close modal when clicking outside of the image
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
// Get the header element
const header = document.querySelector('header');

// Function to check scroll position
function checkScroll() {
    const heroSection = document.querySelector('.hero');
    const heroSectionHeight = heroSection.offsetHeight;
    const scrollPosition = window.scrollY;

    // Check if the scroll position is less than or equal to the height of the hero section
    if (scrollPosition <= heroSectionHeight) {
        header.classList.remove('transparent'); // Remove transparent class (header is solid)
    } else {
        header.classList.add('transparent'); // Add transparent class (header is semi-transparent)
    }
}

// Add scroll event listener
window.addEventListener('scroll', checkScroll);

// Initial check on page load
checkScroll();

function smoothScroll(target, duration) {
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Animation function
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1); // Ensure progress does not exceed 1

        // Easing function (ease-in-out)
        const ease = progress < 0.5 ? 4 * progress * progress * progress : (progress - 1) * (2 * progress - 2) * (2 * progress - 2) + 1;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Select all anchor links within the header-right div
    const anchors = document.querySelectorAll('.header-right a');

    // Add click event listener to each anchor
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the target section ID
            smoothScroll(targetId, 1000); // Call the smooth scroll function with a duration of 1000ms
        });
    });
});