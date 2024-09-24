import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Scoreboard = ({ player1Name, player2Name, score, message }) => {
  return (
    <Card className="mt-4">
      <CardContent>
        <Typography variant="h5" align="center">{message}</Typography>
        <Typography variant="h6" align="center">
          {player1Name}: {score.player1} - {player2Name}: {score.player2}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Scoreboard;
