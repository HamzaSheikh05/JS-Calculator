let displayInput = document.querySelector("input[name='display']");
let buttons = document.querySelectorAll("input[type='button']");
let deleteBtn = document.querySelector(".delete");
let clearBtn = document.querySelector(".clear");
let decimalPoint = document.querySelector(".decimal");
let inputValue = "";
let allowDecimal = true;

const clear = function () {
  allowDecimal = true;
  return (displayInput.value = "");
};

const deleteInput = function () {
  if (displayInput.value[displayInput.value.length - 1] == ".") {
    allowDecimal = true;
  }
  return (displayInput.value = displayInput.value.slice(0, -1));
};

const errorHandler = function () {
  if (
    displayInput.value === "Infinity" ||
    displayInput.value === "NaN" ||
    displayInput.value === "undefined" ||
    displayInput.value === "-Infinity" ||
    displayInput.value === "Error"
  ) {
    displayInput.value = "Error";
    setTimeout(() => clear(), 1500);
  }
};

const operate = function () {
  let result = math.evaluate(displayInput.value);
  if (Number.isInteger(result)) {
    return (displayInput.value = result);
  } else {
    result = parseFloat(result).toFixed(4);
    displayInput.value = result;
  }
  errorHandler();
};

const checkForDecimal = function () {
  if (allowDecimal) {
    displayInput.value += ".";
    allowDecimal = false;
  } else {
    if (displayInput.value.includes(".")) {
      let lastOperatorIndex = Math.max(
        displayInput.value.lastIndexOf("+"),
        displayInput.value.lastIndexOf("-"),
        displayInput.value.lastIndexOf("*"),
        displayInput.value.lastIndexOf("/")
      );
      if (lastOperatorIndex > displayInput.value.lastIndexOf(".")) {
        allowDecimal = true;
      }
    } else return;
  }
};

const checkOperator = function (operator) {
  let lastVal = displayInput.value.slice(-1);
  if (lastVal == "+" || lastVal == "-" || lastVal == "*" || lastVal == "/") {
    displayInput.value = displayInput.value.substring(0,displayInput.value.length-1);
    displayInput.value += operator;
  } else {
    displayInput.value += operator;
  }
};

const addKey = function (value) {
  return (displayInput.value += value);
};

const main = function () {
  clear();
  buttonPress();
  keyPress();
};

function buttonPress() {
  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      inputValue = e.target.value;

      if (inputValue === "AC") {
        clear();
      } else if (inputValue === "DE") {
        deleteInput();
      } else if (inputValue === "=") {
        operate();
      } else if (inputValue === ".") {
        checkForDecimal();
      } else if (
        inputValue == "+" ||
        inputValue == "-" ||
        inputValue == "*" ||
        inputValue == "/"
      ) {
        checkOperator(inputValue);
      } else {
        removeZeros(inputValue);
      }
    });
  });
}


function removeZeros(input){  
  if ( displayInput.value === "0"){
    return displayInput.value = input;
  } else {
  return addKey(input);
  }  
}


function keyPress() {
  document.addEventListener("keydown", function (e) {
    let key = e.key;

    if (key >= "0" && key <= "9") {
      removeZeros(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      checkOperator(key);
    } else if (key === ".") {
      checkForDecimal();
    } else if (key === "=") {
      operate();
    } else if (key === "Delete" || key === "Backspace") {
      deleteInput();
    } else if (e.shiftKey === true) {
      if (key === "(" || key === ")") {
        e.preventDefault();
        addKey(key);
      }
    }
  });
}

main();
