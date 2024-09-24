import React from 'react';
import { Button, Box, Typography } from '@mui/material';

const ChoiceButtons = ({ playerName, choices, setPlayerChoice, playerChoice }) => {
  return (
    <Box textAlign="center" my={2}>
      <Typography variant="h6">{playerName}'s Turn</Typography>
      <Box>
        {choices.map(choice => (
          <Button
            key={choice}
            variant={playerChoice === choice ? 'contained' : 'outlined'} // Highlight the selected choice
            color={playerChoice === choice ? 'secondary' : 'primary'}
            onClick={() => setPlayerChoice(choice)}
            sx={{ mx: 1 }}
          >
            {choice}
          </Button>
        ))}
      </Box>
      {playerChoice && (
        <Typography variant="body1" color="textSecondary" mt={2}>
          {playerName} has selected: {playerChoice}
        </Typography>
      )}
    </Box>
  );
};

export default ChoiceButtons;
