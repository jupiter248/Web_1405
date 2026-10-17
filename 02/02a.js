function print(input) {
  console.log(
    `Username is: ${input[0]} , Email is: ${input[1]} , Age is: ${input[2]}`,
  );
}

let command = process.argv[2];

let input = process.argv.slice(3);

if (command === "print") {
  print(input);
} else {    
  console.log("Error");
  process.exit();
}
