/* SHOW PASSWORD */
function togglePassword() {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
}

/* SIGN UP */
document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirm").value;

    // VALIDATE
    if (!name || !email || !username || !password || !confirm) {
        alert("Vui lòng nhập đầy đủ thông tin ❌");
        return;
    }

    if (password !== confirm) {
        alert("Mật khẩu không khớp ❌");
        return;
    }

    // LƯU USER
    const user = {
        name,
        email,
        username,
        password
    };

    localStorage.setItem("user_" + username, JSON.stringify(user));

    alert("Đăng ký thành công 🎉");

    window.location.href = "login.html";
});