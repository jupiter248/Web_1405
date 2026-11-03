import framework from "./04d-framework.js";
import { writeFile , readFile } from "fs";

const app = framework()
const port = 8000

app.get('sum' , function(request,response){
    let items = request
    response.writeHead(200);
    let output = Number(items[2])+Number(items[3])
    response.write(output.toString());
    response.end();      
})

app.get('minus',function(request,response){
    let items = request
    response.writeHead(200);
    let output = Number(items[2])-Number(items[3])
    response.write(output.toString());
    response.end();      
})

app.get('print',function(request,response){
    response.writeHead(200);
    response.write(request.toString());
    response.end();      
})

app.get('create-file',function(request,response){
        writeFile(request[2],request[3],function(error){
            if(error){
                response.writeHead(403);
                response.write("Error during creation : ",error );
                response.end();
            }
            else{
                response.writeHead(200);
                response.write("File has been created");
                response.end();   
            }
        }
    )
 })

app.get('readFile',function(request,response){
    readFile(request[2],function(error, data){
        if(error){
            response.writeHead(403);
            response.write("The error during reading : ",error );
            response.end();
        }
        else{
            response.writeHead(200);
            response.write("File has been read \n");
            response.write(data)
            response.end();   
        }
    })
})

app.listen(port, () => {
    console.log("The app is connected successfully")
})