/* SHOW / HIDE PASSWORD */
function togglePassword() {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
}

/* LOGIN */
document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Vui lòng nhập đầy đủ thông tin ❌");
        return;
    }

    // FAKE LOGIN
    const user = {
        username: username
    };

    localStorage.setItem("currentUser", JSON.stringify(user));

    alert("Đăng nhập thành công 🎉");

    // chuyển trang
    window.location.href = "index.html";
});