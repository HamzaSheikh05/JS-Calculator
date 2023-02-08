let displayInput = document.querySelector("input[name='display']");
let buttons = document.querySelectorAll("input[type='button']");
let deleteBtn = document.querySelector(".delete");
let clearBtn = document.querySelector(".clear");
let decimalPoint = document.querySelector(".decimal");
let allowDecimal = true;

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let val = e.target.value;

    if (val === "AC") {
      displayInput.value = "";
      allowDecimal = true;
    } else if (val === "DE") {
      displayInput.value = displayInput.value.slice(0, -1);
      allowDecimal = true;
    } else if (val === "=") {
      displayInput.value = eval(displayInput.value);
      if (displayInput.value === "Infinity" || displayInput.value === "NaN") {
        displayInput.value = "Error";
      }
    } else if (val === ".") {
      checkForDecimal();
    } else {
      if (displayInput.value === "Error") {
        displayInput.value = val;
      } else {
        displayInput.value += val;
      }
    }
  });
});

document.addEventListener("keydown", function (e) {
  let key = e.key;
  if (key >= "0" && key <= "9") {
    displayInput.value += key;
    console.log(typeof displayInput.value);
  } else if (key === "+" || key === "-" || key === "*" || key === "/") {
    displayInput.value += key;
  } else if (key === ".") {
    checkForDecimal();
  } else if (key === "=") {
    displayInput.value = eval(displayInput.value);
    if (displayInput.value === "Infinity" || displayInput.value === "NaN") {
      displayInput.value = "Error";
    }
  } else if (key === "Delete" || key === "Backspace") {
    displayInput.value = displayInput.value.slice(0, -1);
  }
});

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
        displayInput.value += ".";
      }
    } else return;
  }
};
