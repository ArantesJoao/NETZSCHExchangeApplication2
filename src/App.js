import React, { useState } from 'react';
import './App.css';
import Input from './components/Input'
import Output from './components/Output'

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  return (
    <div className="App">
      <Input
        value={input}
        onInputChange={setInput}
        onMessageReceived={setOutput}
      />
      <Output value={output} />
    </div>
  );
}

export default App;
