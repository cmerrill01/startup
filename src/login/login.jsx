import React from 'react';
import Button from 'react-bootstrap/Button';

export function Login() {
    const [loginUsername, setLoginUsername] = React.useState("");
    const [loginPassword, setLoginPassword] = React.useState("");
    const [createUsername, setCreateUsername] = React.useState("");
    const [createPassword, setCreatePassword] = React.useState("");
    const [createEmail, setCreateEmail] = React.useState("");

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
                    <Button onclick="login()">Login</Button>
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
                    <Button onclick="createAccount()">Create Account</Button>
                </div>
            </section>
        </main>
    );
}
