import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
    return (
        <div className='body'>
            <header className="container-fluid fixed-top bg-primary text-light">
                <nav className="navbar navbar-light text-center">
                    <a className="navbar-brand" href="index.html">EconoMentor</a>
                    <menu className="navbar-nav">
                        <li className="nav-item"><a className="nav-link" href="instructions.html">How to Play</a></li>
                        <li className="nav-item"><a className="nav-link" href="gameplay.html">New Game</a></li>
                        <li className="nav-item"><a className="nav-link" href="scores.html">Scores</a></li>
                        <li className="nav-item"><a className="nav-link" href="index.html" id="nav-login">Log In</a></li>
                    </menu>
                </nav>
            </header>

            <main>App components go here</main>

            <footer className="bg-dark text-light fixed-bottom">
                <div className="author-name">EconoMentor was created by Chase Merrill at Brigham Young University for C S 260: Web Programming, Winter 2024</div>
                <a className="footer-link" href="https://github.com/cmerrill01/startup">Source code on GitHub</a>
            </footer>
        </div>
    );
}