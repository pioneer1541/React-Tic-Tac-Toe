import { useState } from "react";
export default function PlayerInfo({ initialName, symbol, isActive,onChangeName }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);
  function handleClick() {
    setIsEditing((isEditing) => !isEditing);
    onChangeName(symbol,playerName);
  }
  function handleChangeName(event) {
    setPlayerName(event.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input
        type="text"
        required
        placeholder="Player's name"
        value={playerName}
        onChange={handleChangeName}
      ></input>
    );
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
