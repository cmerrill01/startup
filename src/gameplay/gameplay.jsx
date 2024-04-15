import React from 'react';
import Button from 'react-bootstrap/Button';

export function Gameplay() {
    return (
        <main className="container-fluid bg-light text-dark gameplay-screen">
            <Game maxFixedCost={1000} maxVariableCost={100} maxIntercept={1000} maxSlope={100} maxMonths={12} />
            <section id="last-round-result" className="gameplay-section">
                <h1>Last Month's Data</h1>
                <div id="last-month-revenue-display" className="gameplay-data revenue">
                    Revenue: $<span id="last-month-revenue">-</span>
                </div>
                <div id="last-month-costs-display" className="gameplay-data costs">
                    Costs: $<span id="last-month-costs">-</span>
                </div>
                <div id="last-month-profit-display" className="gameplay-data profit">
                    Profit: $<span id="last-month-profit">-</span>
                </div>
            </section>
            <section id="user-input" className="gameplay-section">
                <h1>Input Price and Quantity</h1>
                <input
                    type="number"
                    id="price"
                    placeholder="Enter price"
                    className="form-control"
                />
                <input
                    type="number"
                    id="quantity"
                    placeholder="Enter quantity"
                    className="form-control"
                />
                <Button onClick={() => 0} >Submit price and quantity</Button>
            </section>
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

class DemandCurve {
    intercept;
    slope;
    minRecommendedQuantity;
    maxRecommendedQuantity;

    constructor(maxIntercept, maxSlope) {
        // generate a random intercept
        this.intercept = Math.ceil(Math.random() * maxIntercept);
        // generate a random slope
        this.slope = -1 * Math.ceil(Math.random() * maxSlope);
        // recommend min and max quantity
        // based on the generated slope and intercept
        this.minRecommendedQuantity = Math.floor((this.intercept / this.slope) * -0.1);
        this.maxRecommendedQuantity = Math.ceil((this.intercept / this.slope) * -0.9);
    }
}

function Game({ maxFixedCost, maxVariableCost, maxIntercept, maxSlope, maxMonths }) {
    const gameId = generateUUID();
    const [assets, setAssets] = React.useState(0);
    const [month, setMonth] = React.useState(1);
    const fixedCost = Math.ceil(Math.random() * maxFixedCost);
    const variableCost = Math.ceil(Math.random() * maxVariableCost);
    const demandCurve = new DemandCurve(maxIntercept, maxSlope);
    const [gameOver, setGameOver] = React.useState(false);

    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    return (
        <section className="gameplay-section">
            <h1>Gameplay Data</h1>
            <GameplayData label={"Current assets: $"} value={assets} />
            <GameplayData label={"Current month: "} value={month} />
            <GameplayData label={"Recommended quantity: "} value={String(demandCurve.minRecommendedQuantity + " - " + demandCurve.maxRecommendedQuantity)} />
            <GameplayData label={"Fixed cost: $"} value={fixedCost} />
            <GameplayData label={"Variable cost per unit: $"} value={variableCost} />
        </section>
    )
}

function GameplayData({label, value}) {
    return (
        <div className="gameplay-data">
            {label}<span>{value}</span>
        </div>
    )
}