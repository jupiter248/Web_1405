import { createServer } from "http";
import { commands } from "./03c-controllers.js";

function CallServer(request, response) {
  let input = request.url.split("/");
  let found = false;
  for (let i = 0; i < commands.length; i++) {
    if (request.url.startsWith("/" + commands[i].name)) {
      var result = commands[i].func(input);
      response.writeHead(200);
      response.write(`The result is : ${result}`);
      response.end();
      found = true;
      break;
    }
  }

  if (!found) {
    console.log("Error:" + request.url);
    response.writeHead(404);
    response.end("command not found");
  }
}

let server = createServer(CallServer);
server.listen(8000);
