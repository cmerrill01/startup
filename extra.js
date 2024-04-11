function showUsername() {
    const username = localStorage.getItem("username");
    if (username !== null) {
        navLoginEl = document.querySelector("#nav-login");
        navLoginEl.textContent = "Welcome, " + username + " (Log Out)";
        navLoginEl.addEventListener('click', logout);
    }   
}

async function logout() {
    try {
        const response = await fetch("api/auth/logout", { method: "delete" });
        if (response.ok) {
            localStorage.removeItem('username')
            console.log("Logout successful");
        } else {
            console.error("Logout failed:", response.statusText);
        }
    } catch (error) {
        console.error("Error during logout:", error);
    }
}

showUsername();