import React, { useState,useEffect } from "react";

import Color from "color";

const colorList = [
  "#ffda79",
  "#e74c3c",
  "#1abc9c",
  "#84817a",
  "#2ecc71",
  "#ccae62",

  "#f7f1e3",
  "#2c3e50",
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
  const [stop, setStop] = useState(0);
  const [counter, setCounter] = React.useState(10);
  

  const cubes = [];

  //time
  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  // chose a random cube
  const randomCubeIndex = getRandomArbitrary(0, size * size - 1);

  // get color
  const cubeColor = colorList[size - 1];

  //console.log(randomCubeIndex, "randomCubeIndex");

  //stop game
  const stopGame = () => {
   
    setStop();
    
    setScore(0);
    setSize(2);
  };

  // go to next step
  const onSpecialCubeClick = () => {
    // if (score === 4) {
    //let name = prompt("What is your name?");
    //alert(`Congratulations , ${name} . You've completed the game!! `);
    //alert(`Your score is ${score}.`)
    //} else {
    setSize(size + 1);
    setScore(score + 1);
   setCounter(15);
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
        onclick: stopGame,
      });
    }
  }

  //cube sizing
  const width = `calc(${(1 / size) * 100}% - ${2 * size}px)`;
  const height = `calc(${(1 / size) * 100}% - ${2 * size}px`;

  return (
    <>
      <div>
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
      </div>
    </>
  );
}

export default Board;
