<?php include 'templates/partials/header.php'; ?>

<div class="container section">
    <h1 class="section-heading"><?php echo $category_name; ?></h1>
    
    <div class="product-grid">
        <?php
        $category_products = getProductsByCategory($category_id);
        if (empty($category_products)) : 
        ?>
            <p class="text-center py-4">В этой категории пока нет товаров.</p>
        <?php else : ?>
            <?php
            foreach ($category_products as $product) :
                $main_image = PRODUCT_IMAGE_PATH . $product['images'][0];
                $currency = getCurrentCurrency();
                $price = ($currency === 'BYN') ? $product['price'] : $product['price_rub'];
            ?>
                <a href="index.php?page=product&id=<?php echo $product['id']; ?>" class="product-card">
                    <div class="product-card-image-container">
                        <img src="<?php echo $main_image; ?>" alt="<?php echo $product['title']; ?>" class="product-card-image">
                    </div>
                    <div class="product-card-content">
                        <h3 class="product-card-title"><?php echo $product['title']; ?></h3>
                        <p class="product-card-price"
                           data-price-byn="<?php echo $product['price']; ?>"
                           data-price-rub="<?php echo $product['price_rub']; ?>">
                            <?php echo formatPrice($price, $currency); ?>
                        </p>
                    </div>
                </a>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
    
    <div class="text-center mt-6">
        <a href="index.php?page=products" class="checkout-button">Смотреть все товары</a>
    </div>
</div>

<?php include 'templates/partials/footer.php'; ?>