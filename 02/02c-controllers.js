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

export { commands };
