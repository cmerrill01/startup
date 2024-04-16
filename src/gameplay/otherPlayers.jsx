import React, { useState } from 'react';

export function OtherPlayers({socket}) {
    const [otherPlayerTracker, updateOtherPlayerTracker] = React.useState([]);

    function updateOtherPlayerScore(connectionId, username, score) {
        // Convert connectionId to string
        connectionId = String(connectionId);
        let playerToUpdate = null;

        for (const player of otherPlayerTracker) {
            if (player.connectionId === connectionId) {
                playerToUpdate = player;
                break;
            }
        }

        if (playerToUpdate) {
            playerToUpdate.username = username;
            playerToUpdate.score = score;
        } else {
            const newPlayer = {
                connectionId: connectionId,
                username: username,
                score: score
            }
            updateOtherPlayerTracker([...otherPlayerTracker, newPlayer]);
        }
    }

    // remove a player from the "currently playing" table if their WebSocket connection breaks
    function removePlayerFromTable(connectionId) {
        connectionId = String(connectionId);
        updateOtherPlayerTracker(otherPlayerTracker.filter(player => player.connectionId !== connectionId));
    }
    
    // When we receive a score from another player, show it on the table
    socket.onmessage = async (event) => {
        const text = await event.data;
        const gameData = JSON.parse(text);

        if (gameData.type === "updateScore") {
            updateOtherPlayerScore(gameData.connectionId, gameData.username, gameData.score);
        } else if (gameData.type === "playerLeft") {
            removePlayerFromTable(gameData.connectionId);
        }
    }

    return (
        <section className="gameplay-section">
            <h1>Currently Playing</h1>
            <table className="table" id="other-players-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Current score</th>
                    </tr>
                </thead>
                <tbody id="other-players-table-body">
                    {otherPlayerTracker.map(player => (
                        <tr key={player.connectionId}>
                            <td>{player.username}</td>
                            <td>{player.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}