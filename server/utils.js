import os from "os";
// import { pathToFileURL } from "url";
// import { dirname } from "path";

// const __filename = pathToFileURL(file.path);
// const __dirname = dirname(__filename);

const gen_uuid = () => {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
        (
            +c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
        ).toString(16)
    );
};

const ni = os.networkInterfaces();
const localhost = Object.keys(ni)
    .map((interf) =>
        ni[interf].map((o) => !o.internal && o.family === "IPv4" && o.address)
    )
    .reduce((a, b) => a.concat(b))
    .filter((o) => o)[0];

export { gen_uuid, localhost };
