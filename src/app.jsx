import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Gameplay } from './gameplay/gameplay';
import { Scores } from './scores/scores';
import { Instructions } from './instructions/instructions';

export default function App() {
    return (
        <BrowserRouter>
            <div className='body'>
                <header className="container-fluid fixed-top bg-primary text-light">
                    <nav className="navbar navbar-light text-center">
                        <NavLink className="navbar-brand" to="">EconoMentor</NavLink>
                        <menu className="navbar-nav">
                            <li className="nav-item"><NavLink className="nav-link" to="instructions">How to Play</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="gameplay">New Game</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="scores">Scores</NavLink></li>
                            <li className="nav-item"><NavLink className="nav-link" to="" id="nav-login">Log In</NavLink></li>
                        </menu>
                    </nav>
                </header>

                <Routes>
                    <Route path='/' element={<Login />} exact />
                    <Route path='/gameplay' element={<Gameplay />} />
                    <Route path='/scores' element={<Scores />} />
                    <Route path='/instructions' element={<Instructions />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>

                <footer className="bg-dark text-light fixed-bottom">
                    <div className="author-name">EconoMentor was created by Chase Merrill at Brigham Young University for C S 260: Web Programming, Winter 2024</div>
                    <a className="footer-link" href="https://github.com/cmerrill01/startup">Source code on GitHub</a>
                </footer>
            </div>
        </BrowserRouter>
    );
}

function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
}