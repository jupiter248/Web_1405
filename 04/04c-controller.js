import { writeFile, readFile } from "fs";

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
      writeFile(input[2], input[3], function (error) {
        if (error) {
          response.writeHead(403);
          response.write("create file error:", error);
          response.end();
        } else {
          response.writeHead(200);
          response.write("create file done");
          response.end();
        }
      });
    },
  },
  {
    name: "readfile",
    func: function (input, response) {
      readFile(input[2], function (error, data) {
        if (error) {
          response.writeHead(403);
          response.write("read file error:", error);
          response.end();
        } else {
          response.writeHead(200);
          response.write("read file done \n");
          response.write(data);
          response.end();
        }
      });
    },
  },
];

export { commands };
