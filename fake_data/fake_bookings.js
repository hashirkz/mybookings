import { mongo_conn, close_connection } from "../mongodb.js";

let data = {
    bookings: [
        {
            owner: 3102,
            booking_id: "dkajd98123",
            name: "comp307 final project meeting",
            start: "2024-12-01 18:30",
            end: "2024-12-01 20:00",
            invited: [118, 119, 292, 112],
            attachments: [
                "https://ahmedtahir",
                "https://fakelink"
            ]
        },
        {
            owner: 118,
            booking_id: "121ffef19",
            name: "csus party",
            start: "2024-12-01 20:00",
            end: "2024-12-02 1:00",
            invited: [119, 222],
            attachments: [
                "https://cs.mcgill.ca/newsletter",
                "https://anotherfakelinkidk"
            ]
        },
        {
            owner: 118,
            booking_id: "kaskdj1999",
            name: "guidance counselor meeting",
            start: "2023-01-06 18:30",
            end: "2023-01-06 20:00",
            invited: [118],
            attachments: [
                "https://minerva.ca"
            ]
        },
    ]
}

let create_fake_bookings = async (data) => {
    let conn = await mongo_conn();

    const bookings = conn.collection("bookings");
    const resp = await bookings.insertMany(data.bookings);
    return resp.insertedCount;
}

create_fake_bookings(data)
    .then(num => { 
        console.log("inserted: " + num.toString()); 
    })
    .then(async () => {
        await close_connection();
    });