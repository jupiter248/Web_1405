import framework from "./05b-framework.js";
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
  var oldData = [];

  if (existsSync(url[2])) {
    readFile(url[2], function (error, data) {
      if (error) {
        response.writeHead(500);
        response.end("Error reading file");
        return;
      }

      oldData = JSON.parse(data);

      oldData.push(json);

      let fullData = JSON.stringify(oldData);

      writeFile(url[2], fullData, function (error) {
        if (error) {
          response.writeHead(500);
          response.end("Error writing file");
          return;
        }

        response.writeHead(200);
        response.end(request.data);
      });
    });
  } else {
    oldData.push(json);

    let fullData = JSON.stringify(oldData);

    writeFile(url[2], fullData, function (error) {
      if (error) {
        response.writeHead(500);
        response.end("Error creating file");
        return;
      }

      response.writeHead(200);
      response.end(request.data);
    });
  }
});

app.listen(port, () => {
  console.log("The app is connected successfully");
});
