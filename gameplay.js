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
        // Calculate revenue
        // Calculate cost
        // Calculate profit
        // Update gameplay data
    }

    calculateRevenue(price, quantity) {
        // Check whether the market will buy this quantity or less at this price
        const quantityDemanded = Math.round((price - this.demandCurve.intercept) / this.demandCurve.slope);
        const quantitySold = (quantity <= quantityDemanded ? quantity : quantityDemanded);
        return price * quantitySold;
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



// Testing
const game = new Game();
console.log("assets: " + game.assets);
console.log("month: " + game.month);
console.log("fc: " + game.fixedCost);
console.log("vc: " + game.variableCost);
const curve = game.demandCurve;
console.log("intercept: " + curve.intercept);
console.log("slope: " + curve.slope);
console.log("minQ: " + curve.minRecommendedQuantity);
console.log("maxQ: " + curve.maxRecommendedQuantity);