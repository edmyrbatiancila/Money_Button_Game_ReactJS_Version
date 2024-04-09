import React, { useEffect, useRef } from "react";

function GameHost({ messages, chancesLeft, gameOver }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

  return (
    <section className="gamehost">
      <h3 className="host">Game Host: </h3>
      <main className="texts_rendering">
        <div className="z-3 rounded-3 images">
        </div>
        {messages.map((message, index) => (
          <p key={index} className={message.value < 0 ? "fail" : "gain"}>
            {message.timestamp.toLocaleString()} - You pushed {message.risk}.
            Value is {message.value}. Your current money is{" ₱"}
            {message.currentMoney}.
          </p>
        ))}
        {gameOver && (
          <p>Game over!! You lost all your Money!. Please reset the game!!</p>
        )}
        {chancesLeft === 0 && !gameOver && (
          <p className="chance_message">
            No more chances for you. Please reset the game.
          </p>
        )}
        <div ref={messagesEndRef} />
      </main>
    </section>
  );
}

export default GameHost;
