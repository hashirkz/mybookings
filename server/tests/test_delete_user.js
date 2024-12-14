import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const HOST = process.env.HOST;
const PORT = process.env.PORT;

const fmt_url = ({
    host = HOST,
    port = PORT,
    endpoint = "/api/users",
    user_id = 1
}) => {
    return `http://${host}:${port}${endpoint}/${user_id}`;
};

let test_delete_user = async (user_id, endpoint) => {
    const url = fmt_url({ endpoint : endpoint , user_id : user_id});
    const resp = await fetch(url, {
        method: "delete",
        headers: { "Content-Type": "application/json" },
    });

    const txt = await resp.json();
    
    return txt;
};

const user_id = "363bd2b2-aa64-4d1b-a5f8-fdaebefde79d";

test_delete_user(user_id, "/api/users").then((resp) =>
    console.log(resp)
);
