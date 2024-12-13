import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const HOST = process.env.HOST;
const PORT = process.env.PORT;
const fmt_url = ({ host = HOST, port = PORT, endpoint = "/api/booking" }) => {
    return `http://${host}:${port}${endpoint}`;
};

const test_create_booking = async (data) => {
    const url = fmt_url({});
    const resp = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    const json = await resp.text();
    return json;
};

let bookings = [
    {
        user_id: 400,
        name: "some meeting",
        start: "2024-12-22 12:20",
        end: "2024-12-22 13:20",
        invited: [119, 118],
        attachments: ["https://fakes3link"],
    },
    {
        user_id: 3102,
        name: "comp307 final project meeting",
        start: "2024-12-01 18:30",
        end: "2024-12-01 20:00",
        invited: [118, 119, 292, 112],
        attachments: ["https://ahmedtahir", "https://fakelink"],
    },
    {
        user_id: 118,
        name: "csus party",
        start: "2024-12-01 20:00",
        end: "2024-12-02 1:00",
        invited: [119, 222],
        attachments: [
            "https://cs.mcgill.ca/newsletter",
            "https://anotherfakelinkidk",
        ],
    },
    {
        user_id: 118,
        name: "guidance counselor meeting",
        start: "2023-01-06 18:30",
        end: "2023-01-06 20:00",
        invited: [118],
        attachments: ["https://minerva.ca"],
    },
];

// bookings.forEach((new_booking) => {
//     test_create_booking(new_booking).then((resp) => console.log(resp));
// });

const new_booking = {
    user_id: 444,
    name: "bingus meeting",
    start: "2024-12-12 11:00",
    end: "2024-12-12 12:00",
    invited: [3102, 400],
    attachments: [],
};

test_create_booking(new_booking).then((resp) => console.log(resp));
