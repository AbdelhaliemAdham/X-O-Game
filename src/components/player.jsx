import React from "react";
import { useState } from "react";
function Player({ name, symbol, isActive, onChangePlayer }) {
  const [editedName, setEditedName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  function handlePlayerName(params) {
    setEditedName(params.target.value);
  }
  function handleChangeName() {
    setIsEditing((isEdit) => !isEdit);
    if (isEditing) {
      onChangePlayer(editedName);
    }
  }
  let buttonName = "Edit";
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{editedName}</span>
        ) : (
          <input
            type="text"
            required
            value={editedName}
            onChange={handlePlayerName}
          ></input>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleChangeName}>
        {isEditing ? (buttonName = "Save") : buttonName}
      </button>
    </li>
  );
}

export default Player;
