
---

# 1. Notification System

## Difficulty: ⭐

Build a simple notification system.

A user should be able to receive notifications through different channels.

### Channels

* Email
* SMS
* Push Notification

### Features

Your system should allow:

* Send notification
* Add/remove notification channels
* Send the same message through multiple channels

### Example

```text
User
 ├── Email
 ├── SMS
 └── Push
```

A user might have:

```text
Email + SMS
```

while another user might have:

```text
Push only
```

### Suggested responsibilities

#### User

Possible methods:

```ts
addNotificationChannel()
removeNotificationChannel()
notify()
```

#### Notification Channel

Think about an interface:

```ts
send(message: string): void
```

Possible implementations:

```text
EmailNotification
SMSNotification
PushNotification
```

### Questions to think about

1. Should `User` know how email is sent?
2. What happens if you add WhatsApp later?
3. Can one user have multiple notification channels?
4. Can you add a new channel without changing `User`?

---

# 2. Payment System

## Difficulty: ⭐⭐

Build a small payment system.

A customer should be able to pay using different payment methods.

### Payment methods

* Credit Card
* UPI
* Cash

### Features

Your system should support:

* Make payment
* Check payment status
* Refund payment

Possible statuses:

```text
PENDING
SUCCESS
FAILED
REFUNDED
```

### Example

```text
Customer
   |
   ↓
Payment
   |
   └── Payment Method
          ├── Card
          ├── UPI
          └── Cash
```

### Possible methods

#### Payment

```ts
pay(amount)
refund()
getStatus()
```

#### Payment Method

Think about:

```ts
pay(amount)
```

### Questions to think about

1. Should `Payment` know whether it is using UPI or Card?
2. What happens when you add PayPal?
3. Can the payment method be changed?
4. Which part should actually perform the payment?

---

# 3. Library Management System

## Difficulty: ⭐⭐

Build a small library system.

The library has:

* Books
* Members
* Librarian

A member can borrow and return books.

### Features

Your system should support:

* Add book
* Remove book
* Register member
* Borrow book
* Return book
* Check book availability
* Show member's borrowed books

### Example

```text
Library
 ├── Books
 ├── Members
 └── Librarian
```

A book could have:

```text
id
title
author
available
```

A member could have:

```text
id
name
borrowedBooks
```

### Possible methods

#### Library

```ts
addBook()
removeBook()
registerMember()
findBook()
```

#### Member

```ts
borrowBook()
returnBook()
getBorrowedBooks()
```

#### Book

```ts
isAvailable()
markBorrowed()
markReturned()
```

### Questions to think about

1. Who should be responsible for borrowing?
2. Should `Book` know about `Member`?
3. Should `Library` contain an array of books?
4. Can a member borrow multiple books?
5. What happens if the book is already borrowed?

---

# 4. Food Ordering System

## Difficulty: ⭐⭐⭐

Build a small food ordering system.

A customer can order food from a restaurant.

### Entities

Think about:

```text
Customer
Restaurant
Menu
MenuItem
Order
Payment
```

### Features

#### Restaurant

* Add menu item
* Remove menu item
* Show menu

#### Customer

* Create order
* Add item
* Remove item
* View order

#### Order

* Add item
* Remove item
* Calculate total
* Place order
* Cancel order

#### Payment

Support:

```text
UPI
Card
Cash
```

### Example flow

```text
Customer
   ↓
Restaurant
   ↓
Menu
   ↓
MenuItem
   ↓
Order
   ↓
Payment
```

### Example

A customer orders:

```text
2 × Pizza
1 × Burger
2 × Coke
```

The order should calculate:

```text
Pizza  × 2 = ₹400
Burger × 1 = ₹150
Coke   × 2 = ₹100

Total = ₹650
```

### Questions to think about

1. Should `Order` directly create `Payment`?
2. How can `Order` support different payment methods?
3. Should `Restaurant` inherit from anything?
4. Which objects should `Order` contain?
5. What happens if you add a new payment method?

---

# 5. Parking Lot System

## Difficulty: ⭐⭐⭐

Build a simple parking lot system.

A parking lot contains different parking spots.

### Vehicle types

* Bike
* Car
* Truck

### Parking spots

* Bike Spot
* Car Spot
* Large Spot

### Features

Your system should support:

* Add parking spot
* Remove parking spot
* Park vehicle
* Remove vehicle
* Find available spot
* Check availability
* Generate parking ticket

### Example

```text
ParkingLot
   |
   ├── ParkingSpot
   │      ├── BikeSpot
   │      ├── CarSpot
   │      └── LargeSpot
   |
   └── Vehicles
          ├── Bike
          ├── Car
          └── Truck
```

### Possible methods

#### ParkingLot

```ts
addSpot()
removeSpot()
parkVehicle()
removeVehicle()
findAvailableSpot()
```

#### ParkingSpot

```ts
isAvailable()
park()
removeVehicle()
```

#### Vehicle

```ts
getType()
```

#### Ticket

```ts
generate()
calculateFee()
```

### Questions to think about

1. How does a `ParkingSpot` know which vehicle it can accept?
2. Should `Car` extend `Vehicle`?
3. Should `ParkingLot` know the implementation of every vehicle type?
4. What happens if tomorrow you add an `ElectricVehicle`?
5. What happens if some spots support multiple vehicle types?
6. How can you avoid a huge chain of `if/else` statements?

---