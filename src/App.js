import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/data/net');
        const data = await response.text();
        setOutput(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = async (e) => {
    setInput(e.target.value);
    try {
      await fetch('http://localhost:3001/api/data/react', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: e.target.value }),
      });
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="App">
      <input value={input} onChange={handleInputChange} />
      <div>{output}</div>
    </div>
  );
}

export default App;
