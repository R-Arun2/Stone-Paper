import React from 'react';

const GameHistory = ({ gameHistory }) => {
  return (
    <div className="mt-4">
      <h2>Game History</h2>
      <ul>
        {gameHistory.map((game, index) => (
          <li key={index}>
            {game.player1Choice} vs {game.player2Choice} - {game.outcome}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameHistory;
