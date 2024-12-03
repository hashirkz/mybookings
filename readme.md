# todo   
- session stuff for login   
- move /api routes to their own files so the logic isnt all in server.js  
- change all backend response to json not plain text  

## how to run backend  
```
# install dependencies **dont need to do this on the server its already done**
npm install

# start backend will be running at http://<host_ip>:5000
node server.js

# you can use this link to make requests or use fetch like in fake_data/fake_signup.js
const url = "http://<host_ip>:5000/api/signup";
const user = {
    user: "someone",
    pass: "something"
}
const resp = await fetch(
        url,
        {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }
    );
```   

### DOCUMENTATION  

#### POST GET reqeusts  
keep everything in json responses and requests unless we must use something else for whatever reason this will avoid confusion      

#### api keys  
api keys and other important backend config stuff is loaded from /.env    
keep all sensitive keys in here since we are uploading to github and stuff so dont want to leak anything  

#### mongodb connection  
to get a conn handle from mongodb use the following snippet **needs to be async btw**    
```
import { mongo_conn, close_connection } from "./mongodb.js";

const some_func = async (req, res) {
    const conn = await mongo_conn();
    const collection = conn.collection("name of collection/table u want");
    // create or from the collection for what you need
}
```  
