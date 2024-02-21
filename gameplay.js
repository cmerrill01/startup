class Game {
    assets;
    month;
    demandCurve;
    fixedCost;
    variableCost;

    constructor() {
        this.assets = 0;
        this.month = 1;
        this.demandCurve = new DemandCurve();
        // generate random fixed cost
        // generate random variable cost
    }
}

class DemandCurve {
    intercept;
    slope;
    minRecommendedQuantity;
    maxRecommendedQuantity;

    constructor() {
        // generate a random intercept
        // generate a random slope
        // recommend min and max quantity
        // based on the generated slope and intercept
    }
}