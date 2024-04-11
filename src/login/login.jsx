import React from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Login({ onLogin }) {
    const [loginUsername, setLoginUsername] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");
    const [createUsername, setCreateUsername] = React.useState("");
    const [createPassword, setCreatePassword] = React.useState("");
    const [createEmail, setCreateEmail] = React.useState("");
    const [displayError, setDisplayError] = React.useState(null);

    async function login() {
        try {
            const response = await fetch("api/auth/login", {
                method: "post",
                body: JSON.stringify({
                    username: loginUsername,
                    password: loginPassword,
                }),
                headers: { "content-type": "application/json; charset=UTF-8" }
            });

            console.log(response.status);

            await accountSuccessCheck(response, loginUsername);

        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

    async function createAccount() {
        try {
            const response = await fetch("api/auth/create", {
                method: "post",
                body: JSON.stringify({
                    username: createUsername,
                    email: createEmail,
                    password: createPassword,
                }),
                headers: { "content-type": "application/json; charset=UTF-8" }
            });

            console.log(response.status);

            await accountSuccessCheck(response, createUsername);

        } catch (error) {
            console.error("Error creating account:", error);
        }
    }

    async function accountSuccessCheck(response, username) {
        if (response.ok) {
            localStorage.setItem("username", username);
            onLogin();
        } else {
            const body = await response.json();
            setDisplayError(`⚠ Error: ${body.msg}`);
        }
    }

    return (
        <main className="container-fluid bg-light text-dark">
            <section id="login" className="login-panel">
                <div>
                    <h1>Current Users</h1>
                    <input
                        className="form-control"
                        type="text"
                        id="login-username"
                        placeholder="Username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                    />
                    <input
                        className="form-control"
                        type="password"
                        id="login-password"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <Button onClick={() => login()}>Login</Button>
                </div>
            </section>
            <section id="account-creation" className="login-panel">
                <div>
                    <h1>New Users</h1>
                    <input
                        className="form-control"
                        type="text"
                        id="create-username"
                        placeholder="Username"
                        value={createUsername}
                        onChange={(e) => setCreateUsername(e.target.value)}
                    />
                    <input
                        className="form-control"
                        type="password"
                        id="create-password"
                        placeholder="Password"
                        value={createPassword}
                        onChange={(e) => setCreatePassword(e.target.value)}
                    />
                    <input
                        className="form-control"
                        type="email"
                        id="create-email"
                        placeholder="Email Address"
                        value={createEmail}
                        onChange={(e) => setCreateEmail(e.target.value)}
                    />
                    <Button onClick={() => createAccount()}>Create Account</Button>
                </div>
            </section>

            <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />

        </main>
    );
}
