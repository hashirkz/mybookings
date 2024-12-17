import React from "react";
import "./AddList.css";

function AddList({ name, list, newItem, setNewItem, handleRemove, handleAdd }) {
  return (
    <>
      <ul>
        {list.map((attachment, index) => (
          <li key={index}>
            {attachment}
            <button type="button" onClick={() => handleRemove(index)}>
              -
            </button>
          </li>
        ))}
      </ul>
      <input
        name={name}
        type="text"
        placeholder={`new ${name}`}
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        className="add-attachment"
        type="button"
        onClick={() => handleAdd()}
      >
        +
      </button>
    </>
  );
}

export default AddList;
