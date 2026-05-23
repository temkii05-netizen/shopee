const reloadPage = document.getElementById('reloadPage');

reloadPage.addEventListener('click', () => {
  location.reload();
});

const minPriceRange = document.getElementById('minPriceRange');
const maxPriceRange = document.getElementById('maxPriceRange');

const minPriceValue = document.getElementById('minPriceValue');
const maxPriceValue = document.getElementById('maxPriceValue');

const cards = document.querySelectorAll('.card');

function filterProducts() {

  let minPrice = parseInt(minPriceRange.value);
  let maxPrice = parseInt(maxPriceRange.value);

  if (minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  minPriceValue.textContent =
    minPrice.toLocaleString('ru-RU') + ' ₽';

  maxPriceValue.textContent =
    maxPrice.toLocaleString('ru-RU') + ' ₽';

  cards.forEach(card => {

    const price =
      parseInt(card.dataset.price);

    const matchesPrice =
      price >= minPrice &&
      price <= maxPrice;

    card.style.display =
      matchesPrice ? 'block' : 'none';

  });

}

minPriceRange.addEventListener(
  'input',
  filterProducts
);

maxPriceRange.addEventListener(
  'input',
  filterProducts
);

const cartButton =
  document.getElementById('cartButton');

const cartModal =
  document.getElementById('cartModal');

const closeCart =
  document.getElementById('closeCart');

const cartItems =
  document.getElementById('cartItems');

const cartTotal =
  document.getElementById('cartTotal');

const cartCount =
  document.getElementById('cartCount');

const addCartButtons =
  document.querySelectorAll('.add-cart');

const checkoutBtn =
  document.getElementById('checkoutBtn');

const orderForm =
  document.getElementById('orderForm');

const successMessage =
  document.getElementById('successMessage');

let total = 0;
let count = 0;

cartButton.addEventListener('click', () => {
  cartModal.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

checkoutBtn.addEventListener('click', () => {
  orderForm.style.display = 'flex';
});

orderForm.addEventListener('submit', (e) => {

  e.preventDefault();

  successMessage.style.display = 'block';

  orderForm.reset();

});

addCartButtons.forEach(button => {

  button.addEventListener('click', () => {

    const card =
      button.closest('.card');

    const title =
      card.querySelector('h2').textContent;

    const priceText =
      card.querySelector('.price').textContent;

    const numericPrice =
      parseInt(card.dataset.price);

    const item =
      document.createElement('div');

    item.innerHTML =
      `<strong>${title}</strong><br>${priceText}`;

    cartItems.appendChild(item);

    total += numericPrice;
    count += 1;

    cartTotal.textContent =
      total.toLocaleString('ru-RU') + ' ₽';

    cartCount.textContent = count;

  });

});