import React, { useState } from "react";
import * as BiIcons from "react-icons/bi";
import { ChromePicker } from "react-color";
import "../styles/toolbar.css";

const Toolbar = ({
  clearCanvas,
  color,
  setColor,
  penSize,
  setPenSize,
  saveImage,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showPen, setShowPen] = useState(false);

  const updateShowColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const updateShowPen = () => {
    setShowPen(!showPen);
  };

  return (
    <div className="toolbarWrapper">
      <ul className="toolbarElements">
        <li onClick={updateShowPen}>
          {showPen && (
            <div className="bottomPos">
              <input
                type="range"
                min={1}
                max={20}
                value={penSize}
                onChange={(e) => setPenSize(e.target.value)}
              />
            </div>
          )}
          <BiIcons.BiPen />
        </li>
        <li>
          <BiIcons.BiEraser onClick={clearCanvas} />
        </li>
        <li>
          {showColorPicker && (
            <div
              className="bottomPos"
              style={{ padding: "20px" }}
              onMouseLeave={updateShowColorPicker}
            >
              <ChromePicker
                color={color}
                onChange={(updatedColor) => setColor(updatedColor.hex)}
              />
            </div>
          )}
          <BiIcons.BiColorFill onClick={updateShowColorPicker} />
        </li>

        <li onClick={saveImage}>
          <BiIcons.BiUpload></BiIcons.BiUpload>
        </li>
      </ul>
    </div>
  );
};

export default Toolbar;
