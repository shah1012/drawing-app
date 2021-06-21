import React, { useState, useRef, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import Navbar from "./components/Navbar";
import "./styles/App.css";

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [penSize, setPenSize] = useState(1);

  // get the context when component loaded
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = (window.innerHeight - 115.2) * 2;
    canvas.width = window.innerWidth * 2;

    canvas.style.height = `${window.innerHeigh - 115.2}px`;
    canvas.style.width = `${window.innerWidth}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = penSize;
    contextRef.current = context;

    console.log(canvasRef);
  }, []);

  // detect when color changes
  useEffect(() => {
    contextRef.current.strokeStyle = color;
  }, [color]);

  // detect when the size changes
  useEffect(() => {
    contextRef.current.lineWidth = penSize;
  }, [penSize]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const finishedDrawing = () => {
    contextRef.current.closePath();
    setDrawing(false);
  };

  const draw = ({ nativeEvent }) => {
    if (!drawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const clearDrawing = () => {
    contextRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    console.log("Cleared Canvas");
  };

  const saveImage = () => {
    let link = document.createElement("a");
    link.download = "download.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
    link.delete;
  };

  return (
    <div className="App">
      <Navbar />
      <div className="canvasWrapper">
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishedDrawing}
          onMouseMove={draw}
          onMouseLeave={() => setDrawing(false)}
          ref={canvasRef}
        ></canvas>
        <Toolbar
          color={color}
          setColor={setColor}
          clearCanvas={clearDrawing}
          penSize={penSize}
          setPenSize={setPenSize}
          saveImage={saveImage}
        />
      </div>
    </div>
  );
}

export default App;
