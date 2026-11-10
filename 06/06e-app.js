import { log } from "console";
import framework from "./06a-framework.js";
import { writeFile, readFile, unlink, existsSync } from "fs";

const app = framework();
const port = 8000;

app.get("sum", function (request, response, url) {
  let items = url;
  response.writeHead(200);
  let output = Number(items[2]) + Number(items[3]);
  response.write(output.toString());
  response.end();
});

app.get("minus", function (request, response, url) {
  let items = url;
  response.writeHead(200);
  let output = Number(items[2]) - Number(items[3]);
  response.write(output.toString());
  response.end();
});

app.get("print", function (request, response, url) {
  response.writeHead(200);
  response.write(request.toString());
  response.end();
});

app.get("create-file", function (request, response, url) {
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

app.get("read-file", function (request, response, url) {
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

app.get("delete-file", function (request, response, url) {
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

app.get("sign-up", function (request, response, url) {
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

app.get("get-user-by-id", function (request, response, url) {
  let id = url[2];
  if (existsSync(url[3])) {
    readFile(url[3], function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end("Error reading file");
      }

      let oldData = JSON.parse(data.toString());
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

app.get("delete-user", function (request, response, url) {
  let id = url[2];

  if (existsSync(url[3])) {
    readFile(url[3], function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end("Error reading file");
      }

      let oldData = JSON.parse(data.toString());

      let index = oldData.data.findIndex((user) => user.id.toString() === id);

      if (index < 0) {
        response.writeHead(404);
        return response.end("User not found");
      }

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

app.get("update-user", function (request, response, url) {
  var json = JSON.parse(request.data);

  if (existsSync(url[3])) {
    readFile(url[3], function (error, data) {
      if (error) {
        response.writeHead(500);
        return response.end("Error reading file");
      }

      let oldData = JSON.parse(data.toString());
      console.log(oldData);
      console.log(json);
      console.log(url[2]);

      for (const element of oldData.data) {
        console.log(element.id.toString());

        if (element.id.toString() === url[2]) {
          element.name = json.name;
          element.family = json.family;
          response.writeHead(200);
          response.end(JSON.stringify(element));
        }
      }
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

app.listen(port, () => {
  console.log("The app is connected successfully");
});
