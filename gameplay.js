const maxFixedCost = 1000;
const maxVariableCost = 100;
const maxIntercept = 1000;
const maxSlope = 100;

class Game {
    assets;
    month;
    fixedCost;
    variableCost;
    demandCurve;

    constructor() {
        this.assets = 0;
        this.month = 1;
        // generate random fixed cost
        this.fixedCost = Math.ceil(Math.random() * maxFixedCost);
        // generate random variable cost
        this.variableCost = Math.ceil(Math.random() * maxVariableCost);
        this.demandCurve = new DemandCurve();
    }

    submitPriceAndQuantity(price, quantity) {
        const revenue = this.calculateRevenue(price, quantity);
        console.log("Revenue: " + revenue);
        const cost = this.calculateCost(quantity);
        console.log("Cost: " + cost);
        const profit = this.calculateProfit(revenue, cost);
        console.log("Profit: " + profit);
        this.assets = this.assets + profit;
        this.month++;
        this.updateGameplayData(revenue, cost, profit);
    }

    calculateRevenue(price, quantity) {
        // Check whether the market will buy this quantity or less at this price
        const quantityDemanded = Math.round((price - this.demandCurve.intercept) / this.demandCurve.slope);
        const quantitySold = (quantity <= quantityDemanded ? quantity : quantityDemanded);
        return price * quantitySold;
    }

    calculateCost(quantity) {
        return this.fixedCost + this.variableCost * quantity;
    }

    calculateProfit(revenue, cost) {
        return revenue - cost;
    }

    updateGameplayData(revenue, cost, profit) {
        const revenueEl = document.querySelector("#last-month-revenue");
        revenueEl.textContent = revenue;
        const costEl = document.querySelector("#last-month-costs");
        costEl.textContent = cost;
        const profitEl = document.querySelector("#last-month-profit");
        profitEl.textContent = profit;
        const assetsEl = document.querySelector("#current-assets");
        assetsEl.textContent = this.assets;
        const monthEl = document.querySelector("#current-month");
        monthEl.textContent = this.month;
    }

    initializeGameplayData() {
        const minRecQuantEl = document.querySelector("#recommended-quantity-min");
        minRecQuantEl.textContent = this.demandCurve.minRecommendedQuantity;
        const maxRecQuantEl = document.querySelector("#recommended-quantity-max");
        maxRecQuantEl.textContent = this.demandCurve.maxRecommendedQuantity;
        const fixedCostEl = document.querySelector("#fixed-cost");
        fixedCostEl.textContent = this.fixedCost;
        const variableCostEl = document.querySelector("#variable-cost-per-unit");
        variableCostEl.textContent = this.variableCost;
    }

    clickSubmit(event) {
        const priceInputEl = document.querySelector("#price");
        const quantityInputEl = document.querySelector("#quantity");
        const price = priceInputEl.value;
        const quantity = quantityInputEl.value;
        this.submitPriceAndQuantity(price, quantity);
    }
}

class DemandCurve {
    intercept;
    slope;
    minRecommendedQuantity;
    maxRecommendedQuantity;

    constructor() {
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

const game = new Game();
game.initializeGameplayData();

// Testing
console.log("assets: " + game.assets);
console.log("month: " + game.month);
console.log("fc: " + game.fixedCost);
console.log("vc: " + game.variableCost);
const curve = game.demandCurve;
console.log("intercept: " + curve.intercept);
console.log("slope: " + curve.slope);
console.log("minQ: " + curve.minRecommendedQuantity);
console.log("maxQ: " + curve.maxRecommendedQuantity);
