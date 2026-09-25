import { Customer, DoubleRoom, Hotel, SingleRoom } from "./bookingSystem";


const hotel = new Hotel("hotel-1","hotelll")

// lets add some rooms

const singleRoom1 = new SingleRoom("s-1","SINGLE",1000)
const singleRoom2 = new SingleRoom("s-2","SINGLE",1000)
const singleRoom3 = new SingleRoom("s-3","SINGLE",1000)

const doubleRoom1 = new DoubleRoom("d-1","DOUBLE",2000)
const doubleRoom2 = new DoubleRoom("d-2","DOUBLE",2000)
const doubleRoom3 = new DoubleRoom("d-3","DOUBLE",2000)

hotel.addRoom(singleRoom1)
hotel.addRoom(singleRoom2)
hotel.addRoom(singleRoom3)

hotel.addRoom(doubleRoom1)
hotel.addRoom(doubleRoom2)
hotel.addRoom(doubleRoom3)


// lets add some customer

const kishan = new Customer("c-1","kishan")
const aman = new Customer("c-2","aman")


// booking
const booking1 = hotel.createBooking(kishan,"s-1",3)
const booking2 = hotel.createBooking(aman,"d-3",3)

// console.log(booking1)
hotel.getAvailableRoom()

// total = kishan and aman

console.log(booking1?.calculateTotal())
console.log(booking2?.calculateTotal()) // doubleroom price = 2000 , 2000 x 3 =  6000


kishan.getBooking() // getting 


// lets check cancel booking 
hotel.cancelBooking('d-3aman')
aman.getBooking() // edge case -- after canceling we also have to make the room available

hotel.getAvailableRoom() 


// if you can add something new just clone the repo and add some methodssss 
