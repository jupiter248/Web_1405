import { writeFile } from "fs";

const commands = [
  {
    name: "Sum",
    func: function (input) {
      return Number(input[2]) + Number(input[3]);
    },
  },
  {
    name: "Minus",
    func: function (input) {
      return Number(input[2]) - Number(input[3]);
    },
  },
  {
    name: "Print",
    func: function (input) {
      return input[2];
    },
  },
  {
    name: "CreateFile",
    func: function (input) {
      writeFile(input[2], input[3], function () {});
      return `The name is ${input[2]}, and the data is ${input[3]}`;
    },
  },
];

export { commands };
