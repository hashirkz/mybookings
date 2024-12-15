# unfinished routes      

## send_booking
PROTECTED
endpoint: /api/send_booking    
methods: [POST]  
purpose: send a booking request to a member    

## booking (done)
PROTECTED *get is not protected*
endpoint: /api/booking/:booking_id    
methods: [GET PUT, DELETE]    
purpose: to update delete or read a booking by the booking_id    


## users (done)   
PROTECTED *get is not protected* 
endpoint: /api/users/:user_id    
methods: [GET, PUT, DELETE]    
purpose: to delete a user account by the user_id    

## history (done)
PROTECTED
endpoint: /api/history?type=created|invited
methods: [GET]
purpose: to fetch a users owned bookings and bookings they are invited to 

## auth (done)
endpoint: /api/auth/login
methods: [POST]
purpose: logs in a existing user and generate jwt for login persistence

endpoint: /api/auth/signup
method: [POST]
purpose: signs up a new user and generate jwt for login persistence

# other (done)
- jwt / session storing needs to be done    
