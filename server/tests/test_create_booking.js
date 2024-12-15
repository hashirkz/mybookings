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
    const json = await resp.json();
    return json;
};

// let bookings = [
//     {
//         user_id: "400",
//         name: "some meeting",
//         start: "2024-12-22 12:20",
//         end: "2024-12-22 13:20",
//         invited: ["119", "118"],
//         attachments: ["https://fakes3link"],
//     },
//     {
//         user_id: "3102",
//         name: "comp307 final project meeting",
//         start: "2024-12-01 18:30",
//         end: "2024-12-01 20:00",
//         invited: ["118", "119", "292", "112"],
//         attachments: ["https://ahmedtahir", "https://fakelink"],
//     },
//     {
//         user_id: "118",
//         name: "csus party",
//         start: "2024-12-01 20:00",
//         end: "2024-12-02 1:00",
//         invited: ["119", "222"],
//         attachments: [
//             "https://cs.mcgill.ca/newsletter",
//             "https://anotherfakelinkidk",
//         ],
//     },
//     {
//         user_id: "118",
//         name: "guidance counselor meeting",
//         start: "2023-01-06 18:30",
//         end: "2023-01-06 20:00",
//         invited: ["118"],
//         attachments: ["https://minerva.ca"],
//     },
// ];

const bookings = [
    {
        user_id: "99817c36-9736-4926-8764-721a6b6cc7b3",
        name: "meeting1",
        start: "2021-06-01 17:00",
        end: "2021-06-01 18:21",
        invited: ["491a215f-f04f-452c-b9d8-d64801d25e3c"],
        attachments: ["https://github.com/hashirkz"],
    },
    {
        user_id: "99817c36-9736-4926-8764-721a6b6cc7b3",
        name: "meeting2",
        start: "2021-07-14 09:00",
        end: "2021-07-14 09:21",
        invited: ["491a215f-f04f-452c-b9d8-d64801d25e3c"],
        attachments: ["https://someattachement.com"],
    },
    {
        user_id: "491a215f-f04f-452c-b9d8-d64801d25e3c",
        name: "somemeeting",
        start: "2024-12-14 17:00",
        end: "2021-12-14 18:21",
        invited: [],
        attachments: ["https://github.com/hashirkz"],
    },
];
bookings.forEach((new_booking) => {
    test_create_booking(new_booking).then((resp) => console.log(resp));
});


// test_create_booking(new_booking).then((resp) => console.log(resp));
