import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const fmt_url = ({host=HOST, port=PORT, endpoint="/api/signup"}) => {
    return `http://${host}:${port}${endpoint}`;
}


let test_post_signup_login = async (user, endpoint) => {
    const url = fmt_url({endpoint: endpoint});
    const resp = await fetch(
        url,
        {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }
    );

    const txt = await resp.text();
    return `HTTP ${resp.status}: ${txt}`;
    
}

let user = {
    user: "ahmed",
    pass: "iamahmed"
}

test_post_signup_login(user, "/api/signup")
    .then( resp => console.log(resp) );
