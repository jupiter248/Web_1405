import { writeFile } from "fs";

const commands = [
  {
    name: "sum",
    func: function (input, response) {
      response.writeHead(200);
      let output = Number(input[2]) + Number(input[3]);
      response.write(String(output));
      response.end();
    },
  },
  {
    name: "minus",
    func: function (input, response) {
      response.writeHead(200);
      let output = Number(input[2]) - Number(input[3]);
      response.write(String(output));
      response.end();
    },
  },
  {
    name: "print",
    func: function (input, response) {
      response.writeHead(200);
      response.write(String(input));
      response.end();
    },
  },
  {
    name: "create",
    func: function (input, response) {
      response.writeHead(200);
      writeFile(input[2], input[3], function () {});
      response.write("create file done");
      response.end();
    },
  },
];

export { commands };
