const maxFixedCost = 1000;
const maxVariableCost = 100;
const maxInterceptAboveFC = 1000;
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
        this.demandCurve = new DemandCurve(this.fixedCost);
    }
}

class DemandCurve {
    intercept;
    slope;
    minRecommendedQuantity;
    maxRecommendedQuantity;

    constructor(fixedCost) {
        // generate a random intercept
        this.intercept = fixedCost + Math.ceil(Math.random() * maxInterceptAboveFC);
        // generate a random slope
        this.slope = -1 * Math.ceil(Math.random() * (this.intercept - fixedCost < maxSlope ? this.intercept - fixedCost : maxSlope));
        // recommend min and max quantity
        // based on the generated slope and intercept
        this.minRecommendedQuantity = Math.floor((this.intercept / this.slope) * -0.1);
        this.maxRecommendedQuantity = Math.ceil((this.intercept / this.slope) * -0.9);
    }
}