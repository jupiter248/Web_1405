import framework from "./08a-framework.js";
import { writeFile, readFile, unlink, existsSync } from "fs";
import jwt from "jsonwebtoken";

const app = framework();
const port = 8000;
const secret = "213231231sdlkaklLKLKaudfsKOUYUGIu";

function checkUser(request, callback) {
  let user = request.headers.username;
  let pass = request.headers.password;
  readFile("db.json", function (error, fileData) {
    if (error) {
      console.log("error reading db.json", error);
      callback(error, null);
    } else {
      fileData = fileData.toString();
      fileData = JSON.parse(fileData);
      let found = false;
      for (let x of fileData.data) {
        if (x.username === user && x.password === pass && x.type === "ADMIN") {
          found = true;
          break;
        }
      }
      if (!found) {
        callback(null, false);
      } else {
        callback(null, true);
      }
    }
  });
}

function verifyToken(request, callback) {
  let token = request.headers.token;
  let found = false;
  var response = jwt.verify(token, secret, function (error, decoded) {
    if (decoded == undefined) {
      found = false;
    } else {
      console.log(decoded.username);
      found = true;
    }
  });
  if (!found) {
    callback(null, false);
  } else {
    callback(null, true);
  }
}

app.GET("sum", function (request, response, url) {
  let items = url;
  response.writeHead(200);
  let output = Number(items[2]) + Number(items[3]);
  response.write(output.toString());
  response.end();
});

app.GET("minus", function (request, response, url) {
  let items = url;
  response.writeHead(200);
  let output = Number(items[2]) - Number(items[3]);
  response.write(output.toString());
  response.end();
});

app.GET("print", function (request, response, url) {
  response.writeHead(200);
  response.write(request.toString());
  response.end();
});

app.GET("create-file", function (request, response, url) {
  writeFile(url[2], url[3], function (error) {
    if (error) {
      response.writeHead(403);
      response.write(`Error during creation : ${error} by ${request.data}`);
      response.end();
    } else {
      response.writeHead(200);
      response.write("File has been created");
      response.end();
    }
  });
});

app.GET("read-file", function (request, response, url) {
  readFile(url[2], function (error, data) {
    if (error) {
      response.writeHead(403);
      response.write(`The error during reading : ${error} by ${request.data} `);
      response.end();
    } else {
      response.writeHead(200);
      response.write("File has been read \n");
      response.write(data);
      response.end();
    }
  });
});

app.GET("delete-file", function (request, response, url) {
  unlink(url[2], function (error) {
    if (error) {
      response.writeHead(404);
      response.write(
        `delete file error-file not found: ${error.message} by ${request.data}`,
      );
      response.end();
    } else {
      response.writeHead(200);
      response.write("delete file done");
      response.end();
    }
  });
});

app.POST("sign-up", function (request, response, url) {
  var json = JSON.parse(request.data);

  json.id = Math.floor(10000000 + Math.random() * 90000000);

  var oldData = { data: [] };

  if (existsSync(url[2])) {
    readFile(url[2], function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end("Error reading file");
      }

      oldData = JSON.parse(data);

      oldData.data.push(json);

      let fullData = JSON.stringify(oldData);

      writeFile(url[2], fullData, function (error) {
        if (error) {
          response.writeHead(500);
          return response.end("Error writing file");
        }

        response.writeHead(200);
        response.end(JSON.stringify(json));
      });
    });
  } else {
    oldData.data.push(json);

    let fullData = JSON.stringify(oldData);

    writeFile(url[2], fullData, function (error) {
      if (error) {
        response.writeHead(500);
        return response.end("Error creating file");
      }

      response.writeHead(200);
      response.end(JSON.stringify(json));
    });
  }
});

app.GET("get-user-by-id", function (request, response, url) {
  let id = url[2];
  console.log(id);

  if (existsSync(url[3])) {
    readFile(url[3], function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end("Error reading file");
      }

      let oldData = JSON.parse(data.toString());
      console.log(oldData);
      for (const element of oldData.data) {
        if (element.id.toString() === url[2]) {
          response.writeHead(200);
          response.end(JSON.stringify(element));
        }
      }
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});

app.DELETE("delete-user", function (request, response, url) {
  let id = url[2];
  let userName = request.headers.username;
  let password = request.headers.password;

  if (existsSync(url[3])) {
    readFile(url[3], function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end("Error reading file");
      }

      let oldData = JSON.parse(data.toString());
      let user = oldData.data.find(
        (user) => user.username.toString() === userName,
      );

      if (user === null) {
        response.writeHead(404);
        return response.end("User not found");
      }

      if (user.type.toUpperCase() !== "ADMIN") {
        response.writeHead(403);
        return response.end("You do not have the permission to remove a user");
      }

      if (
        user.username != userName &&
        user.password != password &&
        user.type.toUpperCase() !== "ADMIN"
      ) {
        response.writeHead(403);
        return response.end("Username or password is wrong");
      }

      let index = oldData.data.findIndex((user) => user.id.toString() === id);

      oldData.data.splice(index, 1);

      let fullData = JSON.stringify(oldData);

      writeFile(url[3], fullData, function (error) {
        if (error) {
          response.writeHead(500);
          return response.end("Error writing file");
        }

        response.writeHead(200);
        response.end(JSON.stringify(oldData));
      });
    });
  } else {
    response.writeHead(404);
    response.end("File not found");
  }
});

app.PUT("update-user", function (request, response, url) {
  var json = JSON.parse(request.data);

  verifyToken(request, function (error, result) {
    if (error) {
      response.writeHead(500);
      return response.end("Error verifing token");
    }

    if (!result) {
      response.writeHead(403);
      return response.end("Only admin can update a user");
    }

    if (existsSync(url[3])) {
      readFile(url[3], function (error, data) {
        if (error) {
          response.writeHead(500);
          return response.end("Error reading file");
        }

        let oldData = JSON.parse(data.toString());

        let user = oldData.data.find(
          (element) => element.id.toString() === url[2],
        );

        if (!user) {
          response.writeHead(404);
          return response.end("User not found");
        }

        // Update user
        user.username = json.username;
        user.password = json.password;

        let fullData = JSON.stringify(oldData);

        // Save changes
        writeFile(url[3], fullData, function (error) {
          if (error) {
            response.writeHead(500);
            return response.end("Error writing file");
          }

          // Send response only once
          response.writeHead(200);
          response.end(JSON.stringify(user));
        });
      });
    } else {
      response.writeHead(404);
      response.end("File not found");
    }
  });
});

app.GET("get-token", function (request, response, url) {
  checkUser(request, function (error, result) {
    if (error) {
      response.writeHead(500);
      return response.end("Error checking user");
    }

    if (!result) {
      response.writeHead(403);
      return response.end("Only admin can update a user");
    }

    if (existsSync(url[2])) {
      var payload = {
        username: request.headers.username,
      };

      var token = jwt.sign(payload, secret);
      response.writeHead(200);
      response.end(token);
    } else {
      response.writeHead(404);
      response.end("Not found");
    }
  });
});

app.listen(port, () => {
  console.log("app listen to : ", port);
});
