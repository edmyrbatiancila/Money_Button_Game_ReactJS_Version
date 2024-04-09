import React, { useState } from 'react';
import Header from './Header';
import SectionBets from './SectionBets';
import GameHost from './GameHost';
import FailSound from './assets/sound/fail.mp3';
import ChancesSound from './assets/sound/chances_zero.mp3';
import GameOverSound from './assets/sound/game_over.mp3';
import './App.css';

function App() {
    const [currentMoney, setCurrentMoney] = useState(500);
    const [messages, setMessages] = useState([]);
    const [chancesLeft, setChancesLeft] = useState(10);
    const [gameOver, setGameOver] = useState(false);

    const handleBet = (risk, min, max) => {
        if(gameOver || chancesLeft <= 0) return;

        const betValue = Math.floor(Math.random() * (max - min + 1)) + min;
        const updatedMoney = currentMoney + betValue;
        setCurrentMoney(Math.max(updatedMoney, 0)); // Ensure currentMoney is not negative.
        const message = {
            timestamp: new Date(),
            risk: risk,
            value: betValue,
            currentMoney: updatedMoney,
        };
        setMessages((prevMessages) => [...prevMessages, message]);
        setChancesLeft(chancesLeft - 1);

        if(updatedMoney <= 0) {
            setGameOver(true);
            const gameOverAudio = new Audio(GameOverSound);
            gameOverAudio.play();
        }

        if(betValue < 0) {
            const negativeAudio = new Audio(FailSound);
            negativeAudio.play();
        }

        // Check if chancesLeft is zero and play the zero chances sound effect
        if(chancesLeft === 1) {
            const zeroChancesAudio = new Audio(ChancesSound);
            zeroChancesAudio.play();
        }
    };

    const resetGame = () => {
        setCurrentMoney(500);
        setMessages([]);
        setChancesLeft(10);
        setGameOver(false);
    };

    return(
        <div className='container'>
            <Header currentMoney={currentMoney} chancesLeft={chancesLeft} resetGame={resetGame} />
            <SectionBets handleBet={handleBet} chancesLeft={chancesLeft} gameOver={gameOver} />
            <GameHost  messages={messages} chancesLeft={chancesLeft} gameOver={gameOver} />
        </div>
    );
}

export default App;