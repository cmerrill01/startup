const maxFixedCost = 1000;
const maxVariableCost = 100;
const maxIntercept = 1000;
const maxSlope = 100;
const maxMonths = 12;

class Game {
    gameId;
    assets;
    month;
    fixedCost;
    variableCost;
    demandCurve;
    gameOver;

    constructor() {
        this.setGameId();
        this.assets = 0;
        this.month = 1;
        // generate random fixed cost
        this.fixedCost = Math.ceil(Math.random() * maxFixedCost);
        // generate random variable cost
        this.variableCost = Math.ceil(Math.random() * maxVariableCost);
        this.demandCurve = new DemandCurve();
        this.gameOver = false;
    }

    setGameId() {
        this.gameId = 1;
        const games = JSON.parse(localStorage.getItem("games"));
        if (games !== null) {
            for (const game of games) {
                if (this.gameId <= game.id) {
                    this.gameId = game.id + 1;
                }
            }
        }
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

    submitPriceAndQuantity(price, quantity) {
        const revenue = this.calculateRevenue(price, quantity);
        console.log("Revenue: " + revenue);
        const cost = this.calculateCost(quantity);
        console.log("Cost: " + cost);
        const profit = this.calculateProfit(revenue, cost);
        console.log("Profit: " + profit);
        this.assets = this.assets + profit;
        this.month++;
        if (this.month > maxMonths) {
            this.finishGame();
        }
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
        monthEl.textContent = (this.month > maxMonths ? "GAME OVER" : this.month);
    }

    clickSubmit(event) {
        if (this.gameOver === false) {
            const priceInputEl = document.querySelector("#price");
            const quantityInputEl = document.querySelector("#quantity");
            const price = priceInputEl.value;
            const quantity = quantityInputEl.value;
            this.submitPriceAndQuantity(price, quantity);
        }
    }

    finishGame() {
        this.gameOver = true;
        let username = localStorage.getItem("username");
        if (username === null) {
            username = "unknown_user";
        }
        const game = {
            id: this.gameId,
            username: username,
            score: this.assets,
        }
        let games = JSON.parse(localStorage.getItem("games"));
        if (games === null) {
            games = [];
        }
        games.push(game);
        localStorage.setItem("games", JSON.stringify(games));
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

class OtherPlayer {
    username;
    currentScore;

    constructor(username, currentScore = 0) {
        this.username = username;
        this.currentScore = currentScore;
    }

    updateScore(currentScore) {
        this.currentScore = currentScore;
    }
}

const game = new Game();
game.initializeGameplayData();

const otherUsernames = [
    "adam_smith",
    "john_keynes",
    "milton_friedman",
    "karl_marx",
    "adam_ferguson",
    "thomas_malthus",
    "frédéric_bastiat",
    "david_ricardo",
    "john_stuart_mill",
    "friedrich_hayek"
];

let otherPlayers = [];

let counter = 0;
setInterval(() => {
    // add an new player
    const index = counter % otherUsernames.length;
    otherPlayers.push(new OtherPlayer(otherUsernames[index]));
    
    // remove a player so the list doesn't grow indefinitely
    if (otherPlayers.length > 5) otherPlayers.shift();

    // update the players' scores
    for (const otherPlayer of otherPlayers) {
        const newScore = otherPlayer.currentScore + Math.round(Math.random() * 5000) - 2000;
        otherPlayer.updateScore(newScore);
    }

    // Testing
    console.log(counter);
    console.log(JSON.stringify(otherPlayers));

    counter++;
}, 5000);

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
