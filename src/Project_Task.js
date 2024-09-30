import React, { useState, useRef } from "react";
import "./Project_Task.css";
const Project_Task = () => {
  const [points, setPoints] = useState([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [status, setStatus] = useState("LET'S PLAY");
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [pointCount, setPointCount] = useState();
  const timerRef = useRef(null);

  const generateRandomPoints = () => {
    let randomPoints = Array.from({ length: pointCount }, (_, i) => i + 1);
    randomPoints = randomPoints.sort(() => Math.random() - 0.5);
    setPoints(randomPoints);
    setNextNumber(1);
    setStatus("LET'S PLAY");
    setGameStarted(true);
    setTimeElapsed(0);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 0.2);
    }, 100);
  };

  const stopGame = () => {
    clearInterval(timerRef.current);
    setGameStarted(false);
  };

  const handleSelectPoint = (point) => {
    if (point === nextNumber) {
      if (nextNumber === points.length) {
        setStatus("ALL CLEARED");
        stopGame();
      } else {
        setNextNumber(nextNumber + 1);
      }
    } else {
      setStatus("GAME OVER");
      stopGame();
    }
  };

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div className="container">
      <h2> {status}</h2>
      <label>Time Elapsed: {timeElapsed.toFixed(1)} seconds</label>{" "}
      {!gameStarted ? (
        <div>
          <label>
            Points:
            <input
              className="avatar"
              type="number"
              value={pointCount}
              onChange={(e) => setPointCount(Number(e.target.value))}
            />
          </label>
          <button onClick={generateRandomPoints}>Start Game</button>
        </div>
      ) : (
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {points.map((point) => (
              <li
                onClick={() => handleSelectPoint(point)}
                style={{
                  display: "inline-block",
                  margin: "10px",
                  padding: "10px",
                  backgroundColor: point < nextNumber ? "red" : "lightgray",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "20px",
                }}
              >
                {point}
              </li>
            ))}
          </ul>
          <button onClick={restartGame}>Restart Game</button>
        </div>
      )}
    </div>
  );
};

export default Project_Task;
