// Ensure this replaces your existing <script> section in index.html
const menuData = [
    { category: "Salads", items: [
        { name: "Garden Salad", price: 6.99, desc: "Iceberg, Spring Mix, Tomato, Onion, Cheese, Croutons" },
        { name: "Garden Salad w/ Beef Patty", price: 9.19 },
        { name: "Grilled Chicken Salad", price: 9.79 }
    ]},
    { category: "Sandwiches", items: [
        { name: "Hamburger", price: 5.99 }, { name: "Ranch Burger", price: 6.49 },
        { name: "Cheeseburger", price: 6.99 }, { name: "Double Cheeseburger", price: 8.99 },
        { name: "Double Bacon Cheeseburger", price: 10.79 }, { name: "Chili Cheeseburger", price: 8.19 },
        { name: "Chicken Wrap", price: 6.99 }, { name: "Crispy Chicken Sandwich", price: 6.99 },
        { name: "Grilled Chicken Sandwich", price: 6.99 }, { name: "Grilled Cheese", price: 3.99 },
        { name: "BLT", price: 5.49, desc: "Bacon, Mayo, Lettuce, Tomato" }, { name: "Steak Sandwich", price: 8.19 }
    ]},
    { category: "Extras / Add-ons", items: [
        { name: "Biscuit", price: 2.19 }, { name: "Gravy", price: 1.69 },
        { name: "Jalapenos", price: 0.89 }, { name: "Cheese", price: 0.89 },
        { name: "Chili", price: 1.19 }, { name: "Bacon", price: 1.99 },
        { name: "Grilled Chicken Add-on", price: 2.19 }, { name: "Beef Patty Add-on", price: 2.99 }
    ]},
    { category: "Other Stuff", items: [
        { name: "Frito Chili Pie", price: 6.99 }, { name: "Burrito Meal", price: 6.99 },
        { name: "Double Burrito Meal", price: 9.19 }, { name: "Mexican Delight", price: 8.19 },
        { name: "Chicken Fry Dinner", price: 10.99, desc: "w/ Fries, Tots, or Okra" },
        { name: "Chicken Strips (5 pc)", price: 7.79 }, { name: "Popcorn Chicken", price: 5.99 },
        { name: "Chicken Quesadilla", price: 6.49 }, { name: "Chili Bowl", price: 5.49 },
        { name: "Spicy Cheese Curds", price: 4.99 }
    ]},
    { category: "Sides", items: [
        { name: "French Fries", price: 3.59 }, { name: "Tater Tots", price: 3.59 },
        { name: "Cheese Fries or Tater Tots", price: 4.99 }, { name: "Onion Rings", price: 4.59 },
        { name: "Fried Okra", price: 3.49 }, { name: "Texas Toothpick", price: 4.99 },
        { name: "Chili Cheese Fries", price: 6.49 }, { name: "Chicken Cheese Fries", price: 7.49 },
        { name: "Chicken Chili Cheese Fries", price: 9.99 }
    ]},
    { category: "Drinks", items: [
        { name: "Soft Drinks & Iced tea", price: 2.99 }
    ]}
];

let cart = {};
const TAX_RATE = 0.0925;

function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = ''; // Clear container
    menuData.forEach((sec, idx) => {
        let html = `
            <div class="hero-category-card" onclick="toggleCategory(${idx})">
                <h2 class="italic-header">${sec.category} <span class="arrow" id="arrow-${idx}">▼</span></h2>
                <div class="item-list" id="list-${idx}" style="display: none;">`;
        
        sec.items.forEach(item => {
            const safeId = item.name.replace(/[^a-zA-Z0-9]/g, '');
            html += `
                <div class="menu-item" onclick="event.stopPropagation()">
                    <div class="item-info">
                        <span class="name">${item.name}</span>
                        ${item.desc ? `<p class="desc">${item.desc}</p>` : ''}
                    </div>
                    <div class="controls">
                        <span class="price">$${item.price.toFixed(2)}</span>
                        <div class="stepper">
                            <button onclick="updateQty('${item.name}', -1, ${item.price})">-</button>
                            <span id="qty-${safeId}">0</span>
                            <button onclick="updateQty('${item.name}', 1, ${item.price})">+</button>
                        </div>
                    </div>
                </div>`;
        });
        html += `</div></div>`;
        container.innerHTML += html;
    });
}

function toggleCategory(idx) {
    const list = document.getElementById(`list-${idx}`);
    const arrow = document.getElementById(`arrow-${idx}`);
    const card = list.parentElement;
    
    const isOpening = list.style.display === "none";
    
    // Toggle display
    list.style.display = isOpening ? "block" : "none";
    arrow.style.transform = isOpening ? "rotate(180deg)" : "rotate(0deg)";
    
    // Smooth scroll into view if opening
    if (isOpening) {
        setTimeout(() => {
            card.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }
}

function updateQty(name, delta, price) {
    const id = name.replace(/[^a-zA-Z0-9]/g, '');
    cart[name] = (cart[name] || 0) + delta;
    if (cart[name] < 0) cart[name] = 0;
    
    const qtyElement = document.getElementById(`qty-${id}`);
    if (qtyElement) qtyElement.innerText = cart[name];
    calc();
}

function calc() {
    let sub = 0;
    menuData.forEach(s => s.items.forEach(i => { 
        if(cart[i.name]) sub += cart[i.name] * i.price; 
    }));
    let tx = sub * TAX_RATE;
    document.getElementById('subtotal').innerText = `$${sub.toFixed(2)}`;
    document.getElementById('tax').innerText = `$${tx.toFixed(2)}`;
    document.getElementById('total').innerText = `$${(sub + tx).toFixed(2)}`;
}

renderMenu();
