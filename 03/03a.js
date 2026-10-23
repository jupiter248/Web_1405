import {createServer} from "http"

function CallServer( request , response){

    console.log("Hala Madrid till the end ..")
}

let server = createServer(CallServer);
server.listen(8000);