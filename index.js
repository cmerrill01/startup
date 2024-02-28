function showUsername() {
    const username = localStorage.getItem("username");
    if (username !== null) {
        navLoginEl = document.querySelector("#nav-login");
        navLoginEl.textContent = "Welcome, " + username;
    }   
}

showUsername();