const maxScores = 5;
const scores = JSON.parse(localStorage.getItem("games"));

scores.sort((game1, game2) => game2.score - game1.score);

function insertTableRow(parentSelector, gameData) {
    const tableRow = document.createElement("tr");
    for (const value of Object.values(gameData)) {
        const tableCell = document.createElement("td");
        tableCell.textContent = value;
        tableRow.appendChild(tableCell);
    }
    const tableBody = document.querySelector(parentSelector);
    tableBody.appendChild(tableRow);
}

for (const score of scores.slice(0, maxScores)) {
    insertTableRow("#scores-table-body", score);
}