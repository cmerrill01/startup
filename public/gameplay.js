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

    async setGameId() {
        this.gameId = 1;
        let games = [];
        try {
            const res = await fetch('/api/scores');
            games = await res.json();
            localStorage.setItem('games', JSON.stringify(games));
        } catch {
            games = JSON.parse(localStorage.getItem("games"));
        }
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

    async submitPriceAndQuantity(price, quantity) {
        const revenue = this.calculateRevenue(price, quantity);
        console.log("Revenue: " + revenue);
        const cost = this.calculateCost(quantity);
        console.log("Cost: " + cost);
        const profit = this.calculateProfit(revenue, cost);
        console.log("Profit: " + profit);
        this.assets = this.assets + profit;
        this.month++;
        if (this.month > maxMonths) {
            await this.finishGame();
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
        broadcastScore();
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

    async finishGame() {
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
        try {
            const res = await fetch('api/scores', {
                method: "POST",
                headers: {'content-type': 'application/json'},
                body: JSON.stringify(game),
            });

            const games = await res.json();
            localStorage.setItem('games', JSON.stringify(games));
        } catch {
            this.updateScoresLocal(game);
        }
    }

    updateScoresLocal(game) {
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

class PlayerTracker {
    otherPlayers;
    
    constructor() {
        this.otherPlayers = [];
        this.generateMockData();
        this.updateTable = this.updateTable.bind(this);
        // setInterval(this.updateTable, 5000);
    }

    generateMockData() {
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

        let counter = 0;
        setInterval(() => {
            // add an new player
            const index = counter % otherUsernames.length;
            this.otherPlayers.push(new OtherPlayer(otherUsernames[index]));
            
            // remove a player so the list doesn't grow indefinitely
            if (this.otherPlayers.length > 5) this.otherPlayers.shift();

            // update the players' scores
            for (const otherPlayer of this.otherPlayers) {
                const newScore = otherPlayer.currentScore + Math.round(Math.random() * 5000) - 2000;
                otherPlayer.updateScore(newScore);
            }

            counter++;
        }, 3000);
    }

    insertTableRow(parentSelector, playerData) {
        const tableRow = document.createElement("tr");
        for (const value of Object.values(playerData)) {
            const tableCell = document.createElement("td");
            tableCell.textContent = value;
            tableRow.appendChild(tableCell);
        }
        const tableBody = document.querySelector(parentSelector);
        tableBody.appendChild(tableRow);
    }

    updateTable() {
        const selector = "#other-players-table-body";
        const tableBodyEl = document.querySelector(selector);
        while (tableBodyEl.firstChild) {
            tableBodyEl.removeChild(tableBodyEl.firstChild);
        }
        for (const player of this.otherPlayers) {
            this.insertTableRow(selector, player);
        }
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

// WebSocket functionality

function updateOtherPlayerScore(gameId, username, score) {
    // Convert gameId to string
    gameId = String(gameId);

    // Search all <tr> elements in the table body
    const tableBody = document.getElementById("other-players-table-body");
    const rows = tableBody.getElementsByTagName("tr");
    
    // Check if a <tr> element with the provided gameId exists
    let rowToUpdate = null;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].id === gameId) {
            rowToUpdate = rows[i];
            break;
        }
    }
    
    // If a matching <tr> element exists, update its contents
    if (rowToUpdate) {
        const usernameCell = rowToUpdate.getElementsByTagName("td")[0];
        const scoreCell = rowToUpdate.getElementsByTagName("td")[1];
        usernameCell.textContent = username;
        scoreCell.textContent = score;
    } else {
        // Otherwise, create a new <tr> element
        const newRow = document.createElement("tr");
        newRow.id = gameId;
        
        // Create <td> elements for username and score
        const usernameCell = document.createElement("td");
        usernameCell.textContent = username;
        const scoreCell = document.createElement("td");
        scoreCell.textContent = score;
        
        // Append <td> elements to the new <tr> element
        newRow.appendChild(usernameCell);
        newRow.appendChild(scoreCell);
        
        // Append the new <tr> element to the table body
        tableBody.appendChild(newRow);
    }
}

function broadcastScore() {
    console.log("FIXME: Implement broadcastScore function");
}


// End WebSocket functionality

const game = new Game();
game.initializeGameplayData();

const playerTracker = new PlayerTracker();
