import React, { useState, useEffect } from "react";
import "./index.css";

function Chronometer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  const startChrono = () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopChrono = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  };

  const resetChrono = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setSeconds(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps([...laps, seconds]);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  return (
    <div className="timer-container">
      <div className="timer">
        <h2>Chronomètre</h2>
        <div className="text-3xl font-bold mb-4">
          {formatTime(seconds)}
        </div>

        <div className="flex gap-4 mb-4">
          {!isRunning ? (
            <button
              onClick={startChrono}
              className="bg-green-500 text-white p-2 rounded"
            >
              Démarrer
            </button>
          ) : (
            <button
              onClick={stopChrono}
              className="bg-red-500 text-white p-2 rounded"
            >
              Arrêter
            </button>
          )}

          <button
            onClick={resetChrono}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Réinitialiser
          </button>

          <button
            onClick={addLap}
            className="bg-yellow-500 text-white p-2 rounded"
          >
            Ajouter un Tour
          </button>
        </div>

        {laps.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg">Tours :</h3>
            <ul>
              {laps.map((lap, index) => (
                <li key={index} className="text-xl">
                  Tour {index + 1}: {formatTime(lap)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chronometer;