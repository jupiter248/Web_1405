import { createServer } from "http";
import { commands } from "./04c-controllers.js";

function ServerCallserver(request, response) {
  let input = request.url.split("/");
  let found = false;
  for (let i of commands) {
    if (request.url.startsWith("/" + i.name)) {
      i.func(input, response);
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

let server = createServer(ServerCallserver);
server.listen(555);
