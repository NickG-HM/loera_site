<?php include 'templates/partials/header.php'; ?>

<div class="container section">
    <h1 class="checkout-heading">Оформление заказа</h1>
    
    <?php if (empty(getCart())) : ?>
        <div class="text-center py-4">
            <p>Ваша корзина пуста. Добавьте товары для оформления заказа.</p>
            <div class="mt-4">
                <a href="index.php?page=products" class="checkout-button">Перейти к товарам</a>
            </div>
        </div>
    <?php else : ?>
        <div class="checkout-form">
            <form id="checkout-form">
                <div class="form-group">
                    <label for="name" class="form-label">Имя *</label>
                    <input type="text" id="name" name="name" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label for="email" class="form-label">Email *</label>
                    <input type="email" id="email" name="email" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label for="phone" class="form-label">Телефон *</label>
                    <input type="tel" id="phone" name="phone" class="form-input" required>
                </div>
                
                <div class="form-group">
                    <label for="address" class="form-label">Адрес доставки *</label>
                    <textarea id="address" name="address" class="form-textarea" required></textarea>
                </div>
                
                <div class="form-group">
                    <label for="notes" class="form-label">Примечания</label>
                    <textarea id="notes" name="notes" class="form-textarea"></textarea>
                </div>
                
                <div class="cart-summary">
                    <h3 class="cart-summary-heading">Ваш заказ</h3>
                    
                    <div class="cart-summary-items">
                        <?php foreach (getCart() as $item) : ?>
                            <div class="cart-summary-item">
                                <span><?php echo $item['title']; ?> x <?php echo $item['quantity']; ?></span>
                                <span>
                                    <?php
                                    $currency = getCurrentCurrency();
                                    $price = ($currency === 'BYN') ? $item['price'] : $item['price_rub'];
                                    echo formatPrice($price * $item['quantity'], $currency);
                                    ?>
                                </span>
                            </div>
                        <?php endforeach; ?>
                    </div>
                    
                    <div class="cart-summary-total">
                        <span>Итого:</span>
                        <span class="cart-summary-total-value"><?php echo formatPrice(calculateCartTotal()); ?></span>
                    </div>
                </div>
                
                <button type="submit" class="whatsapp-checkout-button">
                    <span class="whatsapp-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                    </span>
                    Отправить заказ в WhatsApp
                </button>
            </form>
        </div>
    <?php endif; ?>
</div>

<?php include 'templates/partials/footer.php'; ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const address = document.getElementById('address').value;
            const notes = document.getElementById('notes').value;
            
            // Format cart items for WhatsApp
            let cartMessage = `Новый заказ от ${name}:\n\n`;
            
            <?php
            $cart = getCart();
            $currency = getCurrentCurrency();
            
            echo "let cartItems = [";
            foreach ($cart as $item) {
                $price = ($currency === 'BYN') ? $item['price'] : $item['price_rub'];
                $currency_symbol = ($currency === 'BYN') ? 'BYN' : 'RUB';
                echo "{
                    title: '" . addslashes($item['title']) . "',
                    quantity: " . $item['quantity'] . ",
                    price: '" . $price . " " . $currency_symbol . "'
                },";
            }
            echo "];";
            
            echo "let totalPrice = '" . formatPrice(calculateCartTotal()) . "';";
            ?>
            
            cartItems.forEach(item => {
                cartMessage += `${item.title} x ${item.quantity} - ${item.price}\n`;
            });
            
            cartMessage += `\nИтого: ${totalPrice}\n\n`;
            cartMessage += `Имя: ${name}\n`;
            cartMessage += `Email: ${email}\n`;
            cartMessage += `Телефон: ${phone}\n`;
            cartMessage += `Адрес: ${address}\n`;
            
            if (notes) {
                cartMessage += `Примечания: ${notes}\n`;
            }
            
            // Encode message for WhatsApp
            const encodedMessage = encodeURIComponent(cartMessage);
            
            // WhatsApp phone number
            const whatsappPhone = '<?php echo preg_replace('/[^0-9]/', '', WHATSAPP_NUMBER); ?>';
            
            // Open WhatsApp with prefilled message
            window.open(`https://wa.me/${whatsappPhone}?text=${encodedMessage}`, '_blank');
            
            // Clear cart after successful checkout (optional)
            // window.location.href = 'index.php?action=clear_cart';
        });
    }
});
</script>