import React, { useState } from 'react';
import './App.css';
import Input from './components/Input'
import Output from './components/Output'

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [serverStatus, setServerStatus] = useState('up');

  return (
    <div
      className="flex flex-col items-center w-full h-full mt-20"
    >
      <Input
        value={input}
        onInputChange={setInput}
        onMessageReceived={setOutput}
        serverStatus={serverStatus}
        onServerStatusChange={setServerStatus}
      />
      <Output value={output} serverStatus={serverStatus} />
    </div>
  );
}

export default App;
