/* ================= GLOBAL ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= SAVE CART ================= */
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= ADD TO CART ================= */
function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({
            name,
            price,
            image,
            qty: 1
        });
    }

    saveCart();
    alert("Đã thêm vào giỏ 🛒");
}

/* ================= SCROLL ================= */
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
            product.style.display = name.includes(keyword) ? "block" : "none";
        });
    });
}

/* ================= RENDER CART ================= */
function renderCart() {
    const container = document.getElementById("cart-items");
    if (!container) return;

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {

        // Nếu chưa có selected thì mặc định true
        if (item.selected === undefined) item.selected = true;

        const itemTotal = item.price * item.qty;

        // ✅ chỉ cộng nếu được chọn
        if (item.selected) {
            subtotal += itemTotal;
        }

        container.innerHTML += `
        <div class="cart-item">

            <input type="checkbox"
                   ${item.selected ? "checked" : ""}
                   onchange="toggleItem(${index})">

            <div class="cart-info">
                <img src="image/${item.image}">
                <div>
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()}đ</p>
                </div>
            </div>

            <div class="quantity">
                <button onclick="changeQty(${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="changeQty(${index}, 1)">+</button>
            </div>

            <div>${itemTotal.toLocaleString()}đ</div>

            <button onclick="removeItem(${index})">🗑</button>

        </div>
        `;
    });

    const shipping = getShippingFee();
    let total = subtotal + shipping;

    // áp mã giảm giá
    if (discount > 0) {
        total = total - (total * discount / 100);
    }

    document.getElementById("subtotal").innerText = subtotal.toLocaleString() + "đ";
    document.getElementById("shipping").innerText = shipping.toLocaleString() + "đ";
    document.getElementById("total").innerText =
        total.toLocaleString() + "đ" + (discount ? ` (-${discount}%)` : "");
}

    const shipping = getShippingFee();
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById("subtotal");
    const shippingEl = document.getElementById("shipping");
    const totalEl = document.getElementById("total");

    if (subtotalEl) subtotalEl.innerText = subtotal.toLocaleString() + "đ";
    if (shippingEl) shippingEl.innerText = shipping.toLocaleString() + "đ";
    if (totalEl) totalEl.innerText = total.toLocaleString() + "đ";

function toggleItem(index) {
    cart[index].selected = !cart[index].selected;
    saveCart();
    renderCart();
}

/* ================= CHANGE QTY ================= */
function changeQty(index, change) {
    cart[index].qty += change;

    if (cart[index].qty < 1) cart[index].qty = 1;

    saveCart();
    renderCart();
}

/* ================= REMOVE ================= */
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

/* ================= SHIPPING ================= */
function getShippingFee() {
    const selected = document.querySelector('input[name="ship"]:checked');
    return selected && selected.value === "fast" ? 60000 : 30000;
}

document.querySelectorAll('input[name="ship"]').forEach(radio => {
    radio.addEventListener("change", renderCart);
});

/* ================= ACTIVE MENU ================= */
const menuItems = document.querySelectorAll(".sidebar li");

menuItems.forEach(item => {
    item.addEventListener("click", function () {
        menuItems.forEach(i => i.classList.remove("active"));
        this.classList.add("active");
    });
});

/* ================= INIT ================= */
document.addEventListener("DOMContentLoaded", () => {
    renderCart();
});

const coupons = {
    "XINCHAOOO": 10,
    "XINCAMONNN": 15
};

let discount = 0;

function applyCoupon() {
    const input = document.querySelector(".coupon-box input")
                    .value.trim().toUpperCase();

    if (coupons[input]) {
        discount = coupons[input];
        alert("Áp dụng thành công 🎉");
    } else {
        discount = 0;
        alert("Mã sai ❌");
    }

    renderCart();
}

//Load khi mở lại trang

function saveUserInfo() {
    const name = document.querySelector('input[placeholder="Họ tên"]').value;
    const phone = document.querySelector('input[placeholder="Số điện thoại"]').value;
    const address = document.querySelector('input[placeholder="Địa chỉ"]').value;

    const user = { name, phone, address };

    localStorage.setItem("user", JSON.stringify(user));
}

document.addEventListener("DOMContentLoaded", () => {
    renderCart();
    loadUserInfo();

    const btn = document.querySelector(".checkout-btn");

    if (btn) {
        btn.addEventListener("click", () => {
            saveUserInfo();
            localStorage.removeItem("cart");

            window.location.href = "success.html";
        });
    }
});