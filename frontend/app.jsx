import { useState, useEffect } from "react";
import { io } from "socket.io-client";

function App() {
    const [currentState, setCurrentState] = useState('IDLE');

    useEffect(() => {
      const socket = io('http://localhost:3000');

      socket.on('stateChange', (newState) =>{
        setCurrentState(newState)
      })
    
      return () => {
        socket.disconnect(); // disconnects when component unmounts
      }
    }, []);

    return (
    <div>
        <h1>Dishwasher Controller</h1>
        {/* child components will go here */}
        <h2>Current cycle: </h2>
        {/* child components will go here */}
        <h2>Time elapsed: </h2>
        {/* child components will go here */}
        <h2>ControlPanel</h2>
        {/* child components will go here */}
        <h2>Alerts</h2>
        {/* child components will go here */}
        <h2>Sensors</h2>
        {/* child components will go here */}
    </div>
);
}

export default App;