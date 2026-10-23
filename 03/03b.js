import { createServer } from "http";

function CallServer(request, response) {
  let numbers = request.url.split("/");
  response.writeHead(200);
  let sum = Number(numbers[1]) + Number(numbers[2]);
  response.write(sum.toString());
  response.end();
}

let server = createServer(CallServer);
server.listen(8000);
