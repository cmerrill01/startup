function login() {
    const usernameEl = document.querySelector("#login-username");
    localStorage.setItem("username", usernameEl.value);
    window.location.href = "gameplay.html";
}

function createAccount() {
    const usernameEl = document.querySelector("#create-username");
    localStorage.setItem("username", usernameEl.value);
    window.location.href = "gameplay.html";
}