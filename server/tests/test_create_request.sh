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


curl 'http://127.0.0.1:5000/api/request' -X POST -H 
'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0' -H 'Accept: */*' -H 'Accept-Language: en-CA,en-US;q=0.7,en;q=0.3' -H 'Accept-Encoding: gzip, deflate, br, zstd' -H 'Referer: http://localhost:3000/' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMDU2ZmRhYTQtNmIxMy00YWQzLWJmMGItZTI1YzU4NzI2OWU2IiwidXNlciI6ImFiY0BtY2dpbGwuY2EiLCJpYXQiOjE3MzQ1Nzg5OTgsImV4cCI6MTczNDY2NTM5OH0.qMAXPFlghVSHnOtJk1hHy3tjHMNez3wGN5xLWG_xeq0' -H 'Content-Type: application/json' -H 'Origin: http://localhost:3000' -H 'Connection: keep-alive' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: cross-site' -H 'Priority: u=4' -H 'Pragma: no-cache' -H 'Cache-Control: no-cache' --data-raw '{"dates":"2024-12-18","recipientId":"f821c37e-5073-4a39-8da9-10ba4864826c","startTimes":"02:33","endTimes":"03:33","message":"idk"}'