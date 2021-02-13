import React from "react";
import "./Board.css";

function Board() {
  return (
    <div>
      <div className="row">
        <div className="cards"></div>
        <div className="cards"></div>
      </div>
      <div className="row">
        <div className="cards"></div>
        <div className="cards"></div>
      </div>
    </div>
  );
}

export default Board;
