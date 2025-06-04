<?php include 'templates/partials/header.php'; ?>

<div class="container section">
    <h1 class="section-heading">Все товары</h1>
    
    <div class="product-grid">
        <?php
        foreach ($products as $product) :
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
    </div>
</div>

<?php include 'templates/partials/footer.php'; ?>