import React from 'react';
import { Game } from './game';
import { OtherPlayers } from './otherPlayers';

// Set up WebSocket with a secure or unsecure protocol
const protocol = window.location.protocol === "http:" ? "ws" : "wss";
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Let the user know we have opened a websocket connection
socket.onopen = (event) => {
    console.log("Successfully connected to WebSocket");
};

socket.onclose = (event) => {
    console.log("Disconnected from WebSocket");
}

export function Gameplay() {
        return (
        <main className="container-fluid bg-light text-dark gameplay-screen">
            <Game socket={socket} />
            <OtherPlayers socket={socket} />
        </main>
    );
}