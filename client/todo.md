# pages

## Login.js (done)
main login page deals with auth and storing jwt in localstorage

## Landing.js (done)
main landing page signed out

## Home.js (done)
PROTECTED
home dashboard

## History.js (done)
PROTECTED
history page which contains signed in users booking history for created and invited bookings

## BookingDetails.js (done)
page that shows information about an existing booking 
this is the booking url thats generated it looks like /booking/:booking_id

## Booking.js  
PROTECTED
booking page which allows signed in users to create new bookings  

## Request.js 
PROTECTED 
request page which allows signed in users to send a meeting request to users email?  
unsure about this page honestly the description on the pdf is awful and unclear.  


## components  
### BookingCalender.js (done)
this is the calender componenet used by the /booking and /reqest pages

### NavBar.js (done)
main signed in navbar for all protected pages

### BookingGallery (done)
gallery of created invited bookings for history page

## global (done ig)   
- App.css  

# routing  (done)
- need to add routing for login/signup to separate it from signed in pages  
- jwt for protected endpoints *need to implement jwt auth stuff for backend first before*
