// src/Components/CreateRoomPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateRoomPage = () => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleGenerateRoomId = () => {
    if (userName) {
      // Generate a unique room ID (for example, a random number)
      const newRoomId = Math.floor(Math.random() * 10000).toString();
      setRoomId(newRoomId);
    } else {
      alert('Please enter your name.');
    }
  };

  const handleJoinRoom = () => {
    if (roomId) {
      // Navigate to the code editor page with the room ID
      navigate(`/editor/${roomId}`);
    } else {
      alert('Please generate a room ID first.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Create a Room</h1>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Enter Your Name"
        style={styles.input}
      />
      <button onClick={handleGenerateRoomId} style={styles.button}>Generate Room ID</button>

      {roomId && (
        <div style={styles.roomInfo}>
          <h2 style={styles.infoTitle}>Room Created!</h2>
          <p style={styles.infoText}>Your Name: {userName}</p>
          <p style={styles.infoText}>Room ID: {roomId}</p>
          <button onClick={handleJoinRoom} style={styles.button}>Join Room</button>
        </div>
      )}
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '2em',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    marginBottom: '20px',
    width: '300px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  roomInfo: {
    marginTop: '20px',
    textAlign: 'center',
  },
  infoTitle: {
    fontSize: '1.5em',
    color: '#333',
  },
  infoText: {
    fontSize: '1em',
    color: '#555',
  },
};

export default CreateRoomPage;
