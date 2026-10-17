const num1 = Number(process.argv[2]);
const operation = process.argv[3];
const num2 = Number(process.argv[4]);

let result;

switch (operation) {
  case "+":
    result = num1 + num2;
    break;

  case "-":
    result = num1 - num2;
    break;

  case "*":
    result = num1 * num2;
    break;

  case "/":
    result = num1 / num2;
    break;

  default:
    console.log("Error");
    process.exit();
}

console.log("the output is: " + result);
