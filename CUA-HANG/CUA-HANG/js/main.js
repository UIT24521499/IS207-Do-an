/* ================= SCROLL TO SECTION ================= */
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: "smooth"
        });
    }
}

/* ================= SEARCH ================= */
const searchInput = document.querySelector(".header-right input");

if (searchInput) {
    searchInput.addEventListener("keyup", function () {
        const keyword = this.value.toLowerCase();
        const products = document.querySelectorAll(".product-card");

        products.forEach(product => {
            const name = product.querySelector(".product-name").innerText.toLowerCase();

            if (name.includes(keyword)) {
                product.style.display = "block";
            } else {
                product.style.display = "none";
            }
        });
    });
}

/* ================= CLICK PRODUCT (demo) ================= */
const productCards = document.querySelectorAll(".product-card");

productCards.forEach(card => {
    card.addEventListener("click", function () {
        const name = this.querySelector(".product-name").innerText;
        alert("Bạn đã chọn: " + name);
    });
});

/* ================= FADE IN EFFECT ================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

document.querySelectorAll(".product-card").forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(20px)";
    observer.observe(card);
});

/* ================= ACTIVE MENU ================= */
const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach(item => {
    item.addEventListener("click", function () {
        menuItems.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
    });
});