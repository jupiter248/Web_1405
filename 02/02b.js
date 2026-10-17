const commands = [
  {
    name: "sum",
    func: function (input) {
      console.log(Number(input[0]) + Number(input[1]));
    },
  },
  {
    name: "minus",
    func: function (input) {
      console.log(Number(input[0]) - Number(input[1]));
    },
  },
  {
    name: "print",
    func: function (input) {
      console.log(input);
    },
  },
];

let command = process.argv[2];

let input = process.argv.slice(3);

let commandFounded = false;
for (let i = 0; i < commands.length; i++) {
  if (commands[i].name == command) {
    commands[i].func(input);
    commandFounded = true;
    break;
  }
}

if (!commandFounded) {
  console.log("The command is not found");
  process.exit();
}
