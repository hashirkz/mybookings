# how to run
```bash
cd server
npm run start

cd client
npm run start

# website is now running at http://localhost:3000/
```

## contributions
hashir,serverside,wrote most of the endpoints in /booking /history /auth and some in /requests /users. also wrote all the config/middleware to setup the server so server.js jwt.js for auth/signing stuff, mongodb.js for exposing mongo conn handle, etc.

hashir,frontend,wrote most of the /login public and /history private page *ashley helped with the history page and the components underneath like BookingGallery.js*

Ashley-server: wrote API call uses the database in /client and helped with some of the /booking and /requests endpoints

Ashel-client: wrote all of /booking + its components (BookingCalendar, BookingForms, AttachmentForm), all of /request + its components (RequestForm), most of /booking-details + its components (BookingItems), most of Navbar + Landing, helped with /history and  + its components (BookingGallery). 
