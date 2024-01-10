import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [updateNumber, setUpdateNumber] = useState("");
  const [updateText, setUpdateText] = useState("");

  function onChangeNumber(event) {
    const update = event.target.value;
    setUpdateNumber(update);
  }
  function onChangeText(event) {
    const update = event.target.value;
    setUpdateText(update);
  }

  function handleSubmit() {
    console.log("prop");
  }
  return (
    <div className="App">
      <div>
        Number: {updateNumber} <br /> Text: {updateText}
        <form method="post" onSubmit={handleSubmit}>
          <input
            name="number"
            defaultValue="10"
            type="number"
            onChange={onChangeNumber}
          />
          <input
            name="mytext"
            defaultValue="Test"
            type="text"
            onChange={onChangeText}
          />
          <br />
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
}
