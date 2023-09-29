import React, { useRef, useEffect } from 'react';

function Input({ value, onInputChange, onMessageReceived }) {
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:3001');

    ws.current.onopen = () => {
      console.log("Connected to the WebSocket");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.source === 'net') {
        onMessageReceived(message.data);
      }
    };

    return () => {
      ws.current.close();
    };
  }, [onMessageReceived]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onInputChange(inputValue);
    const message = {
      source: 'react',
      data: inputValue || " "  // ensure to send empty space if !value
    };
    console.log("Sending from React:", message);
    ws.current.send(JSON.stringify(message));
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <div className='w-1/4'>
        <label
          className='font-bold'
        >
          Say something to your fellow NETZSCHE Exchanger!
        </label>
        <textarea
          value={value}
          onChange={handleInputChange}
          className='w-full h-32 border border-neutral-950 rounded mt-1
          px-1.5 resize-none'
        />
      </div>
    </div>
  );
}

export default Input;
