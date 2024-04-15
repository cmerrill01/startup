import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const maxFixedCost = 1000;
const maxVariableCost = 100;
const maxIntercept = 1000;
const maxSlope = 100;
const maxMonths = 12;

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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

const gameId = generateUUID();
const demandCurve = new DemandCurve(maxIntercept, maxSlope);
const fixedCost = Math.ceil(Math.random() * maxFixedCost);
const variableCost = Math.ceil(Math.random() * maxVariableCost);

export function Game() {
    const [gameOver, setGameOver] = useState(false);
    const [assets, setAssets] = useState(0);
    const [month, setMonth] = useState(1);
    const [revenue, setRevenue] = useState(null);
    const [cost, setCost] = useState(null);
    const [profit, setProfit] = useState(null);
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");

    function calculateRevenue() {
        // Check whether the market will buy this quantity or less at this price
        const quantityDemanded = Math.max(Math.round((price - demandCurve.intercept) / demandCurve.slope), 0);
        const quantitySold = Math.min(quantity, quantityDemanded);
        return price * quantitySold;
    }

    function calculateCost() {
        return fixedCost + variableCost * quantity;
    }

    function calculateProfit() {
        return calculateRevenue() - calculateCost();
    }

    function submit() {
        if (!gameOver) {
            const newRevenue = calculateRevenue();
            const newCost = calculateCost();
            const newProfit = calculateProfit();

            setRevenue(newRevenue);
            setCost(newCost);
            setProfit(newProfit);
            setAssets(assets + newProfit);
            setMonth(month + 1);            

            if (month > maxMonths) {
                // implement finish game
            }
            // implement broadcast score
        }
    }


    return (
        <>
            <section className="gameplay-section">
                <h1>Gameplay Data</h1>
                <GameplayData label={"Current assets: $"} value={assets} />
                <GameplayData label={"Current month: "} value={month} />
                <GameplayData label={"Recommended quantity: "} value={String(demandCurve.minRecommendedQuantity + " - " + demandCurve.maxRecommendedQuantity)} />
                <GameplayData label={"Fixed cost: $"} value={fixedCost} />
                <GameplayData label={"Variable cost per unit: $"} value={variableCost} />
            </section>
            <section className="gameplay-section">
                <h1>Last Month's Data</h1>
                <GameplayData label={"Revenue: $"} value={revenue} additionalClass={"revenue"} />
                <GameplayData label={"Costs: $"} value={cost} additionalClass={"costs"} />
                <GameplayData label={"Profit: $"} value={profit} additionalClass={"profit"} />
            </section>
            <section className="gameplay-section">
                <h1>Input Price and Quantity</h1>
                <input
                    type="number"
                    id="price"
                    placeholder="Enter price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    id="quantity"
                    placeholder="Enter quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Button onClick={() => submit()} >Submit price and quantity</Button>
            </section>
        </>
    );
}

function GameplayData({ label, value, additionalClass }) {
    const _className = String("gameplay-data" + (additionalClass ? " " + additionalClass : ""));
    return (
        <div className={_className}>
            {label}<span>{value}</span>
        </div>
    );
}
