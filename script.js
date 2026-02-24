const taxRate = 0.0925; // 9.25%
let cart = {};

// 1. Toggle Hamburger Menu
document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('active');
});

// 2. Handle Plus/Minus Buttons
document.querySelectorAll('.menu-item').forEach(item => {
    const name = item.getAttribute('data-name');
    const price = parseFloat(item.getAttribute('data-price'));
    const qtySpan = item.querySelector('.qty');

    item.querySelector('.btn-plus').addEventListener('click', () => {
        cart[name] = (cart[name] || 0) + 1;
        updateUI();
    });

    item.querySelector('.btn-minus').addEventListener('click', () => {
        if (cart[name] > 0) {
            cart[name]--;
            updateUI();
        }
    });

    function updateUI() {
        const count = cart[name] || 0;
        qtySpan.innerText = count;
        calculateTotals();
    }
});

// 3. Calculate Totals
function calculateTotals() {
    let subtotal = 0;
    let itemCount = 0;

    document.querySelectorAll('.menu-item').forEach(item => {
        const name = item.getAttribute('data-name');
        const price = parseFloat(item.getAttribute('data-price'));
        const count = cart[name] || 0;
        subtotal += count * price;
        itemCount += count;
    });

    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
    document.getElementById('tax').innerText = tax.toFixed(2);
    document.getElementById('total').innerText = total.toFixed(2);
    document.getElementById('cart-count').innerText = itemCount;
}
