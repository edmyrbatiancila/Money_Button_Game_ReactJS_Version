import React from "react";
import { Button } from "react-bootstrap";

function Header({ currentMoney, chancesLeft, resetGame }) {
  return (
    <header className="money">
      <section className="money_reset">
        <h1 className="coin">
          Your Money: <span className={currentMoney === 0 ? 'zero' : 'wallet' && chancesLeft === 0 ? 'final_money' : 'wallet'}>₱{currentMoney}</span>
        </h1>
        <Button className="reset" variant="danger" onClick={resetGame}>
          Reset Game
        </Button>
      </section>
      <h3 className="chance">
        Chance/s left: <span>{chancesLeft}</span>
      </h3>
    </header>
  );
}

export default Header;
