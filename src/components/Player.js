import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const Player = ({ setPlayer1Name, setPlayer2Name, startGame }) => {
  const [p1Name, setP1Name] = useState('');
  const [p2Name, setP2Name] = useState('');

  const handleSubmit = () => {
    setPlayer1Name(p1Name);
    setPlayer2Name(p2Name);
    startGame();
  };

  return (
    <Box textAlign="center">
      <Typography variant="h4" gutterBottom>
       <b>Welcome to Stone Paper Scissors!</b> 
      </Typography>
    
      {/* Input fields for Player Names */}
      <TextField
        label="Please enter your name"
        variant="outlined"
        value={p1Name}
        onChange={(e) => setP1Name(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        label="Please enter your name"
        variant="outlined"
        value={p2Name}
        onChange={(e) => setP2Name(e.target.value)}
        margin="normal"
        fullWidth
      />

    

      {/* Display Names and Button in a Single Line */}
      {p1Name && p2Name && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginTop="20px"
        >
         
          {/* "Start Game" Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginLeft: '10px' }}
          >
            Start Game
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Player;
