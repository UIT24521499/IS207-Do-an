// 1. Dữ liệu danh sách ảnh (từ screenshot của bạn)
const images = [
    "image/product/product.6.jpg",
    "image/product/product.7.jpg",
    "image/product/product.8.jpg"
];

let currentIndex = 0;

// 2. Hàm cập nhật ảnh chính và trạng thái ảnh nhỏ
function updateGallery(index) {
    currentIndex = index;
    const mainImg = document.getElementById("mainProductImage");
    const thumbnails = document.querySelectorAll(".thumbnail-list img");

    // Hiệu ứng đổi ảnh
    mainImg.style.opacity = "0.5";
    setTimeout(() => {
        mainImg.src = images[currentIndex];
        mainImg.style.opacity = "1";
    }, 150);

    // Cập nhật viền cho ảnh nhỏ
    thumbnails.forEach((img, i) => {
        if (i === currentIndex) {
            img.classList.add("active");
        } else {
            img.classList.remove("active");
        }
    });
}

// 3. Hàm xử lý nút Next/Prev
function moveSlide(step) {
    currentIndex += step;
    if (currentIndex >= images.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = images.length - 1;
    updateGallery(currentIndex);
}

// 4. Hàm khi click vào ảnh nhỏ
function changeImage(element, index) {
    updateGallery(index);
}

// 5. Hàm tăng giảm số lượng mua hàng
function changeQty(step) {
    const input = document.getElementById("quantityInput");
    let value = parseInt(input.value);
    value = isNaN(value) ? 1 : value + step;
    if (value < 1) value = 1;
    input.value = value;
}

// 6. Hiệu ứng Fade-in khi cuộn trang
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Hàm để người dùng click vào album địa danh thì ảnh to thay đổi theo
function changeLocationImg(src) {
    const locImg = document.getElementById("locationThumb");
    locImg.style.transition = "0.4s";
    locImg.style.opacity = "0.3";

    setTimeout(() => {
        locImg.src = src;
        locImg.style.opacity = "1";
    }, 200);
}
