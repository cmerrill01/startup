const maxScores = 5;


async function loadScores() {
    let scores = [];
    try {
        const res = await fetch('/api/scores');
        scores = await res.json();
        localStorage.setItem('games', JSON.stringify(scores));
    } catch {
        scores = JSON.parse(localStorage.getItem("games"));
    }

    scores.sort((game1, game2) => game2.score - game1.score);
    displayScores(scores, maxScores);
}

function displayScores(scores, maxScores = 5) {
    for (const score of scores.slice(0, maxScores)) {
        insertTableRow("#scores-table-body", score);
    }
}

function insertTableRow(parentSelector, gameData) {
    const tableRow = document.createElement("tr");
    /*
    for (const value of Object.values(gameData)) {
        const tableCell = document.createElement("td");
        tableCell.textContent = value;
        tableRow.appendChild(tableCell);
    }
    */
    for (const key in gameData) {
        if (key !== "_id") {
            const value = gameData[key];
            const tableCell = document.createElement("td");
            tableCell.textContent = value;
            tableRow.appendChild(tableCell);
        }
    }
    const tableBody = document.querySelector(parentSelector);
    tableBody.appendChild(tableRow);
}

loadScores();