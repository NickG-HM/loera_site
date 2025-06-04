<?php include 'templates/partials/header.php'; ?>

<div class="container section">
    <!-- Banner -->
    <div class="mb-6">
        <img src="assets/main_page.png" alt="LOERA Banner" style="width: 100%; height: auto;">
    </div>
    
    <!-- Featured Products -->
    <div class="section">
        <h2 class="section-heading">Популярные товары</h2>
        
        <div class="product-grid">
            <?php
            // Display only featured products (first 4)
            $featured_products = array_slice($products, 0, 4);
            foreach ($featured_products as $product) :
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
        
        <div class="text-center mt-6">
            <a href="index.php?page=products" class="checkout-button">Смотреть все товары</a>
        </div>
    </div>
    
    <!-- About Section -->
    <div id="about" class="about-section">
        <div class="about-container">
            <h2 class="about-heading">О нас</h2>
            <div class="about-text">
                <p>LOERA — это бренд уникальных, вручную изготовленных сумок и аксессуаров, созданных с любовью и вниманием к деталям.</p>
                <p>Наша миссия — предлагать стильные и качественные изделия, которые подчеркнут индивидуальность владельца и принесут радость от использования.</p>
                <p>Каждое изделие LOERA проходит тщательный контроль качества, чтобы радовать вас долгие годы.</p>
            </div>
        </div>
    </div>
</div>

<?php include 'templates/partials/footer.php'; ?>