<?php
/**
 * Main entry point for LOERA Shop
 */

// Include configuration
require_once 'includes/config.php';

// Include data
require_once 'includes/data.php';

// Include functions
require_once 'includes/functions.php';

// Handle currency switching
if (isset($_GET['currency']) && in_array($_GET['currency'], ['BYN', 'RUB'])) {
    setCurrentCurrency($_GET['currency']);
    
    // Redirect to the same page without the currency parameter to prevent resubmission
    $redirect_url = strtok($_SERVER['REQUEST_URI'], '?');
    $query_params = $_GET;
    unset($query_params['currency']);
    
    if (!empty($query_params)) {
        $redirect_url .= '?' . http_build_query($query_params);
    }
    
    header("Location: $redirect_url");
    exit;
}

// Handle cart actions
if (isset($_POST['action'])) {
    $action = $_POST['action'];
    
    switch ($action) {
        case 'add_to_cart':
            if (isset($_POST['product_id']) && isset($_POST['quantity'])) {
                $product_id = (int) $_POST['product_id'];
                $quantity = (int) $_POST['quantity'];
                
                if ($quantity > 0) {
                    addToCart($product_id, $quantity);
                    
                    // Redirect to prevent form resubmission
                    header('Location: ' . $_SERVER['HTTP_REFERER']);
                    exit;
                }
            }
            break;
            
        case 'update_cart':
            if (isset($_POST['product_id']) && isset($_POST['quantity'])) {
                $product_id = (int) $_POST['product_id'];
                $quantity = (int) $_POST['quantity'];
                
                updateCartItemQuantity($product_id, $quantity);
                
                // Redirect to prevent form resubmission
                header('Location: ' . $_SERVER['HTTP_REFERER']);
                exit;
            }
            break;
            
        case 'remove_from_cart':
            if (isset($_POST['product_id'])) {
                $product_id = (int) $_POST['product_id'];
                
                removeFromCart($product_id);
                
                // Redirect to prevent form resubmission
                header('Location: ' . $_SERVER['HTTP_REFERER']);
                exit;
            }
            break;
            
        case 'clear_cart':
            clearCart();
            
            // Redirect to prevent form resubmission
            header('Location: ' . $_SERVER['HTTP_REFERER']);
            exit;
            break;
    }
}

// Get the current page
$current_page = getCurrentPage();
$page_title = SITE_TITLE;

// Include the appropriate template based on the current page
switch ($current_page) {
    case 'home':
        include 'templates/home.php';
        break;
        
    case 'products':
        $page_title = 'Все товары - ' . SITE_TITLE;
        include 'templates/products.php';
        break;
        
    case 'category':
        if (isset($_GET['id']) && array_key_exists($_GET['id'], $categories)) {
            $category_id = $_GET['id'];
            $category_name = $categories[$category_id];
            $page_title = $category_name . ' - ' . SITE_TITLE;
            include 'templates/category.php';
        } else {
            // Redirect to products page if category doesn't exist
            header('Location: index.php?page=products');
            exit;
        }
        break;
        
    case 'product':
        if (isset($_GET['id'])) {
            $product_id = (int) $_GET['id'];
            $product = getProductById($product_id);
            
            if ($product) {
                $page_title = $product['title'] . ' - ' . SITE_TITLE;
                include 'templates/product.php';
            } else {
                // Redirect to products page if product doesn't exist
                header('Location: index.php?page=products');
                exit;
            }
        } else {
            // Redirect to products page if no product ID provided
            header('Location: index.php?page=products');
            exit;
        }
        break;
        
    case 'cart':
        $page_title = 'Корзина - ' . SITE_TITLE;
        include 'templates/cart.php';
        break;
        
    case 'checkout':
        $page_title = 'Оформление заказа - ' . SITE_TITLE;
        include 'templates/checkout.php';
        break;
        
    case 'contact':
        $page_title = 'Контакты - ' . SITE_TITLE;
        include 'templates/contact.php';
        break;
        
    default:
        include 'templates/home.php';
        break;
}