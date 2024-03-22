async function login() {
    const username = document.querySelector('#login-username')?.value;
    const password = document.querySelector('#login-password')?.value;
    try {
        const response = await fetch("api/auth/login", {
            method: "post",
            body: JSON.stringify({
                username: username,
                password: password,
            }),
            headers: { "content-type": "application/json; charset=UTF-8" }
        });

        console.log(response.status);

        await accountSuccessCheck(response, username);

    } catch (error) {
        console.error("Error logging in:", error);
    }
    /*
    const usernameEl = document.querySelector("#login-username");
    localStorage.setItem("username", usernameEl.value);
    window.location.href = "gameplay.html";
    */
}

async function createAccount() {
    const username = document.querySelector("#create-username")?.value;
    const password = document.querySelector("#create-password")?.value;
    const email = document.querySelector("#create-email")?.value;
    try {
        const response = await fetch("api/auth/create", {
            method: "post",
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
            }),
            headers: { "content-type": "application/json; charset=UTF-8" }
        });

        console.log(response.status);
    
        await accountSuccessCheck(response, username);

    } catch (error) {
        console.error("Error creating account:", error);
    }
}

async function accountSuccessCheck(response, username) {
    if (response.ok) {
        localStorage.setItem("username", username);
        window.location.href = "gameplay.html";
    } else {
        const body = await response.json();
        const modalEl = document.querySelector("#msgModal");
        modalEl.querySelector(".modal-body").textContent = `⚠ Error: ${body.msg}`;
        const msgModal = new bootstrap.Modal(modalEl, {});
        msgModal.show();
        console.error("Failure:", response.statusText);
    }
}
