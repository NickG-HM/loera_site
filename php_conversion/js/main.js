/**
 * Main JavaScript file for the LOERA Shop
 */

// DOM Elements
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
const mobileNavClose = document.getElementById('mobile-nav-close');
const cartIconContainer = document.getElementById('cart-icon-container');
const cartDrawer = document.getElementById('cart-drawer');
const cartDrawerClose = document.getElementById('cart-drawer-close');
const overlay = document.getElementById('overlay');
const currencyButtons = document.querySelectorAll('.currency-button');
const productThumbnails = document.querySelectorAll('.product-thumbnail');
const productMainImage = document.querySelector('.product-main-image img');
const quantityDecrease = document.getElementById('quantity-decrease');
const quantityIncrease = document.getElementById('quantity-increase');
const quantityInput = document.getElementById('quantity-input');
const addToCartForm = document.getElementById('add-to-cart-form');

// Object to store cart data
let cart = {
  items: [],
  total: 0
};

// Initialize the application
function init() {
  setupEventListeners();
  loadCartFromLocalStorage();
  updateCartCount();
  updateCartDrawer();
}

// Set up event listeners
function setupEventListeners() {
  // Mobile navigation toggle
  if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      overlay.classList.add('open');
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Cart drawer toggle
  if (cartIconContainer) {
    cartIconContainer.addEventListener('click', () => {
      cartDrawer.classList.add('open');
      overlay.classList.add('open');
    });
  }

  if (cartDrawerClose) {
    cartDrawerClose.addEventListener('click', () => {
      cartDrawer.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Close mobile nav and cart drawer when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      cartDrawer.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // Currency switcher
  if (currencyButtons.length > 0) {
    currencyButtons.forEach(button => {
      button.addEventListener('click', () => {
        currencyButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Store selected currency in localStorage
        localStorage.setItem('currency', button.dataset.currency);
        
        // Update prices
        updatePrices(button.dataset.currency);
      });
    });
    
    // Set active currency from localStorage
    const savedCurrency = localStorage.getItem('currency') || 'BYN';
    currencyButtons.forEach(btn => {
      if (btn.dataset.currency === savedCurrency) {
        btn.classList.add('active');
        updatePrices(savedCurrency);
      }
    });
  }

  // Product thumbnails
  if (productThumbnails.length > 0 && productMainImage) {
    productThumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        productThumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');
        productMainImage.src = thumbnail.querySelector('img').src;
      });
    });
  }

  // Quantity selector
  if (quantityDecrease && quantityIncrease && quantityInput) {
    quantityDecrease.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    quantityIncrease.addEventListener('click', () => {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    });
  }

  // Add to cart form
  if (addToCartForm) {
    addToCartForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const productId = addToCartForm.dataset.productId;
      const productTitle = addToCartForm.dataset.productTitle;
      const productPrice = addToCartForm.dataset.productPrice;
      const productImage = addToCartForm.dataset.productImage;
      const quantity = parseInt(quantityInput.value);
      
      addToCart({
        id: parseInt(productId),
        title: productTitle,
        price: productPrice,
        image: productImage,
        quantity: quantity
      });
      
      // Show success message
      showMessage('Товар добавлен в корзину', 'success');
      
      // Update cart UI
      updateCartCount();
      updateCartDrawer();
    });
  }
  
  // Setup cart item quantity buttons and remove buttons
  document.addEventListener('click', (e) => {
    // Increase quantity
    if (e.target.classList.contains('cart-item-quantity-increase')) {
      const itemId = parseInt(e.target.dataset.itemId);
      updateCartItemQuantity(itemId, 1);
    }
    
    // Decrease quantity
    if (e.target.classList.contains('cart-item-quantity-decrease')) {
      const itemId = parseInt(e.target.dataset.itemId);
      updateCartItemQuantity(itemId, -1);
    }
    
    // Remove item
    if (e.target.classList.contains('cart-item-remove')) {
      const itemId = parseInt(e.target.dataset.itemId);
      removeFromCart(itemId);
    }
  });
  
  // Checkout Form
  const checkoutForm = document.getElementById('checkout-form');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const notes = document.getElementById('notes').value;
      
      // Format cart items for WhatsApp
      let cartMessage = `Новый заказ от ${name}:\n\n`;
      cart.items.forEach(item => {
        cartMessage += `${item.title} x ${item.quantity} - ${item.price} руб.\n`;
      });
      
      cartMessage += `\nИтого: ${cart.total} руб.\n\n`;
      cartMessage += `Имя: ${name}\n`;
      cartMessage += `Email: ${email}\n`;
      cartMessage += `Телефон: ${phone}\n`;
      cartMessage += `Адрес: ${address}\n`;
      
      if (notes) {
        cartMessage += `Примечания: ${notes}\n`;
      }
      
      // Encode message for WhatsApp
      const encodedMessage = encodeURIComponent(cartMessage);
      
      // WhatsApp phone number (replace with your actual phone number)
      const whatsappPhone = '+375291234567';
      
      // Open WhatsApp with prefilled message
      window.open(`https://wa.me/${whatsappPhone}?text=${encodedMessage}`, '_blank');
    });
  }
}

// Cart Functions
function addToCart(item) {
  // Check if item already exists in cart
  const existingItemIndex = cart.items.findIndex(cartItem => cartItem.id === item.id);
  
  if (existingItemIndex !== -1) {
    // Update existing item quantity
    cart.items[existingItemIndex].quantity += item.quantity;
  } else {
    // Add new item to cart
    cart.items.push(item);
  }
  
  // Calculate cart total
  calculateCartTotal();
  
  // Save cart to localStorage
  saveCartToLocalStorage();
}

function updateCartItemQuantity(itemId, change) {
  const itemIndex = cart.items.findIndex(item => item.id === itemId);
  
  if (itemIndex !== -1) {
    cart.items[itemIndex].quantity += change;
    
    // Remove item if quantity becomes 0 or less
    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    }
    
    // Calculate cart total
    calculateCartTotal();
    
    // Save cart to localStorage
    saveCartToLocalStorage();
    
    // Update cart UI
    updateCartCount();
    updateCartDrawer();
    updateCartPage();
  }
}

function removeFromCart(itemId) {
  cart.items = cart.items.filter(item => item.id !== itemId);
  
  // Calculate cart total
  calculateCartTotal();
  
  // Save cart to localStorage
  saveCartToLocalStorage();
  
  // Update cart UI
  updateCartCount();
  updateCartDrawer();
  updateCartPage();
}

function calculateCartTotal() {
  cart.total = cart.items.reduce((total, item) => {
    const price = parseFloat(item.price.replace(/[^\d.,]/g, '').replace(',', '.'));
    return total + (price * item.quantity);
  }, 0);
}

function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  const savedCart = localStorage.getItem('cart');
  
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  
  if (cartCount) {
    const totalItems = cart.items.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
      cartCount.style.display = 'flex';
    } else {
      cartCount.style.display = 'none';
    }
  }
}

function updateCartDrawer() {
  const cartDrawerContent = document.querySelector('.cart-drawer-content');
  const cartDrawerTotal = document.querySelector('.cart-drawer-total-value');
  
  if (cartDrawerContent && cartDrawerTotal) {
    if (cart.items.length === 0) {
      cartDrawerContent.innerHTML = '<p class="text-center py-4">Ваша корзина пуста</p>';
    } else {
      let html = '';
      
      cart.items.forEach(item => {
        html += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            <div class="cart-item-info">
              <h3 class="cart-item-title">${item.title}</h3>
              <p class="cart-item-price">${item.price}</p>
              <div class="cart-item-quantity">
                <button class="cart-item-quantity-decrease" data-item-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="cart-item-quantity-increase" data-item-id="${item.id}">+</button>
              </div>
              <button class="cart-item-remove" data-item-id="${item.id}">Удалить</button>
            </div>
          </div>
        `;
      });
      
      cartDrawerContent.innerHTML = html;
    }
    
    cartDrawerTotal.textContent = formatPrice(cart.total);
  }
}

function updateCartPage() {
  const cartTableBody = document.querySelector('.cart-table tbody');
  const cartTotal = document.querySelector('.cart-total-value');
  
  if (cartTableBody && cartTotal) {
    if (cart.items.length === 0) {
      cartTableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center py-4">Ваша корзина пуста</td>
        </tr>
      `;
    } else {
      let html = '';
      
      cart.items.forEach(item => {
        html += `
          <tr>
            <td>
              <img src="${item.image}" alt="${item.title}" class="cart-item-image">
            </td>
            <td>${item.title}</td>
            <td>${item.price}</td>
            <td>
              <div class="cart-item-quantity">
                <button class="cart-item-quantity-decrease" data-item-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="cart-item-quantity-increase" data-item-id="${item.id}">+</button>
              </div>
            </td>
            <td>
              <button class="cart-item-remove" data-item-id="${item.id}">Удалить</button>
            </td>
          </tr>
        `;
      });
      
      cartTableBody.innerHTML = html;
    }
    
    cartTotal.textContent = formatPrice(cart.total);
  }
  
  // Update checkout summary
  const cartSummaryItemsContainer = document.querySelector('.cart-summary-items');
  const cartSummaryTotal = document.querySelector('.cart-summary-total-value');
  
  if (cartSummaryItemsContainer && cartSummaryTotal) {
    if (cart.items.length === 0) {
      cartSummaryItemsContainer.innerHTML = '<p>Нет товаров в корзине</p>';
    } else {
      let html = '';
      
      cart.items.forEach(item => {
        html += `
          <div class="cart-summary-item">
            <span>${item.title} x ${item.quantity}</span>
            <span>${item.price}</span>
          </div>
        `;
      });
      
      cartSummaryItemsContainer.innerHTML = html;
    }
    
    cartSummaryTotal.textContent = formatPrice(cart.total);
  }
}

// Utility Functions
function updatePrices(currency) {
  const priceElements = document.querySelectorAll('[data-price-byn][data-price-rub]');
  
  priceElements.forEach(element => {
    const bynPrice = element.dataset.priceByn;
    const rubPrice = element.dataset.priceRub;
    
    if (currency === 'BYN') {
      element.textContent = `${bynPrice} BYN`;
      if (element.dataset.productPrice) {
        element.dataset.productPrice = `${bynPrice} BYN`;
      }
    } else {
      element.textContent = `${rubPrice} RUB`;
      if (element.dataset.productPrice) {
        element.dataset.productPrice = `${rubPrice} RUB`;
      }
    }
  });
}

function formatPrice(price) {
  const currency = localStorage.getItem('currency') || 'BYN';
  return `${price.toFixed(2)} ${currency}`;
}

function showMessage(message, type = 'error') {
  const messageContainer = document.getElementById('message-container');
  
  if (messageContainer) {
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}-message`;
    messageElement.textContent = message;
    
    messageContainer.appendChild(messageElement);
    
    // Remove message after 3 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 3000);
  }
}

// About Us Scrolling
document.addEventListener('DOMContentLoaded', () => {
  const aboutLink = document.querySelector('a[href="#about"]');
  
  if (aboutLink) {
    aboutLink.addEventListener('click', (e) => {
      e.preventDefault();
      
      const aboutSection = document.getElementById('about');
      
      if (aboutSection) {
        // Close mobile nav if open
        mobileNav.classList.remove('open');
        overlay.classList.remove('open');
        
        // Smooth scroll to about section
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);