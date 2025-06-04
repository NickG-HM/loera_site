<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $page_title; ?></title>
    <meta name="description" content="<?php echo SITE_DESCRIPTION; ?>">
    <meta name="author" content="<?php echo SITE_AUTHOR; ?>">
    <link rel="stylesheet" href="css/main.css">
    <link rel="icon" href="assets/Logo_LOERA_final.png" type="image/png">
</head>
<body>
    <!-- Overlay for mobile nav and cart drawer -->
    <div id="overlay" class="overlay"></div>
    
    <!-- Header -->
    <header class="header">
        <?php include 'templates/partials/navigation.php'; ?>
    </header>
    
    <!-- Cart Drawer -->
    <div id="cart-drawer" class="cart-drawer">
        <div class="cart-drawer-header">
            <h2>Корзина</h2>
            <button id="cart-drawer-close" class="cart-drawer-close">&times;</button>
        </div>
        <div class="cart-drawer-content">
            <?php if (empty(getCart())) : ?>
                <p class="text-center py-4">Ваша корзина пуста</p>
            <?php else : ?>
                <?php foreach (getCart() as $item) : ?>
                    <div class="cart-item">
                        <img src="<?php echo PRODUCT_IMAGE_PATH . $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="cart-item-image">
                        <div class="cart-item-info">
                            <h3 class="cart-item-title"><?php echo $item['title']; ?></h3>
                            <p class="cart-item-price">
                                <?php echo formatPrice(getProductPrice(['price' => $item['price'], 'price_rub' => $item['price_rub']])); ?>
                            </p>
                            <div class="cart-item-quantity">
                                <form method="post" style="display: inline;">
                                    <input type="hidden" name="action" value="update_cart">
                                    <input type="hidden" name="product_id" value="<?php echo $item['id']; ?>">
                                    <input type="hidden" name="quantity" value="<?php echo $item['quantity'] - 1; ?>">
                                    <button type="submit" class="cart-item-quantity-decrease">-</button>
                                </form>
                                <span><?php echo $item['quantity']; ?></span>
                                <form method="post" style="display: inline;">
                                    <input type="hidden" name="action" value="update_cart">
                                    <input type="hidden" name="product_id" value="<?php echo $item['id']; ?>">
                                    <input type="hidden" name="quantity" value="<?php echo $item['quantity'] + 1; ?>">
                                    <button type="submit" class="cart-item-quantity-increase">+</button>
                                </form>
                            </div>
                            <form method="post">
                                <input type="hidden" name="action" value="remove_from_cart">
                                <input type="hidden" name="product_id" value="<?php echo $item['id']; ?>">
                                <button type="submit" class="cart-item-remove">Удалить</button>
                            </form>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
        <div class="cart-drawer-footer">
            <div class="cart-drawer-total">
                <span>Итого:</span>
                <span class="cart-drawer-total-value"><?php echo formatPrice(calculateCartTotal()); ?></span>
            </div>
            <?php if (!empty(getCart())) : ?>
                <a href="index.php?page=cart" class="checkout-button">Перейти к корзине</a>
            <?php endif; ?>
        </div>
    </div>
    
    <!-- Message Container -->
    <div id="message-container" class="message-container"></div>
    
    <!-- Main Content -->
    <main>