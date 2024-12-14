curl -X PUT "http://localhost:5000/api/booking/f1d66270-767b-4b6c-8455-a1d4c881ef7f" \
-H "Content-Type: application/json" \
-d '{
    "name": "new name",
    "start": "2024-12-01 20:00",
    "end": "2024-12-02 1:00",
    "invited": [119, 222],
    "attachments": [
        "https://cs.mcgill.ca/newsletter",
        "https://anotherfakelinkidk"
    ]
}'
