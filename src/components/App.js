import React, { useState, useEffect } from "react";
import "../styles/App.css";

const WORD_LIST = ["apple", "banana", "cherry", "grape", "orange"];

function App() {
  const [word, setWord] = useState(WORD_LIST[0]);
  const [flashWord, setFlashWord] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (flashWord) {
      const timerId = setTimeout(() => {
        setFlashWord(false);
      }, 500);
      return () => clearTimeout(timerId);
    }
  }, [flashWord]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userInput.toLocaleLowerCase() === word.toLocaleLowerCase()) {
      setResult("You won!");
    } else {
      setResult("You lost!");
    }
  };
  const handleRestartClick = () => {
    setIndex((prevIndex) => (prevIndex + 1) % WORD_LIST.length);
    // setWord(WORD_LIST[index]);
    setFlashWord(true);
    setResult("");
    setUserInput("");
  };

  return (
    <div class="mini-game-container">
      <h2 class="mini-game-title">Mini Game</h2>
      {flashWord ? (
        <p class="mini-game-word">{word}</p>
      ) : (
        <form class="mini-game-form" onSubmit={handleFormSubmit}>
          <input
            class="mini-game-input"
            type="text"
            value={userInput}
            onChange={handleInputChange}
          />
          <button class="mini-game-button" type="submit">
            Check Answer
          </button>
        </form>
      )}

      {result && (
        <>
          <p class="mini-game-result">{result}</p>
          <button class="mini-game-restart-button" onClick={handleRestartClick}>
            Restart
          </button>
        </>
      )}
    </div>
  );
}

export default App;
