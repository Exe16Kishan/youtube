class MenuItem {
  constructor(
    public id: string,
    public name: string,
    public price: number,
  ) {}
}

class Restaurant {
  private menuItems: MenuItem[] = [];
  constructor(
    public id: string,
    public name: string,
  ) {}
  addMenuItem(newItem: MenuItem) {
    if (this.menuItems.includes(newItem)) {
      console.log("Item already exists");
      return;
    }
    // if not then add
    this.menuItems.push(newItem);
  }

  removeMenuItem(itemId: string) {
    this.menuItems = this.menuItems.filter((item) => item.id !== itemId);
  }

  showMenu() {
    console.log(this.menuItems);
  }
}

class Custumer {
  private orderList: Order[];
  constructor(
    public id: string,
    public name: string,
  ) {
    this.orderList = [];
  }

  createOrder() {
    // he can create order
    const newOrder = new Order();
    this.orderList.push(newOrder);
    return newOrder;
  }

  viewOrder() {
    console.log(this.orderList);
  }
}

class OrderItem {
  constructor(
    public orderItem: MenuItem,
    public quantity: number,
  ) {}
  getTotal() {
    return this.orderItem.price * this.quantity;
  }
}

type OrderStatus = "PENDING" | "PLACED" | "CANCELLED";

class Order {
  private orderItems: OrderItem[];
  private status: OrderStatus;
  constructor() {
    this.orderItems = [];
    this.status = "PENDING";
  }

  addItem(newItem: OrderItem) {
    this.orderItems.push(newItem);
  }

  removeItem(order: OrderItem) {
    this.orderItems = this.orderItems.filter((item) => item !== order);
  }

  calculateTotal() {
    return this.orderItems.reduce((total, item) => {
      let price = item.getTotal();
      total += price;
    //   console.log(total)
      return total;
    },  0);
     
  }

  placeOrder() {
    if (this.orderItems.length === 0) {
        console.log(" add some items")
        return
    }
    this.status = "PLACED";
    // console.log(this.status)
  } 

  cancelOrder() {
    if (this.status !== "PLACED") {
        console.log("first place the order")
        return 
    }
    this.status = "CANCELLED"
  }

  getOrderList(){
    console.log(this.orderItems)
  }

  getStatus(){
    console.log(this.status)
  }
}


export {
    Custumer,Restaurant,Order,OrderItem,MenuItem
}