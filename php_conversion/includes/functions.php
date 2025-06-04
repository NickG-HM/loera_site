<?php
/**
 * Helper functions for LOERA Shop
 */

/**
 * Get the current page from URL parameters
 * 
 * @return string Current page name
 */
function getCurrentPage() {
    $page = $_GET['page'] ?? 'home';
    
    // Validate page name to prevent file inclusion vulnerabilities
    $allowed_pages = ['home', 'products', 'product', 'cart', 'checkout', 'contact', 'category'];
    
    if (!in_array($page, $allowed_pages)) {
        $page = 'home';
    }
    
    return $page;
}

/**
 * Get product by ID
 * 
 * @param int $id Product ID
 * @return array|null Product data or null if not found
 */
function getProductById($id) {
    global $products;
    
    foreach ($products as $product) {
        if ($product['id'] == $id) {
            return $product;
        }
    }
    
    return null;
}

/**
 * Get products by category
 * 
 * @param string $category Category name
 * @return array Array of products in the category
 */
function getProductsByCategory($category) {
    global $products;
    
    $categoryProducts = [];
    
    foreach ($products as $product) {
        if ($product['category'] === $category) {
            $categoryProducts[] = $product;
        }
    }
    
    return $categoryProducts;
}

/**
 * Format price according to the current currency
 * 
 * @param float $price Price value
 * @param string $currency Currency code (BYN or RUB)
 * @return string Formatted price with currency
 */
function formatPrice($price, $currency = DEFAULT_CURRENCY) {
    if ($currency === 'BYN') {
        return number_format($price, 2, '.', ' ') . ' BYN';
    } else {
        return number_format($price, 0, '.', ' ') . ' RUB';
    }
}

/**
 * Get the cart from session
 * 
 * @return array Cart items
 */
function getCart() {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    
    return $_SESSION['cart'];
}

/**
 * Add an item to the cart
 * 
 * @param int $productId Product ID
 * @param int $quantity Quantity to add
 * @return bool Success status
 */
function addToCart($productId, $quantity = 1) {
    $product = getProductById($productId);
    
    if (!$product) {
        return false;
    }
    
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    
    // Check if the product is already in the cart
    $found = false;
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['id'] == $productId) {
            $_SESSION['cart'][$key]['quantity'] += $quantity;
            $found = true;
            break;
        }
    }
    
    // If product not found in cart, add it
    if (!$found) {
        $_SESSION['cart'][] = [
            'id' => $product['id'],
            'title' => $product['title'],
            'price' => $product['price'],
            'price_rub' => $product['price_rub'],
            'image' => $product['images'][0],
            'quantity' => $quantity
        ];
    }
    
    return true;
}

/**
 * Update cart item quantity
 * 
 * @param int $productId Product ID
 * @param int $quantity New quantity (if 0, remove item)
 * @return bool Success status
 */
function updateCartItemQuantity($productId, $quantity) {
    if (!isset($_SESSION['cart'])) {
        return false;
    }
    
    if ($quantity <= 0) {
        return removeFromCart($productId);
    }
    
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['id'] == $productId) {
            $_SESSION['cart'][$key]['quantity'] = $quantity;
            return true;
        }
    }
    
    return false;
}

/**
 * Remove item from cart
 * 
 * @param int $productId Product ID to remove
 * @return bool Success status
 */
function removeFromCart($productId) {
    if (!isset($_SESSION['cart'])) {
        return false;
    }
    
    foreach ($_SESSION['cart'] as $key => $item) {
        if ($item['id'] == $productId) {
            unset($_SESSION['cart'][$key]);
            // Re-index the array
            $_SESSION['cart'] = array_values($_SESSION['cart']);
            return true;
        }
    }
    
    return false;
}

/**
 * Clear the entire cart
 * 
 * @return void
 */
function clearCart() {
    $_SESSION['cart'] = [];
}

/**
 * Calculate cart total
 * 
 * @param string $currency Currency code (BYN or RUB)
 * @return float Cart total price
 */
function calculateCartTotal($currency = DEFAULT_CURRENCY) {
    $total = 0;
    
    if (!isset($_SESSION['cart'])) {
        return $total;
    }
    
    foreach ($_SESSION['cart'] as $item) {
        if ($currency === 'BYN') {
            $total += $item['price'] * $item['quantity'];
        } else {
            $total += $item['price_rub'] * $item['quantity'];
        }
    }
    
    return $total;
}

/**
 * Get the count of items in the cart
 * 
 * @return int Number of items in cart
 */
function getCartItemCount() {
    $count = 0;
    
    if (!isset($_SESSION['cart'])) {
        return $count;
    }
    
    foreach ($_SESSION['cart'] as $item) {
        $count += $item['quantity'];
    }
    
    return $count;
}

/**
 * Get current currency from session or default
 * 
 * @return string Currency code (BYN or RUB)
 */
function getCurrentCurrency() {
    if (isset($_SESSION['currency']) && in_array($_SESSION['currency'], ['BYN', 'RUB'])) {
        return $_SESSION['currency'];
    }
    
    return DEFAULT_CURRENCY;
}

/**
 * Set current currency
 * 
 * @param string $currency Currency code (BYN or RUB)
 * @return void
 */
function setCurrentCurrency($currency) {
    if (in_array($currency, ['BYN', 'RUB'])) {
        $_SESSION['currency'] = $currency;
    }
}

/**
 * Sanitize input to prevent XSS
 * 
 * @param string $input Input string to sanitize
 * @return string Sanitized string
 */
function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

/**
 * Generate WhatsApp checkout URL with order details
 * 
 * @param array $orderData Order data (name, email, phone, address, notes)
 * @return string WhatsApp URL with order details
 */
function generateWhatsAppCheckoutUrl($orderData) {
    $cart = getCart();
    $currency = getCurrentCurrency();
    $total = calculateCartTotal($currency);
    
    // Start building the message
    $message = "Новый заказ от {$orderData['name']}:\n\n";
    
    // Add cart items
    foreach ($cart as $item) {
        $price = ($currency === 'BYN') ? $item['price'] : $item['price_rub'];
        $currency_symbol = ($currency === 'BYN') ? 'BYN' : 'RUB';
        $message .= "{$item['title']} x {$item['quantity']} - {$price} {$currency_symbol}\n";
    }
    
    // Add total and customer details
    $message .= "\nИтого: " . formatPrice($total, $currency) . "\n\n";
    $message .= "Имя: {$orderData['name']}\n";
    $message .= "Email: {$orderData['email']}\n";
    $message .= "Телефон: {$orderData['phone']}\n";
    $message .= "Адрес: {$orderData['address']}\n";
    
    if (!empty($orderData['notes'])) {
        $message .= "Примечания: {$orderData['notes']}\n";
    }
    
    // Encode the message for URL
    $encoded_message = urlencode($message);
    
    // Return WhatsApp URL
    return "https://wa.me/" . preg_replace('/[^0-9]/', '', WHATSAPP_NUMBER) . "?text={$encoded_message}";
}

/**
 * Get price in current currency
 * 
 * @param array $product Product data
 * @param string $currency Currency code (BYN or RUB)
 * @return float Price in requested currency
 */
function getProductPrice($product, $currency = null) {
    if ($currency === null) {
        $currency = getCurrentCurrency();
    }
    
    if ($currency === 'RUB') {
        return $product['price_rub'];
    }
    
    return $product['price'];
}

/**
 * Format description with proper line breaks
 * 
 * @param string $description Product description
 * @return string Formatted description
 */
function formatDescription($description) {
    // Preserve line breaks when displaying
    return nl2br($description);
}