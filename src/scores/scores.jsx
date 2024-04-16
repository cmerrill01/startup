import React, { useState } from 'react';

export function Scores() {
  const maxScores = 5;
  const [scores, setScores] = React.useState([]);
  React.useEffect(() => {
    fetch('/api/scores')
      .then((response) => response.json())
      .then((scores) => {
        setScores(scores
          .sort((game1, game2) => game2.score - game1.score)
          .slice(0, maxScores)
        );
        localStorage.setItem('games', JSON.stringify(scores));
      })
      .catch(() => {
        const scoresText = localStorage.getItem('games');
        if (scoresText) {
          setScores(JSON.parse(scoresText));
        }
      });
  }, []);

  if (!Array.isArray(scores) || !scores) {
    // Handle the case when scores is not available
    return (
      <main className="container-fluid bg-light text-dark">
        <section id="global-scores">
          <h1>Top Scores</h1>
          <p>No scores available</p>
        </section>
      </main>
    );
  }

  return (
    <main className="container-fluid bg-light text-dark">
      <section id="global-scores">
        <h1>Top Scores</h1>
        <table className="table" id="scores-table">
          <thead>
            <tr>
              <th>Game ID</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          {scores.length > 0 && (
            <tbody id="scores-table-body">
              {scores.map(game => (
                <tr key={game._id}>
                  <td>{game.id}</td>
                  <td>{game.username}</td>
                  <td>{game.score}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </section>
    </main>
  );
}