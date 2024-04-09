import React, { useRef } from "react";
import BetSound from './assets/sound/bet_sound.mp3';
import { Card, Button } from "react-bootstrap";

function SectionBets({ handleBet, chancesLeft, gameOver }) {
    // Below is for the audio element:
    const audioRef = useRef(null);

  const riskItems = [
    { risk: "Low Risk", min: -25, max: 100 },
    { risk: "Moderate Risk", min: -100, max: 1000 },
    { risk: "High Risk", min: -500, max: 2500 },
    { risk: "Severe Risk", min: -3000, max: 5000 },
  ];

  const handleButtonClick = () => {
    // Play a sound when click bet buttons.
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <section className="card_bets">
        {/* Below is rendering the audio element */}
        <audio ref={audioRef} src={BetSound} style={{display: "none"}}  />
      <div className="py-3 row row-cols-md-5 g-3 cardlist">
        {riskItems.map((item, index) => (
          <Card className="risks" key={index}>
            <Card.Body>
              <Card.Title>{item.risk}</Card.Title>
              <Button
                variant="success"
                className="btn_bet"
                onClick={() => {
                    handleBet(item.risk, item.min, item.max);
                    handleButtonClick();
                }}
                disabled={chancesLeft === 0 || gameOver}
              >
                Bet
              </Button>
              <Card.Text>
                by {item.min} up to {item.max}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default SectionBets;
