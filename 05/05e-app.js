import framework from "./05b-framework.js";
import { writeFile, readFile, unlink, rmdir } from "fs";

const app = framework();
const port = 8000;

app.get("sum", function (request, response) {
  let items = request;
  response.writeHead(200);
  let output = Number(items[2]) + Number(items[3]);
  response.write(String(output));
  response.end();
});

app.get("minus", function (request, response) {
  let items = request;
  response.writeHead(200);
  let output = Number(items[2]) - Number(items[3]);
  response.write(String(output));
  response.end();
});

app.get("print", function (request, response) {
  response.writeHead(200);
  response.write(String(request));
  response.end();
});

app.get("createFile", function (request, response) {
  writeFile(request[2], request[3], function (error) {
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
});

app.get("readFile", function (request, response) {
  readFile(request[2], function (error, data) {
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
});

app.get("deleteFile", function (request, response) {
  unlink(request[2], function (error) {
    if (error) {
      response.writeHead(400);
      response.write("delete file error-file not found:" + error.message);
      response.end();
    } else {
      response.writeHead(200);
      response.write("delete file done");
      response.end();
    }
  });
});

app.get("delete", function (request, response) {
  rmdir(request[2], function (error) {
    if (error) {
      response.writeHead(404);
      response.write(
        "delete directory error-directory not found:" + error.message,
      );
      response.end();
    } else {
      response.writeHead(200);
      response.write("delete directory done");
      response.end();
    }
  });
});

app.get("signup", function (request, response) {
  readFile("db.json", function (error, data) {
    if (error) {
      response.writeHead(403);
      response.write("read file error:", error);
      response.end();
    } else {
      const users = JSON.parse(data);
      const clientData = JSON.parse(request.data);

      const newUser = {
        username: clientData.username,
        password: clientData.password,
      };

      users.push(newUser);
      writeFile("db.json", JSON.stringify(users, null, 2), function (error) {
        if (error) {
          response.writeHead(403);
          response.write("edit file error:" + error.message);
          response.end();
        } else {
          response.writeHead(201);
          response.write("signup is done " + request.data);
          response.end();
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log("Hala Madrid");
});
