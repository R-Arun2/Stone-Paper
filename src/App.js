import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Typography, Card, CardContent, Button, AppBar, Toolbar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HistoryIcon from '@mui/icons-material/History';
import Player from './components/Player';
import ChoiceButtons from './components/ChoiceButtons';
import Scoreboard from './components/Scoreboard';
import GameHistory from './components/GameHistory';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // For animation styles

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
  },
});

const App = () => {
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [player1Choice, setPlayer1Choice] = useState('');
  const [player2Choice, setPlayer2Choice] = useState('');
  const [round, setRound] = useState(1);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [message, setMessage] = useState('');
  const [gameHistory, setGameHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const choices = ['Stone', 'Paper', 'Scissors'];

  const winnerMap = useMemo(() => ({
    Stone: { winsAgainst: 'Scissors', losesAgainst: 'Paper' },
    Paper: { winsAgainst: 'Stone', losesAgainst: 'Scissors' },
    Scissors: { winsAgainst: 'Paper', losesAgainst: 'Stone' },
  }), []);

  const determineWinner = useCallback((p1, p2) => {
    if (p1 === p2) return 'Tie';
    if (winnerMap[p1].winsAgainst === p2) {
      setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
      return 'Player 1 Wins!';
    } else {
      setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
      return 'Player 2 Wins!';
    }
  }, [winnerMap]);

  const handleRound = useCallback(() => {
    if (player1Choice && player2Choice) {
      const outcome = determineWinner(player1Choice, player2Choice);
      setMessage(outcome === 'Tie' ? 'It’s a Tie!' : outcome);
      setGameHistory(prev => [...prev, { player1Choice, player2Choice, outcome }]);

      setPlayer1Choice('');
      setPlayer2Choice('');
      setRound(prev => prev + 1);
      if (outcome.includes('Wins')) setCelebrate(true);
    }
  }, [player1Choice, player2Choice, determineWinner]);

  const toggleHistory = () => {
    setShowHistory(prev => !prev);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    if (celebrate) {
      const timer = setTimeout(() => setCelebrate(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [celebrate]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <PlayArrowIcon fontSize="large" />
          <Typography variant="h6" style={{ flexGrow: 1, fontSize: '1.5rem' }}>Stone Paper</Typography>
          <Button color="inherit" onClick={toggleHistory}>
            <HistoryIcon fontSize="large" />
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className="mt-5">
        {/* Conditional Rendering: Show Player form before the game starts */}
        {!gameStarted ? (
          <Card className={`mb-4 card card-animation`}>
            <CardContent>
              <Player
                setPlayer1Name={setPlayer1Name}
                setPlayer2Name={setPlayer2Name}
                startGame={startGame}
              />
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Who vs Who Section */}
            <Card className={`mb-4 card card-animation`}>
              <CardContent className="who-vs-who-section">
                <Typography variant="h5" align="center" className="who-vs-who">
                  {player1Name} vs {player2Name}
                </Typography>
              </CardContent>
            </Card>
            {/* Display round and choices only after the names are entered */}
            <Card className={`mb-4 card card-animation`}>
              <CardContent>
                <Typography variant="h4" align="center">Round: {round}/6</Typography>
                <ChoiceButtons
                  playerName={player1Name}
                  choices={choices}
                  setPlayerChoice={setPlayer1Choice}
                  playerChoice={player1Choice}
                />
                <ChoiceButtons
                  playerName={player2Name}
                  choices={choices}
                  setPlayerChoice={setPlayer2Choice}
                  playerChoice={player2Choice}
                />
                {player1Choice && player2Choice && (
                  <Typography variant="h5" align="center" className={message === 'It’s a Tie!' ? 'tie-message' : ''}>
                    {message}
                  </Typography>
                )}
                <Button variant="contained" color="primary" onClick={handleRound}>
                  <PlayArrowIcon /> Play
                </Button>
              </CardContent>
            </Card>
            <Scoreboard player1Name={player1Name} player2Name={player2Name} score={score} />
          </>
        )}

        {celebrate && <div className="celebrate-animation">🎉 Winner! 🎉</div>}
        
        {showHistory && <GameHistory gameHistory={gameHistory} />}
      </Container>
    </ThemeProvider>
  );
};

export default App;
