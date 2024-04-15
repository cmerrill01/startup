import React from 'react';
import { Game } from './game'

export function Gameplay() {
    return (
        <main className="container-fluid bg-light text-dark gameplay-screen">
            <Game maxFixedCost={1000} maxVariableCost={100} maxIntercept={1000} maxSlope={100} maxMonths={12} />
            <section id="other-players" className="gameplay-section">
                <h1>Currently Playing</h1>
                <table className="table" id="other-players-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Current score</th>
                        </tr>
                    </thead>
                    <tbody id="other-players-table-body">

                    </tbody>
                </table>
            </section>
        </main>
    );
}