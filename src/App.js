import './App.css';
import { useState } from 'react';

function App() {

  const [inputValue, setInputValue] = useState("");

  const [outputValue, setOutputValue] = useState("");

  const ops = ['/', '*', '-', '+'];

  const updateCal = (e) => {

    let btnValue = e.target.value;
    if (e.target.value === "x") {
      btnValue = "*"
    }

    if (inputValue.includes("=")) {

      if (ops.includes(btnValue)) {
        setOutputValue(btnValue);
        setInputValue(oldState => {
          const preResult = oldState.split("=")[1];
          return preResult + btnValue
        })
        return;
      } else {
        setOutputValue("");
        setInputValue("");
      }
    };

    if (inputValue === "0" && btnValue === "0") {
      return;
    };

    if (btnValue === "." && !outputValue.includes(".")) {
      if (outputValue === "") {
        setOutputValue(0 + btnValue);
        setInputValue(oldState => oldState + 0 + btnValue);
      }

      if (outputValue !== "") {
        setInputValue(oldState => oldState + btnValue);
        setOutputValue(oldState => oldState + btnValue)
      }

    };

    if (btnValue === "." && outputValue.includes(".")) {
      return;
    };

    if (ops.includes(btnValue)) {

      setOutputValue(btnValue);
      setInputValue(oldState => {
        if (oldState.slice(-2) === "--" && btnValue === "-") {
          return oldState;
        };
        if (oldState.slice(-2) === "--") {
          return oldState.slice(0, -2) + btnValue;
        };

        if (oldState.slice(-1) === "/" || oldState.slice(-1) === "*" || oldState.slice(-1) === "+") {
          if (btnValue !== "-") {
            return oldState.slice(0, -1) + btnValue;
          }
        };

        if ((oldState.slice(-2) === "/-" || oldState.slice(-2) === "+-" || oldState.slice(-2) === "*-") && btnValue === "-") {
          return oldState;
        };

        if ((oldState.slice(-2) === "/-" || oldState.slice(-2) === "+-" || oldState.slice(-2) === "*-") && btnValue !== "-") {
          return oldState.slice(0, -2) + btnValue;
        };

        return oldState + btnValue;
      });

    };

    if (!ops.includes(btnValue) && btnValue !== ".") {
      if (ops.includes(outputValue)) {
        setOutputValue(btnValue);
        setInputValue(oldState => oldState + btnValue)
      } else {
        setOutputValue(oldState => oldState + btnValue)
        setInputValue(oldState => oldState + btnValue)
      }
    };
  };

  const clear = () => {
    setOutputValue("");
    setInputValue("");
  };

  const calculation = (e) => {

    try {
      const replacedVal = inputValue.replace(/--/g, "+");
      const result = eval(replacedVal);

      setInputValue(oldState => oldState + e.target.value + result);
      setOutputValue(result);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div id="app">
      <div>
        <div className="calculator">
          <div className="formulaScreen">{inputValue}</div>
          <div id="display" className="outputScreen">{outputValue || 0}</div>
          <div>
            <button className="jumbo" id="clear" value="AC" style={{ background: "rgb(172, 57, 57)" }} onClick={clear}>AC</button>
            <button id="divide" value="/" style={{ background: "rgb(102, 102, 102)" }} onClick={updateCal}>/</button>
            <button id="multiply" value="x" style={{ background: "rgb(102, 102, 102)" }} onClick={updateCal}>x</button>
            <button id="seven" value="7" onClick={updateCal}>7</button>
            <button id="eight" value="8" onClick={updateCal}>8</button>
            <button id="nine" value="9" onClick={updateCal}>9</button>
            <button id="subtract" value="-" style={{ background: "rgb(102, 102, 102)" }} onClick={updateCal}>-</button>
            <button id="four" value="4" onClick={updateCal}>4</button>
            <button id="five" value="5" onClick={updateCal}>5</button>
            <button id="six" value="6" onClick={updateCal}>6</button>
            <button id="add" value="+" style={{ background: "rgb(102, 102, 102)" }} onClick={updateCal}>+</button>
            <button id="one" value="1" onClick={updateCal}>1</button>
            <button id="two" value="2" onClick={updateCal}>2</button>
            <button id="three" value="3" onClick={updateCal}>3</button>
            <button className="jumbo" id="zero" value="0" onClick={updateCal}>0</button>
            <button id="decimal" value="." onClick={updateCal}>.</button>
            <button id="equals" value="=" style={{ background: "rgb(0, 68, 102)", position: "absolute", height: "130px", bottom: "5px" }} onClick={calculation}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
