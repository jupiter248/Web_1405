import { createServer } from "http";

function framework() {
  let controllers = [];

  let app = {
    GET: function (path, func) {
      controllers.push({
        method: "GET",
        name: path,
        func: func,
      });
    },
    POST: function (path, func) {
      controllers.push({
        method: "POST",
        name: path,
        func: func,
      });
    },
    PUT: function (path, func) {
      controllers.push({
        method: "PUT",
        name: path,
        func: func,
      });
    },
    DELETE: function (path, func) {
      controllers.push({
        method: "DELETE",
        name: path,
        func: func,
      });
    },
    listen: function (port, callback) {
      function ServerCallserver(request, response) {
        let fullName = "";

        request.on("data", function (chunk) {
          fullName += chunk.toString();
        });

        request.on("end", function () {
          request.data = fullName;

          let url = request.url.split("/");

          let found = false;
          for (let i of controllers) {
            if (
              request.url.startsWith("/" + i.name) &&
              request.method == i.method
            ) {
              i.func(request, response, url);
              found = true;
              break;
            }
          }

          if (!found) {
            console.log("Error:" + request.url);
            response.writeHead(404);
            response.end("command not found");
          }
        });
      }

      let server = createServer(ServerCallserver);
      server.listen(port, callback);
    },
  };

  return app;
}

export default framework;
