const displayInput = document.querySelector("input[name='display']");
const buttons = document.querySelectorAll("input[type='button']");
const deleteBtn = document.querySelector(".delete");
const clearBtn = document.querySelector(".clear");
const decimalPoint = document.querySelector(".decimal");
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
    } else if (val === ".") {
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
    } else {
      displayInput.value += val;
    }
  });
});
