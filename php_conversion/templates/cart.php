<?php include 'templates/partials/header.php'; ?>

<div class="container section">
    <h1 class="section-heading">Корзина</h1>
    
    <?php if (empty(getCart())) : ?>
        <div class="text-center py-4">
            <p>Ваша корзина пуста</p>
            <div class="mt-4">
                <a href="index.php?page=products" class="checkout-button">Продолжить покупки</a>
            </div>
        </div>
    <?php else : ?>
        <div class="overflow-x-auto">
            <table class="cart-table">
                <thead>
                    <tr>
                        <th>Товар</th>
                        <th>Название</th>
                        <th>Цена</th>
                        <th>Количество</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach (getCart() as $item) : ?>
                        <tr>
                            <td>
                                <img src="<?php echo PRODUCT_IMAGE_PATH . $item['image']; ?>" alt="<?php echo $item['title']; ?>" class="cart-item-image">
                            </td>
                            <td><?php echo $item['title']; ?></td>
                            <td>
                                <?php
                                $currency = getCurrentCurrency();
                                $price = ($currency === 'BYN') ? $item['price'] : $item['price_rub'];
                                echo formatPrice($price, $currency);
                                ?>
                            </td>
                            <td>
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
                            </td>
                            <td>
                                <form method="post">
                                    <input type="hidden" name="action" value="remove_from_cart">
                                    <input type="hidden" name="product_id" value="<?php echo $item['id']; ?>">
                                    <button type="submit" class="cart-item-remove">Удалить</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <div class="cart-footer">
            <form method="post">
                <input type="hidden" name="action" value="clear_cart">
                <button type="submit" class="cart-item-remove">Очистить корзину</button>
            </form>
            
            <div>
                <div class="cart-total">
                    <span>Итого: </span>
                    <span class="cart-total-value"><?php echo formatPrice(calculateCartTotal()); ?></span>
                </div>
                <div class="mt-4">
                    <a href="index.php?page=checkout" class="checkout-button">Оформить заказ</a>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>

<?php include 'templates/partials/footer.php'; ?>