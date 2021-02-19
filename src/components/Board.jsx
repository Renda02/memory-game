import React, { useState } from "react";

import Color from "color";

const colorList = [
  "#1abc9c",
  "#2ecc71",
  "#e74c3c",
  "#2c3e50",
  "#9b59b6",
  "#5e3458",
];

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function Board() {
  const [size, setSize] = useState(2);
  const [score, setScore] = useState(0);
  const [disabled,setDisabled]=useState(false)

  const cubes = [];

  // chose a random cube
  const randomCubeIndex = getRandomArbitrary(0, size * size - 1);

  // get color
  const cubeColor = colorList[size - 1];

  //console.log(randomCubeIndex, "randomCubeIndex");

  // go to next step
  const onSpecialCubeClick = () => {
    if (score === 4) {
      let name = prompt("What is your name?");
      alert(`Congratulations , ${name} . You've completed the game!! `);
      alert(`Your score is ${score}.`)
    } else {
      setSize(size + 1);
      setScore(score + 1);
    }
  };

  for (let i = 0; i < size * size; i++) {
    if (i === randomCubeIndex) {
      // special cube
      cubes.push({
        color: Color(cubeColor).saturate(0.6),
        onclick: onSpecialCubeClick,
      });
    } else {
      cubes.push({
        color: cubeColor,
        onclick: () => alert("Oops! wrong color. Try again"),
      });
    }
  }

  //cube sizing
  const width = `calc(${(1 / size) * 100}% - ${2 * size}px)`;
  const height = `calc(${(1 / size) * 100}% - ${2 * size}px`;

  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default Board;
