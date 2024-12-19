//Data Structures
class MenuItem {
    constructor(name, price, category) {
        this.name = name;
        this.price = price;
        this.category = category;
    }
}

class OrderItem {
    constructor(menuItem, quantity) {
        this.menuItem = menuItem;
        this.quantity = quantity;
    }

    get totalPrice() {
        return this.menuItem.price * this.quantity;
    }
}

//User Authentication
const sellers = {
    "admin": "password.lmnop" 
};

function authenticateSeller() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");
    return sellers[username] === password;
}

//Menu Management
const menu = {
    Pasta: [],
    Desserts: [],
    Drinks: []
};

function addMenuItem() {
    const category = prompt("Enter category (Pasta, Desserts, Drinks):");
    const name = prompt("Enter item name:");
    const price = parseFloat(prompt("Enter price:"));
    menu[category].push(new MenuItem(name, price, category));
    console.log("Item added successfully!");
}

function removeMenuItem() {
    const category = prompt("Enter category (Pasta, Desserts, Drinks):");
    const name = prompt("Enter item name to remove:");
    menu[category] = menu[category].filter(item => item.name !== name);
    console.log("Item removed successfully!");
}

//Simple Bubble Sort 
function bubbleSort(arr, key) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i][key] > arr[i + 1][key]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);
}

//Order Management
const cart = [];

function addToCart() {
    displayMenu();
    const category = prompt("Enter category:");
    const itemName = prompt("Enter item name:");
    const quantity = parseInt(prompt("Enter quantity:"));

    const item = menu[category].find(item => item.name === itemName);
    if (item) {
        cart.push(new OrderItem(item, quantity));
        console.log("Item added to cart!");
    } else {
        console.log("Item not found!");
    }
}

function removeFromCart() {
    displayCart();
    const itemName = prompt("Enter item name to remove:");
    cart.filter(item => item.menuItem.name !== itemName);
    console.log("Item removed from cart!");
}

function displayMenu() {
    for (const category in menu) {
        console.log(`\n--- ${category} ---`);
        menu[category].forEach(item => console.log(`${item.name} - $${item.price.toFixed(2)}`));
    }
}

function displayCart() {
    console.log("\n--- Shopping Cart ---");
    if (cart.length === 0) {
        console.log("Your cart is empty.");
        return;
    }
    bubbleSort(cart, 'menuItem.name'); //Sort by item name
    let totalPrice = 0;
    cart.forEach(item => {
        const lineTotal = item.totalPrice;
        console.log(`${item.menuItem.name} x ${item.quantity} = $${lineTotal.toFixed(2)}`);
        totalPrice += lineTotal;
    });
    console.log(`\nTotal: $${totalPrice.toFixed(2)}`);
}

//Main Program
function main() {
    while (true) {
        const userType = prompt("Are you a SELLER or CUSTOMER? (seller/customer)").toLowerCase();
        if (userType === "seller") {
            if (authenticateSeller()) {
                while (true) {
                    const action = prompt("Choose an action: LOGOUT, ADD, REMOVE").toUpperCase();
                    if (action === "LOGOUT") break;
                    if (action === "ADD") addMenuItem();
                    else if (action === "REMOVE") removeMenuItem();
                    else console.log("Invalid action!");
                }
            } else {
                console.log("Authentication failed!");
            }
        } else if (userType === "customer") {
            while (true) {
                const action = prompt("Choose an action: ORDER, CART, CANCEL").toUpperCase();
                if (action === "CANCEL") break;
                if (action === "ORDER") addToCart();
                else if (action === "CART") {
                    while (true) {
                        const cartAction = prompt("Choose an action: PRINT, ADD, REMOVE, CANCEL").toUpperCase();
                        if (cartAction === "CANCEL") break;
                        if (cartAction === "PRINT") displayCart();
                        else if (cartAction === "ADD") break; //Go back to main customer menu
                        else if (cartAction === "REMOVE") removeFromCart();
                        else console.log("Invalid cart action!");
                    }
                } else {
                    console.log("Invalid action!");
                }
            }
        } else {
            console.log("Invalid user type!");
        }
    }
}

//Start the program
main();