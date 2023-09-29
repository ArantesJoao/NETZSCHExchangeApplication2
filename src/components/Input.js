import React, { useRef, useEffect } from 'react';
import { TbPlugX } from 'react-icons/tb'

function Input({
  value, onInputChange, onMessageReceived, serverStatus, onServerStatusChange
}) {

  const ws = useRef(null);

  useEffect(() => {
    checkServerStatus();

    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [onMessageReceived]);

  const checkServerStatus = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/data/react');
      if (response.ok) {
        setupWebSocket();
        onServerStatusChange('up')
      } else {
        onServerStatusChange('down')
      }
    } catch (error) {
      console.log('hit')
      setTimeout(checkServerStatus, 1000);
      onServerStatusChange('down')
    }
  };

  const setupWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket('ws://localhost:3001');

    ws.current.onmessage = handleWebSocketMessage;

    ws.current.onerror = (error) => {
      onServerStatusChange('down');
    };

    ws.current.onopen = () => {
      onServerStatusChange('up');
    };

    ws.current.onclose = () => {
      onServerStatusChange('down');
    };
  };

  const handleWebSocketMessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.source === 'net') {
      onMessageReceived(message.data);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onInputChange(inputValue);
    sendMessage(inputValue);
  };

  const sendMessage = (inputValue) => {
    const message = {
      source: 'react',
      data: inputValue || " "  // ensure to send empty space if !value
    };
    ws.current.send(JSON.stringify(message));
  };

  return (
    <div className='flex flex-col w-full h-full justify-center items-center'>
      <div className='w-1/4 relative'>
        <label className='font-bold'>
          Say something to your fellow NETZSCHE Exchanger!
        </label>
        <textarea
          value={value}
          onChange={handleInputChange}
          className='w-full h-32 border border-neutral-950 rounded mt-1 px-1.5 resize-none'
          disabled={serverStatus === 'down'}
        />
        {serverStatus === 'down' &&
          <>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
            <div
              className="fixed top-1/2 left-1/2 flex flex-col justify-center items-center transform -translate-x-1/2 -translate-y-1/2 bg-white p-3 text-black text-xl rounded shadow-xl border border-neutral-400 w-[650px] h-[400px] z-30"
            >
              <div className="bg-red-100 rounded-full p-3 mb-3 -mt-6">
                <TbPlugX color='red' size={48} />
              </div>
              <p className='font-bold'>Oops!</p>
              <p className='text-center'>
                Looks like the server is down! <br /> Run <code>npm start</code> inside your server folder to get it back up! <br /> You may need to refresh your screen.
              </p>
            </div>
          </>
        }
      </div>
    </div>
  );

}

export default Input;
