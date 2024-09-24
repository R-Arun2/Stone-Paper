import React from 'react';

const PlayerForm = ({ player1Name, player2Name, setPlayer1Name, setPlayer2Name }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={player1Name}
        onChange={(e) => setPlayer1Name(e.target.value)}
        placeholder="Player 1 Name"
        className="form-control mb-2"
      />
      <input
        type="text"
        value={player2Name}
        onChange={(e) => setPlayer2Name(e.target.value)}
        placeholder="Player 2 Name"
        className="form-control"
      />
    </div>
  );
};

export default PlayerForm;
