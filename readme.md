# how to run
```bash
# assuming you are logged into cs307-user@fall2024-comp307-group10.cs.mcgill.ca
cd mybookings/server
npm run start

cd ../client
npm run start

# WEBSITE NOW RUNNING AT http://localhost:3000/
# please use firefox

# if u want to check what the mongodb database looks like 
mongosh mongodb://localhost:27017
>> use mybookings;
# do whatever query in mongodb ex db.bookings.find({});
```

## contributions
Hashir server:
    wrote most of the endpoints in /booking /auth /requests and helped with /users and /history. wrote all the config/middleware to setup the server and mongodb, ie server.js for endpoint routing, jwt.js for auth/signing stuff, mongodb.js for exposing mongo conn handle, etc.

Hashir client: 
    wrote /login page Login.js Login.css and most of the /history page and its components/css underneath so BookingGallery.js BookingItem.js and BookingGallery.css


Ashley server:
     wrote API call uses the database in /client and helped with some of the /booking and /requests endpoints

Ashley client: 
    wrote all of /booking + its components (BookingCalendar, BookingForms, AttachmentForm), all of /request + its components (RequestForm), most of /booking-details + its components (BookingItems), most of Navbar + Landing, helped with /history and  + its components (BookingGallery). 


Fatin server:
     wrote endpoints (not all) that uses the database in /history and in /users. wrote tests in /tests to ensure endpoints functionality

Fatin client: 
    wrote part of navbar ensuring logout functions correctly and that it shows it properly in the login page, so /login too. a bit of input in Landing, wrote all of Home, uses endpoints in /history so that the page shows total number of bookings by the logged in user. Made minor improvements in /BookingDetails
    REMOVED: wrote sign up page like in many websites, ended up being removed because of fear of breaking app, contributed to App with it.

** the pdf says we need to include names for each file
we instead used contributions.csv to do this not sure 
if you need this file but its there **