import React, { useEffect, useState } from 'react';

const socket = new WebSocket('ws://localhost:8000/ws');

const StateDisplay = () => {
    const [state, setState] = useState(0);

    useEffect(() => {
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const newState = JSON.parse(event.data).state;
            console.log('Received state:', newState);
            setState(newState);
            // Update your UI with the received state
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        };

        // socket.on('state_update', (newState) => {
        //     console.log('new state:', newState);
        //     setState(newState);
        // });

        // return () => {
        //     socket.disconnect();
        // };
    }, []);

    return (
        <div>
            <h2>Current State: {state}</h2>
        </div>
    );
};

export default StateDisplay;
