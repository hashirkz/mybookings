curl -X POST "http://localhost:5000/api/booking" \
-H "Content-Type: application/json" \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiOTk4MTdjMzYtOTczNi00OTI2LTg3NjQtNzIxYTZiNmNjN2IzIiwidXNlciI6ImFkbWluMSIsImlhdCI6MTczNDIyMDg1NCwiZXhwIjoxNzM0NDgwMDU0fQ.eQADwU4CX3naljR8MzyfOV5gIp67GP4ixg4E9O1pGZw" \
-d '{
    "name": "meeting3",
    "start": "2024-08-19 20:00",
    "end": "2024-08-20 1:00",
    "invited": ["491a215f-f04f-452c-b9d8-d64801d25e3c"],
    "attachments": [
        "https://cs.mcgill.ca/newsletter",
        "https://anotherfakelinkidk"
    ]
}'
