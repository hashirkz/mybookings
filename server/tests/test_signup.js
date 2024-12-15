import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const fmt_url = ({
    host = HOST,
    port = PORT,
    endpoint = "/api/auth/signup",
}) => {
    return `http://${host}:${port}${endpoint}`;
};

let test_post_signup_login = async (user, endpoint) => {
    const url = fmt_url({ endpoint: endpoint });
    const resp = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });

    const txt = await resp.text();
    return `HTTP ${resp.status}: ${txt}`;
};

let user = {
    user: "admin1",
    pass: "iamadmin1",
};

test_post_signup_login(user, "/api/auth/login").then((resp) =>
    console.log(resp)
);
