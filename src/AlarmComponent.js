import React, {useState, useEffect} from 'react';
import alarmIcon from './alarm.svg';
import "./AlarmComponent.css";

const socket = new WebSocket('ws://localhost:8000/ws');

const AlarmComponent = () => {
    const [isAlarmOn, setAlarm] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Connect to the WebSocket server
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            const newState = JSON.parse(event.data).state;
            console.log('Received state:', newState);
            setAlarm(newState);
            // Update your UI with the received state
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        socket.onerror = (error) => {
            console.log('WebSocket error:', error);
        };
    }, []);

    // const handleButtonClick = () => {
    //     // Send a message to the WebSocket server to turn off the alarm
    //     // Replace 'http://your-websocket-server-url' with the actual server URL
    //     const socket = socketIOClient('http://your-websocket-server-url');
    //     socket.emit('turnOffAlarm');
    // };

    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div style={{textAlign: 'center'}}>
                <h1>Santa María</h1>
                <h2>Monitoreo del local</h2>
                {
                    isAlarmOn
                        ? <img className="alarm" src="https://i.gifer.com/8iE9.gif" alt="alarm on"/>
                        : <img className="alarm" src={alarmIcon} alt="Alarm off"/>
                }

                <h2>Estado: {isAlarmOn? 'Encendido': 'Apagada'}</h2>
                {isAlarmOn && <div>
                    <button>Apagar</button>
                </div>}

            </div>
        </div>
    );
};

export default AlarmComponent;
