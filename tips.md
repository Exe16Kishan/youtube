# Low Level Design (LLD) — Quick Revision Guide

> **Goal:** Convert a problem statement into clean classes, responsibilities, relationships, and methods.

---

# 1. The Core LLD Process

Whenever you receive an LLD problem:

```text
Problem Statement
       ↓
Extract Nouns
       ↓
Identify Classes
       ↓
Identify "is-a" relationships
       ↓
Identify "has-a" relationships
       ↓
Assign Responsibilities
       ↓
Identify State
       ↓
Create Methods
       ↓
Connect Objects
       ↓
Think Through Real Scenarios
       ↓
Implement
```

**Don't start coding immediately.**

First understand the system.

---

# 2. The 7 Questions to Ask

Before writing classes, ask:

### 1. What are the important things?

Look for **nouns**.

Example:

> User rents a vehicle from a rental company.

Possible nouns:

```text
User
Vehicle
Rental
RentalCompany
```

Potential classes:

```ts
User
Vehicle
Rental
RentalCompany
```

---

### 2. What can these things do?

Look for **verbs**.

Example:

```text
rent
return
cancel
complete
check availability
```

These often become methods.

```ts
rentVehicle()
returnVehicle()
cancel()
complete()
getAvailableVehicles()
```

---

### 3. Is something a type of something else?

Ask:

> "Is A a B?"

```text
Car is a Vehicle
Bike is a Vehicle
Truck is a Vehicle
```

Then inheritance may make sense:

```ts
class Car extends Vehicle {}
class Bike extends Vehicle {}
class Truck extends Vehicle {}
```

### Quick rule

```text
"is-a" → Inheritance
```

But don't use inheritance just because two classes look similar.

---

# 3. Has-A Relationship

Ask:

> "Does A contain/use B?"

Example:

```text
Rental has a User
Rental has a Vehicle
RentalCompany has Vehicles
RentalCompany has Rentals
```

Possible design:

```ts
class Rental {
  constructor(
    public user: User,
    public vehicle: Vehicle
  ) {}
}
```

Think:

```text
"is-a" → inheritance
"has-a" → composition/aggregation
"uses-a" → association/dependency
```

---

# 4. Association vs Composition vs Aggregation

Don't get obsessed with UML terminology initially.

Ask:

### Association

> A knows/uses B.

```text
Rental ─────> User
```

---

### Aggregation

> A has B, but B can exist independently.

```text
Company ◇──── Vehicle
```

Example:

```ts
const car = new Vehicle();

const company = new RentalCompany([car]);
```

The car can conceptually exist without the company.

---

### Composition

> A strongly owns B's lifecycle.

```text
Game ─────> GameTimer
```

If the timer exists only as an internal part of that Game, stronger ownership may make sense.

### Practical rule

Instead of worrying about terminology, ask:

```text
Who creates it?
Who owns it?
Who controls its lifecycle?
Can it exist independently?
```

---

# 5. The Most Important Question: "Who Should Do This?"

When you're confused about where a method belongs, ask:

> ## Who should be responsible for this operation?

Example:

```text
Vehicle availability
```

Who owns the state?

```text
Vehicle
```

So:

```ts
vehicle.isAvailable()
vehicle.rent()
vehicle.returnVehicle()
```

---

# 6. "Who Has the Information?"

Ask:

> **Who has the information required to perform this operation?**

Example:

```text
Get all available vehicles
```

Who knows all vehicles?

```text
RentalCompany
```

Therefore:

```ts
company.getAvailableVehicles()
```

Internally:

```ts
getAvailableVehicles() {
  return this.vehicles.filter(
    vehicle => vehicle.isAvailable()
  );
}
```

Notice:

```text
Vehicle
→ knows its own availability

RentalCompany
→ knows all vehicles
```

This is **local knowledge vs collection knowledge**.

---

# 7. Ownership of State

One of the most useful LLD rules:

> **The class that owns a piece of state should usually control changes to that state.**

Example:

```ts
class Rental {
  private status: RentalStatus = "ACTIVE";

  complete() {
    this.status = "COMPLETED";
  }

  cancel() {
    this.status = "CANCELLED";
  }
}
```

Prefer:

```ts
rental.complete();
```

over:

```ts
rental.status = "COMPLETED";
```

This protects the object's state.

---

# 8. Information Owner vs Operation Coordinator

This distinction solves many LLD problems.

Example:

```text
RentalCompany
    |
    | asks
    ↓
Vehicle
```

Vehicle owns:

```text
availability
vehicle type
vehicle state
```

RentalCompany owns:

```text
vehicles[]
rentals[]
```

RentalCompany coordinates:

```text
rent vehicle
return vehicle
find available vehicles
```

So:

```text
Vehicle
→ owns vehicle state

Rental
→ owns rental state

RentalCompany
→ coordinates the overall workflow
```

---

# 9. Don't Confuse "Knows About" With "Owns"

This is extremely important.

`RentalCompany` knows about all vehicles:

```ts
vehicles: Vehicle[]
```

But that doesn't mean it should manage every internal property of Vehicle.

Bad:

```ts
company.vehicleAvailability[vehicle.id] = false;
```

Better:

```ts
vehicle.rent();
```

The company asks the Vehicle to change its own state.

Think:

```text
Company:
"Are you available?"

Vehicle:
"Yes."

Company:
"Okay, rent yourself."

Vehicle:
"Done."
```

---

# 10. Local Knowledge vs Collection Knowledge

### Object-level question

> "Is this vehicle available?"

```ts
vehicle.isAvailable()
```

### Collection-level question

> "Which vehicles are available?"

```ts
company.getAvailableVehicles()
```

This distinction is extremely useful.

```text
One object
    ↓
Object's method

Collection of objects
    ↓
Manager/service/repository/aggregate method
```

---

# 11. Responsibility Should Be Close to the Data

If an operation mainly works with an object's internal state, put it near that object.

Example:

```ts
class ParkingSpot {
  private vehicle: Vehicle | null = null;

  isAvailable() {
    return this.vehicle === null;
  }

  park(vehicle: Vehicle) {
    this.vehicle = vehicle;
  }

  removeVehicle() {
    const vehicle = this.vehicle;
    this.vehicle = null;
    return vehicle;
  }
}
```

Why?

Because ParkingSpot owns:

```text
vehicle
```

Therefore ParkingSpot should control:

```text
park()
removeVehicle()
isAvailable()
```

---

# 12. The "Who Knows?" + "Who Owns?" Test

When deciding where a method goes, ask TWO questions.

### Question 1

> Who has the required information?

### Question 2

> Who owns the state being changed?

Example:

```text
cancel rental
```

Who knows the rental status?

```text
Rental
```

Who owns rental status?

```text
Rental
```

Therefore:

```ts
rental.cancel()
```

---

Example:

```text
Find available vehicles
```

Who knows all vehicles?

```text
RentalCompany
```

Therefore:

```ts
company.getAvailableVehicles()
```

---

# 13. Methods Should Represent Responsibilities

Don't randomly add methods.

Use:

```text
Requirement
    ↓
Responsibility
    ↓
Method
```

Example:

### Requirement

> User can cancel a rental.

### Responsibility

Rental should be able to change its status to cancelled.

### Method

```ts
rental.cancel()
```

---

### Requirement

> User can see available vehicles.

### Responsibility

Company searches its vehicle collection.

### Method

```ts
company.getAvailableVehicles()
```

---

# 14. Avoid God Classes

Bad:

```ts
class RentalCompany {
  createUser() {}
  updateUser() {}
  createVehicle() {}
  deleteVehicle() {}
  rentVehicle() {}
  returnVehicle() {}
  cancelRental() {}
  calculatePrice() {}
  processPayment() {}
  sendEmail() {}
}
```

Everything is inside one class.

Instead separate responsibilities:

```text
User
Vehicle
Rental
Payment
Notification
RentalCompany
```

Each class should have a meaningful responsibility.

---

# 15. But Don't Over-Split Classes

The opposite mistake is also bad.

Don't create:

```text
VehicleId
VehicleName
VehicleAvailability
VehicleValidator
VehicleFinder
VehicleManager
VehicleChecker
VehicleRepository
```

for a tiny problem.

Start simple.

Split a class when:

* responsibility becomes too large
* behavior has a clear independent concept
* state has its own lifecycle
* code becomes difficult to understand/test
* the same behavior is reused

---

# 16. High Cohesion

A class should contain things that naturally belong together.

Good:

```ts
class Rental {
  user
  vehicle
  status

  complete()
  cancel()
}
```

All of these relate to a rental.

Bad:

```ts
class Rental {
  user
  vehicle
  status

  sendEmail()
  processPayment()
  generatePDF()
  calculateTax()
  createUser()
}
```

These responsibilities don't naturally belong together.

---

# 17. Low Coupling

Try not to make every class depend on every other class.

Bad:

```text
User ───> RentalCompany
User ───> Payment
User ───> Vehicle
User ───> Notification
Vehicle ───> Payment
Vehicle ───> User
...
```

This becomes difficult to change.

Prefer controlled relationships:

```text
RentalCompany
    ↓
Rental
    ↓
User
Vehicle
```

The exact structure depends on the domain, but avoid unnecessary dependencies.

---

# 18. Prefer Objects Talking Through Methods

Instead of accessing internal state:

```ts
vehicle.available = false;
```

prefer:

```ts
vehicle.rent();
```

Instead of:

```ts
rental.status = "CANCELLED";
```

prefer:

```ts
rental.cancel();
```

This gives the class control over its invariants.

---

# 19. Encapsulation

Keep internal state private whenever possible.

```ts
class Vehicle {
  private status: VehicleStatus = "AVAILABLE";

  isAvailable() {
    return this.status === "AVAILABLE";
  }

  rent() {
    if (this.status !== "AVAILABLE") {
      throw new Error("Vehicle is not available");
    }

    this.status = "RENTED";
  }
}
```

Now nobody can accidentally do:

```ts
vehicle.status = "RENTED";
```

without going through the rules.

---

# 20. Protect Invariants

An invariant is something that should always remain valid.

Example:

```textA vehicle cannot be rented if it is already rented.
```

Don't rely on callers to remember this.

Put the rule inside the responsible object:

```ts
rent() {
  if (!this.isAvailable()) {
    throw new Error("Vehicle already rented");
  }

  this.status = "RENTED";
}
```

The object protects itself.

---

# 21. Don't Make Everything Public

Avoid:

```ts
class Vehicle {
  public available: boolean;
}
```

Prefer:

```ts
class Vehicle {
  private available = true;

  isAvailable() {
    return this.available;
  }
}
```

Expose behavior rather than raw state.

Think:

```text
Tell me what you can do
```

instead of:

```text
Give me all your internal data and I'll manage it.
```

---

# 22. Prefer Composition Over Inheritance

Before using:

```ts
class Car extends Vehicle
```

ask:

> "Is Car actually a Vehicle?"

If yes, inheritance may be appropriate.

But when behavior needs to be combined:

```text
Game
 ├── Timer
 ├── Score
 └── Drawing
```

composition is often cleaner:

```ts
class Game {
  constructor(
    private timer: Timer,
    private score: Score,
    private drawing: Drawing
  ) {}
}
```

### Mental rule

```text
is-a → consider inheritance

has-a / uses-a → consider composition
```

---

# 23. Don't Use Inheritance Just for Code Reuse

This is a common beginner mistake:

```ts
class EmailNotification {}
class SMSNotification extends EmailNotification {}
```

Just because both have:

```text
send()
```

doesn't mean SMS is an EmailNotification.

Ask the semantic question:

> **Is it actually an "is-a" relationship?**

If not, consider an interface/strategy/composition.

---

# 24. Program to Interfaces

When multiple implementations exist, think:

```ts
interface PaymentMethod {
  pay(amount: number): void;
}
```

Then:

```ts
class CardPayment implements PaymentMethod {
  pay(amount: number) {}
}

class UpiPayment implements PaymentMethod {
  pay(amount: number) {}
}
```

Now higher-level code can depend on:

```ts
PaymentMethod
```

rather than a specific implementation.

This helps reduce coupling.

---

# 25. Dependency Injection

Instead of:

```ts
class Game {
  private timer = new Timer();
}
```

you can sometimes do:

```ts
class Game {
  constructor(
    private timer: Timer
  ) {}
}
```

Then:

```ts
const timer = new Timer();
const game = new Game(timer);
```

Why?

Because `Game` doesn't decide how Timer is created.

This makes testing and replacing dependencies easier.

---

# 26. Don't Create Dependencies Inside Every Class

Prefer:

```ts
class Game {
  constructor(
    private timer: Timer
  ) {}
}
```

over:

```ts
class Game {
  private timer = new Timer();
}
```

when the dependency is something the class should receive from outside.

But don't blindly inject everything.

Simple value objects and genuinely internal implementation details can still be created internally.

---

# 27. Factory Pattern — When Creation Gets Complicated

If object creation becomes conditional:

```text
Vehicle type:
Car
Bike
Truck
```

and creation logic becomes messy:

```ts
if (type === "CAR") ...
else if (type === "BIKE") ...
else if (type === "TRUCK") ...
```

a Factory can be useful.

```ts
class VehicleFactory {
  static create(type: VehicleType): Vehicle {
    // creation logic
  }
}
```

Don't use Factory just because:

> "Factory is an LLD pattern."

Use it when object creation actually benefits from being separated.

---

# 28. Strategy Pattern — When Behavior Varies

If an operation has multiple interchangeable algorithms:

```text
Payment
 ├── Card
 ├── UPI
 └── Cash
```

or:

```text
Pricing
 ├── HourlyPricing
 ├── DailyPricing
 └── WeekendPricing
```

think:

```ts
interface PricingStrategy {
  calculate(amount: number): number;
}
```

Then different strategies implement it.

Use Strategy when:

> **The behavior/algorithm changes, not merely the data.**

---

# 29. Singleton — Use Carefully

Singleton means:

```text
Only one instance
```

Example:

```ts
class GameStore {
  private static instance: GameStore;

  private constructor() {}

  static getInstance() {
    if (!GameStore.instance) {
      GameStore.instance = new GameStore();
    }

    return GameStore.instance;
  }
}
```

Before using Singleton ask:

> "Does the system genuinely require exactly one shared instance?"

Don't use it just because it is easy.

---

# 30. Map vs Array vs Set vs Object

### Use Array when:

You care about:

```text
ordering
iteration
duplicates
```

Example:

```ts
vehicles: Vehicle[]
```

---

### Use Set when:

You need:

```text
unique values
fast membership checking
```

Example:

```ts
activeUserIds: Set<string>
```

---

### Use Map when:

You frequently find something by a key.

```ts
vehicles: Map<string, Vehicle>
```

Then:

```ts
vehicles.get(vehicleId)
```

instead of:

```ts
vehicles.find(v => v.id === vehicleId)
```

---

### Use Object when:

You're representing a simple key-value structure/configuration.

```ts
const config = {
  maxRetries: 3,
  timeout: 5000
};
```

### Quick rule

```text
Need order/list?          → Array
Need uniqueness?          → Set
Need key → value lookup?  → Map
Simple data/config?       → Object
```

---

# 31. Don't Optimize Before You Need To

Start with:

```ts
Vehicle[]
```

If later you need:

```text
find vehicle by ID frequently
```

then consider:

```ts
Map<string, Vehicle>
```

Don't start every LLD problem with:

```text
Redis
HashMap
Cache
Database
Message Queue
```

unless the requirements actually need them.

---

# 32. Think About State Transitions

Many LLD problems become easier when you identify states.

Example Rental:

```text
ACTIVE
   |
   ├──> COMPLETED
   |
   └──> CANCELLED
```

Then:

```ts
type RentalStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED";
```

Methods:

```ts
complete()
cancel()
```

And validate invalid transitions.

For example:

```text
COMPLETED → ACTIVE
```

should probably not be allowed.

---

# 33. Draw the Object Interaction

Before coding, draw something simple:

```text
RentalCompany
      |
      ├──── vehicles[]
      |
      └──── rentals[]

Rental
  ├──── User
  └──── Vehicle
```

Then ask:

> What happens when `rentVehicle()` is called?

Example:

```text
Client
  |
  ↓
RentalCompany.rentVehicle()
  |
  ↓
Vehicle.isAvailable()
  |
  ↓
Vehicle.rent()
  |
  ↓
new Rental()
  |
  ↓
rentals.push(rental)
```

If you can explain this flow, you're ready to code.

---

# 34. The "Scenario Test"

After designing classes, simulate real actions.

For Rental System:

### Scenario 1

```text
User rents car
```

Ask:

```text
Who receives the request?
Who checks availability?
Who changes vehicle state?
Who creates Rental?
Who stores Rental?
```

---

### Scenario 2

```text
User returns car
```

Ask:

```text
Who finds Rental?
Who completes Rental?
Who makes Vehicle available?
```

---

### Scenario 3

```text
User cancels rental
```

Ask:

```text
Who owns Rental status?
Who changes it?
Should Vehicle become available?
```

If you don't know the answer, your responsibilities aren't clear yet.

---

# 35. The "Remove a Class" Test

After designing:

```text
User
Vehicle
Rental
RentalCompany
```

temporarily remove one.

Ask:

> "What responsibility disappears?"

If removing a class doesn't remove any meaningful responsibility, perhaps that class isn't necessary.

This prevents unnecessary classes.

---

# 36. The "God Class" Test

Look at each class and ask:

> "Can I describe this class's responsibility in one sentence?"

Good:

```text
Vehicle:
"Represents a rentable vehicle and manages its vehicle state."
```

Good:

```text
Rental:
"Represents one rental transaction and manages its rental lifecycle."
```

Good:

```text
RentalCompany:
"Coordinates vehicles and rental operations."
```

Bad:

```text
RentalCompany:
"Manages users, vehicles, payments, notifications,
pricing, authentication, database, emails..."
```

That's a warning sign.

---

# 37. The "Why Does This Method Exist Here?" Test

For every method, ask:

```text
Why is this method inside THIS class?
```

Example:

```ts
rental.cancel()
```

Answer:

> Because Rental owns rental status.

Good.

---

```ts
rentalCompany.getAvailableVehicles()
```

Answer:

> Because RentalCompany manages the collection of vehicles.

Good.

---

```ts
vehicle.cancelRental()
```

Answer:

> ❌ Vehicle shouldn't manage Rental lifecycle.

Move it.

---

# 38. Avoid Anemic Classes

An anemic class mostly contains data:

```ts
class Rental {
  user;
  vehicle;
  status;
}
```

and another class manages everything:

```ts
RentalService {
  completeRental()
  cancelRental()
  validateRental()
  ...
}
```

Sometimes service classes are appropriate, especially in application/service layers.

But in domain-heavy LLD, consider putting behavior with the state it protects:

```ts
class Rental {
  complete() {}
  cancel() {}
}
```

---

# 39. Don't Put Business Logic Everywhere

Avoid:

```ts
controller → calculates price
controller → changes vehicle state
controller → creates rental
controller → sends email
```

Controllers should generally coordinate input/output, while domain/application classes handle business logic.

Think:

```text
Controller
    ↓
Application/Service
    ↓
Domain objects
```

depending on the architecture.

---

# 40. Separate Domain Objects From Infrastructure

Don't immediately mix:

```ts
class Vehicle {
  saveToDatabase() {}
  sendEmail() {}
  callRedis() {}
}
```

A Vehicle is primarily a domain concept.

Database/repository/infrastructure concerns can be separated when the system becomes larger.

---

# 41. SOLID — What to Actually Remember

You don't need to memorize textbook definitions.

### S — Single Responsibility

> One class should have one major reason to change.

---

### O — Open/Closed

> Add new behavior without constantly modifying stable existing code.

Interfaces/Strategy can help.

---

### L — Liskov Substitution

> A subclass should genuinely behave like its parent.

If:

```ts
Car extends Vehicle
```

then Car should actually be usable wherever Vehicle is expected.

---

### I — Interface Segregation

> Don't force a class to implement methods it doesn't need.

Prefer smaller interfaces.

---

### D — Dependency Inversion

> High-level logic should depend on abstractions rather than concrete implementations when appropriate.

```ts
PaymentMethod
```

instead of directly depending on:

```ts
StripePayment
```

when interchangeable implementations are needed.

---

# 42. Don't Apply SOLID Forcefully

SOLID is a guide, not a checklist.

Bad:

```text
"I need exactly 5 interfaces because SOLID."
```

Good:

```text
"This responsibility is changing independently,
so I'll separate it."
```

Use principles to solve actual design problems.

---

# 43. Design Patterns Should Solve Problems

Don't start with:

```text
"I'll use Factory + Singleton + Observer + Strategy."
```

Start with:

```text
What problem do I have?
```

Then:

```text
Problem
   ↓
Possible design
   ↓
Pattern if useful
```

Patterns are tools, not goals.

---

# 44. Senior Developer Thinking

When experienced developers design, they often ask:

### Responsibility

> Who should own this behavior?

### Ownership

> Who owns this state?

### Coupling

> If I change A, how many classes break?

### Cohesion

> Do these things actually belong together?

### Encapsulation

> Can someone put this object into an invalid state?

### Extensibility

> What is likely to change?

### Simplicity

> Am I designing something more complicated than the requirements?

### Testability

> Can I test this class independently?

### Dependencies

> Does this class really need to know about that class?

---

# 45. The "Change Test"

This is one of the most useful advanced techniques.

Ask:

> **What is likely to change?**

Example:

```text
Payment method may change
```

Then isolate payment behavior.

```ts
interface PaymentMethod {
  pay(amount: number): void;
}
```

Another example:

```text
Pricing rules may change
```

Use a pricing strategy.

But if:

```text
Vehicle ID will never have multiple implementations
```

don't create an abstraction unnecessarily.

---

# 46. The "Future Requirement" Test

Imagine the interviewer says:

> "Tomorrow we also need bikes."

Ask:

> What classes need modification?

If adding Bike requires changing 15 unrelated classes, your design may be tightly coupled.

A good design might allow:

```ts
class Bike extends Vehicle {}
```

with minimal changes.

But don't over-engineer for imaginary requirements.

---

# 47. The "One Level of Responsibility" Rule

Try to keep responsibilities at the appropriate level.

```text
Vehicle
→ individual vehicle behavior

Floor
→ individual floor behavior

ParkingLot
→ whole parking lot behavior
```

For example:

```text
ParkingSpot
→ Is THIS spot available?

ParkingFloor
→ Which spots are available on THIS floor?

ParkingLot
→ Which spots are available across the WHOLE lot?
```

This hierarchy makes large systems much easier to understand.

---

# 48. Think in Layers of Knowledge

A useful mental model:

```text
Individual Object
       ↓
Collection / Aggregate
       ↓
Application / Coordinator
       ↓
Infrastructure
```

Example:

```text
Vehicle
   ↓
RentalCompany
   ↓
RentalService
   ↓
Repository / Database
```

Not every small LLD problem needs all these layers.

Use only what the problem needs.

---

# 49. Your LLD Cheat Sheet

When you get a new problem, write this:

```text
=============================
        LLD CHEAT SHEET
=============================

1. Nouns?
   ↓
   Possible classes

2. Verbs?
   ↓
   Possible methods

3. "Is-a"?
   ↓
   Inheritance

4. "Has-a"?
   ↓
   Composition / Aggregation

5. Who owns the state?
   ↓
   That class controls the state

6. Who has the information?
   ↓
   Candidate for the operation

7. Individual or collection?
   ↓
   Object method vs collection method

8. What can change?
   ↓
   Consider abstraction/Strategy

9. Is the class doing too much?
   ↓
   Split responsibility

10. Is the design too complicated?
    ↓
    Simplify

11. Run real scenarios
    ↓
    Check object interactions

12. Then code
=============================
```

---

# 50. The Most Important Rules to Memorize

If you remember only these, you're already in a good position:

```text
1. Don't code immediately.

2. Extract nouns → possible classes.

3. Extract verbs → possible methods.

4. "is-a" → consider inheritance.

5. "has-a" → consider composition/aggregation.

6. The owner of state should usually control that state.

7. Knowing about an object ≠ owning its internal state.

8. Collection owner manages the collection.

9. Object owner manages the object's internal behavior.

10. Ask "Who should be responsible for this?"

11. Ask "Who has the information required?"

12. Prefer behavior over direct state manipulation.

13. Keep classes highly cohesive.

14. Keep unnecessary dependencies low.

15. Don't create classes just because a noun exists.

16. Don't create patterns just because you know patterns.

17. Don't over-engineer imaginary requirements.

18. Protect invariants inside the responsible object.

19. Test the design using real scenarios.

20. If you can't explain why a method belongs to a class,
    the responsibility probably isn't clear yet.
```

---

# 51. The Final Mental Model

When you see an LLD problem, don't think:

```text
"What classes should I write?"
```

Think:

```text
"What objects exist?"

        ↓

"What does each object know?"

        ↓

"What does each object own?"

        ↓

"What can each object do?"

        ↓

"Who should be responsible for each operation?"

        ↓

"How do these objects communicate?"

        ↓

"What changes when an action happens?"

        ↓

"Can I explain the entire flow?"

        ↓

"Now I'll write the classes."
```

### The goal of LLD isn't to create many classes.

The goal is to create **the right responsibilities and relationships** so that the system is easy to understand, change, test, and extend.

---

## One sentence to remember

> ### **"Put behavior where the relevant state and knowledge naturally live, and let higher-level objects coordinate rather than micromanage internal state."**

That's one of the most useful mental models you can carry into almost every LLD problem.
