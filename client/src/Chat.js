import React, { useState, useEffect } from 'react';

import { io } from 'socket.io-client';

import { Message } from './Message';
import { Board } from './Board'

// Create socket
const socket = io(process.env.REACT_APP_API_URL, {
  path: process.env.REACT_APP_SOCKET_PATH,
});

export const Chat = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(socket.connected)
    });

    socket.on('disconnect', () => {
      setIsConnected(socket.connected)
    });

    socket.on('join', (data) => {
      setMessages((prevMessages) => [...prevMessages, {...data, type: 'join'}]);
    })

    socket.on('chat', (data) => {
      setMessages((prevMessages) => [...prevMessages, {...data, type: 'chat'}]);
    })

    socket.on('board_init', (data) => {
      setBoardData((board_data) => [...board_data, {...data, type: 'board_init'}]);
    })

  }, []); 

  return (
  <>
      <h2>status: { isConnected ? 'connected' : 'disconnected'}</h2>

      <div>
        <h2>Board</h2>
        <Board boardData={boardData} />
      </div>



      <div
        style={{
        height: '500px',
        overflowY: 'scroll',
        border: 'solid black 1px',
        padding: '10px',
        marginTop: '15px',
        display: 'flex',
        flexDirection: 'column',
        }}
        >
        {messages.map((message, index) => (
          <Message message={message} key={index} /> 
        ))}
      </div>
      <input 
        type={"text"} 
        id="message"
        onChange={(event) => {
          const value = event.target.value.trim();
          setMessage(value);
        }}>
      </input>
      <button onClick={() => {
        if (message && message.length) {
          socket.emit('chat', message);
        }

        var messageBox = document.getElementById('message')
        messageBox.value = ''
        setMessage('');
      }}>Send</button>
  </>
  )
}
