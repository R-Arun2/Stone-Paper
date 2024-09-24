import React from 'react';
import Button from '@mui/material/Button';

const RoundControls = ({ handleRound, undoRound }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleRound}>
        Play Round
      </Button>
      <Button variant="outlined" color="secondary" onClick={undoRound} style={{ marginLeft: '10px' }}>
        Undo Last Round
      </Button>
    </div>
  );
  
};

export default RoundControls;
