import React, { useState, useEffect } from "react";

import Color from "color";

const colorList = [
  "#ffda79",
  "#e74c3c",
  "#1abc9c",
  "#2c3e50",
  "#ccae62",
  "#2ecc71",
  "#84817a",

  "#f7f1e3",
  "#9b59b6",
  "#5e3458",
  "#474787",
];

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Board() {
  const [size, setSize] = useState(2);
  const [score, setScore] = useState(0);
  const [players, setPlayers] = useState([]);
  const [difficulty, setDifficulty] = useState(1);

  // counter try
  const [timerId, setTimerId] = useState([]);
  const [counter, setCounter] = useState(10);

  const cubes = [];

  // counter trial
  /*
  useEffect(() => {
    if (counter > 0) {
      const id = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      setTimerId(id);
    } else if (counter === 0) {
      stopGame();
    }
  }, [counter]);
  */

  // chose a random cube
  const randomCubeIndex = getRandomArbitrary(0, size * size - 1);

  // get color
  const cubeColor = colorList[size - 1];

  //console.log(randomCubeIndex, "randomCubeIndex");

  //stop game
  const stopGame = () => {
    setPlayers([...players, score]);
    setScore(0);
    setSize(2);
  };

  // go to next step
  const onSpecialCubeClick = () => {
    // stops timer
    clearTimeout(timerId);
    setSize(size + 1);
    setScore(score + 1);
    setCounter(10);
  };

  //difficulty
  let saturation = 0.6;
  if (difficulty === 2) {
    saturation = 0.7;
  } else if (difficulty === 3) {
    saturation = 0.9;
  }

  for (let i = 0; i < size * size; i++) {
    if (i === randomCubeIndex) {
      // special cube
      cubes.push({
        color: Color(cubeColor).saturate(saturation),
        onclick: onSpecialCubeClick,
      });
    } else {
      cubes.push({
        color: cubeColor,
        onclick: stopGame,
      });
    }
  }

  const restartWithDiff = (diff) => {
    setDifficulty(diff);
    stopGame();
  };

  //cube sizing
  const width = `calc(${(1 / size) * 100}% - ${2 * size}px)`;
  const height = `calc(${(1 / size) * 100}% - ${2 * size}px`;

  return (
    <>
      <div>
        <h2>Difficulty</h2>
        <div>
          <button onClick={() => restartWithDiff(2)}>2</button>
          <button onClick={() => restartWithDiff(3)}>3</button>
        </div>
        <h2>Time Remaining:{counter}</h2>
        <h3>Scoreboard: {score}</h3>
        <div className="board">
          {cubes.map((cb) => (
            <div
              className="cube"
              style={{ width, height, backgroundColor: cb.color }}
              onClick={cb.onclick}
            ></div>
          ))}
        </div>
        <div>
          <h3>Leaderboard:</h3>
          {players.map((score, index) => (
            <p>{`Player ${index} : ${score}`}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Board;
