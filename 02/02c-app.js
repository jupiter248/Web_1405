import { commands } from "./02c-controllers.js";

let op = process.argv[2];
let input = process.argv.slice(3);
let found = false;
for (let i = 0; i < commands.length; i++) {
  if (commands[i].name == op) {
    commands[i].func(input);
    found = true;
    break;
  }
}

if (!found) {
  console.log("The command is not found");
  process.exit();
}
