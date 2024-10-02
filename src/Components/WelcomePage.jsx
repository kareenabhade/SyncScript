// src/Components/WelcomePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (roomId) {
      // Navigate to the code editor page with the room ID
      navigate(`/editor/${roomId}`);
    } else {
      alert('Please enter a room ID to join.');
    }
  };

  const handleCreateRoom = () => {
    // Navigate to the Create Room page
    navigate('/create-room');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Collaborative Code Editor!</h1>
      <p style={styles.quote}>
        "Code together, learn together!"
      </p>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Room ID"
        style={styles.input}
      />
      <div style={styles.buttonContainer}>
        <button onClick={handleJoinRoom} style={styles.button}>Join Room</button>
        <button onClick={handleCreateRoom} style={styles.button}>Create Room</button>
      </div>
    </div>
  );
};

// Styles for the component remain the same
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
  quote: {
    marginBottom: '20px',
    fontStyle: 'italic',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '1em',
    marginBottom: '20px',
    width: '300px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',  // Ensure buttons are in a row
    gap: '10px',           // Add space between buttons
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
    margin: '5px 0',      // Optional: Add margin top and bottom for vertical spacing
  },
};


export default WelcomePage;
