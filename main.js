
// ===================================
// THE GREEN SPOON
// Main JavaScript File
// ===================================


// 1. RESTAURANT SETTINGS

const restaurant = {
    name: "The Green Spoon",

    // REPLACE THIS WITH THE RESTAURANT'S
    // REAL WHATSAPP NUMBER.
    // Example: 254712345678
    whatsapp: "254116118541"
};


// 2. FOOD MENU DATABASE
// This is a JavaScript array, not a real database.

const menuItems = [

    {
        id: 1,
        name: "Beef Pilau",
        category: "Main Meals",
        description: "Delicious spiced rice served with tender beef.",
        price: 350,
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 2,
        name: "Chicken Biryani",
        category: "Main Meals",
        description: "Aromatic rice with perfectly seasoned chicken.",
        price: 450,
        image: "https://images.unsplash.com/photo-1563379091339-03246963d96c?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 3,
        name: "Chapati & Beans",
        category: "Main Meals",
        description: "Fresh Kenyan chapati served with tasty beans.",
        price: 200,
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 4,
        name: "Classic Beef Burger",
        category: "Fast Food",
        description: "Juicy beef burger with fresh vegetables.",
        price: 400,
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 5,
        name: "Chicken Pizza",
        category: "Fast Food",
        description: "Cheesy pizza topped with seasoned chicken.",
        price: 850,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 6,
        name: "French Fries",
        category: "Fast Food",
        description: "Golden crispy fries served hot.",
        price: 180,
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 7,
        name: "Fresh Mango Juice",
        category: "Drinks",
        description: "Refreshing natural mango juice.",
        price: 150,
        image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 8,
        name: "Fresh Orange Juice",
        category: "Drinks",
        description: "Freshly squeezed orange juice.",
        price: 150,
        image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 9,
        name: "Chocolate Cake",
        category: "Desserts",
        description: "Soft chocolate cake with rich chocolate flavour.",
        price: 250,
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=75"
    },

    {
        id: 10,
        name: "Vanilla Ice Cream",
        category: "Desserts",
        description: "Creamy and delicious vanilla ice cream.",
        price: 180,
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=75"
    }

];


// 3. GET HTML ELEMENTS

const menuGrid = document.getElementById("menuGrid");

const categoryFilters = document.getElementById(
    "categoryFilters"
);


// 4. FORMAT KENYAN SHILLINGS

function formatPrice(price) {

    return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0
    }).format(price);

}


// 5. DISPLAY MENU ITEMS

function displayMenu(items) {

    menuGrid.innerHTML = "";

    if (items.length === 0) {

        menuGrid.innerHTML = `
            <p class="empty-message">
                No food items found in this category.
            </p>
        `;

        return;
    }

    items.forEach(function(item) {

        const foodCard = document.createElement("article");

        foodCard.className = "food-card";

        foodCard.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
                class="food-image"
                loading="lazy"
            >

            <div class="food-info">

                <span class="food-category">
                    ${item.category}
                </span>

                <h3>${item.name}</h3>

                <p class="food-description">
                    ${item.description}
                </p>

                <div class="food-bottom">

                    <span class="food-price">
                        ${formatPrice(item.price)}
                    </span>

                    <button
                        class="order-btn"
                        type="button"
                        data-id="${item.id}"
                    >
                        Order Now
                    </button>

                </div>

            </div>

        `;

        menuGrid.appendChild(foodCard);

    });

}


// 6. FILTER MENU BY CATEGORY

categoryFilters.addEventListener("click", function(event) {

    const clickedButton = event.target.closest(".filter-btn");

    if (!clickedButton) {
        return;
    }

    const selectedCategory = clickedButton.dataset.category;

    // Remove active class from all buttons.

    const buttons = categoryFilters.querySelectorAll(
        ".filter-btn"
    );

    buttons.forEach(function(button) {

        button.classList.remove("active");

    });


    // Highlight selected button.

    clickedButton.classList.add("active");


    // Display selected category.

    if (selectedCategory === "All") {

        displayMenu(menuItems);

    } else {

        const filteredItems = menuItems.filter(function(item) {

            return item.category === selectedCategory;

        });

        displayMenu(filteredItems);

    }

});


// 7. WHATSAPP ORDERING

menuGrid.addEventListener("click", function(event) {

    const orderButton = event.target.closest(".order-btn");

    if (!orderButton) {
        return;
    }

    const itemId = Number(orderButton.dataset.id);

    const selectedItem = menuItems.find(function(item) {

        return item.id === itemId;

    });

    if (!selectedItem) {
        return;
    }


    // Check WhatsApp number.

    if (!/^254\d{9}$/.test(restaurant.whatsapp)) {

        alert(
            "Please configure the restaurant WhatsApp number first."
        );

        return;
    }


    // Create order message.

    const message =

        `Hello ${restaurant.name}! ` +
        `I would like to order:\n\n` +

        `Food: ${selectedItem.name}\n` +

        `Category: ${selectedItem.category}\n` +

        `Price: ${formatPrice(selectedItem.price)}\n\n` +

        `Please confirm availability. Thank you!`;


    // Encode message for WhatsApp.

    const whatsappURL =

        `https://wa.me/${restaurant.whatsapp}` +
        `?text=${encodeURIComponent(message)}`;


    // Open WhatsApp.

    window.open(whatsappURL, "_blank");

});


// 8. AUTOMATIC COPYRIGHT YEAR

document.getElementById("currentYear").textContent =

    new Date().getFullYear();


// 9. LOAD THE MENU WHEN PAGE OPENS

displayMenu(menuItems);

console.log("The Green Spoon menu loaded successfully!");
