<?php include 'templates/partials/header.php'; ?>

<div class="container section">
    <a href="javascript:history.back()" class="back-button">&lt; вернуться</a>
    
    <div class="product-detail">
        <div class="product-gallery">
            <div class="product-main-image">
                <img src="<?php echo PRODUCT_IMAGE_PATH . $product['images'][0]; ?>" alt="<?php echo $product['title']; ?>" id="main-product-image">
            </div>
            
            <?php if (count($product['images']) > 1) : ?>
                <div class="product-thumbnails">
                    <?php foreach ($product['images'] as $index => $image) : ?>
                        <div class="product-thumbnail <?php echo $index === 0 ? 'active' : ''; ?>" data-index="<?php echo $index; ?>">
                            <img src="<?php echo PRODUCT_IMAGE_PATH . $image; ?>" alt="<?php echo $product['title']; ?> - миниатюра <?php echo $index + 1; ?>">
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
        
        <div class="product-info">
            <h1 class="product-info-title"><?php echo $product['title']; ?></h1>
            
            <div class="product-info-price">
                <span data-price-byn="<?php echo $product['price']; ?>" 
                      data-price-rub="<?php echo $product['price_rub']; ?>">
                    <?php echo formatPrice(getProductPrice($product)); ?>
                </span>
            </div>
            
            <div class="currency-switcher">
                <span>Валюта:</span>
                <button class="currency-button <?php echo getCurrentCurrency() === 'BYN' ? 'active' : ''; ?>" data-currency="BYN">BYN</button>
                <button class="currency-button <?php echo getCurrentCurrency() === 'RUB' ? 'active' : ''; ?>" data-currency="RUB">RUB</button>
            </div>
            
            <div class="product-info-description">
                <?php echo formatDescription($product['description']); ?>
            </div>
            
            <form id="add-to-cart-form" method="post" 
                  data-product-id="<?php echo $product['id']; ?>"
                  data-product-title="<?php echo $product['title']; ?>"
                  data-product-price="<?php echo formatPrice(getProductPrice($product)); ?>"
                  data-product-image="<?php echo $product['images'][0]; ?>">
                <input type="hidden" name="action" value="add_to_cart">
                <input type="hidden" name="product_id" value="<?php echo $product['id']; ?>">
                
                <div class="quantity-selector">
                    <span>Количество:</span>
                    <button type="button" id="quantity-decrease">-</button>
                    <input type="number" id="quantity-input" name="quantity" value="1" min="1" max="99">
                    <button type="button" id="quantity-increase">+</button>
                </div>
                
                <button type="submit" class="add-to-cart-button">Добавить в корзину</button>
            </form>
        </div>
    </div>
    
    <div class="section">
        <h2 class="section-heading">Похожие товары</h2>
        
        <div class="product-grid">
            <?php
            // Get products from the same category
            $related_products = [];
            $count = 0;
            
            foreach ($products as $related_product) {
                if ($related_product['id'] != $product['id'] && $related_product['category'] == $product['category']) {
                    $related_products[] = $related_product;
                    $count++;
                    
                    if ($count >= 4) {
                        break;
                    }
                }
            }
            
            // If not enough products from the same category, add some from other categories
            if ($count < 4) {
                foreach ($products as $related_product) {
                    if ($related_product['id'] != $product['id'] && $related_product['category'] != $product['category']) {
                        $related_products[] = $related_product;
                        $count++;
                        
                        if ($count >= 4) {
                            break;
                        }
                    }
                }
            }
            
            // Display related products
            foreach ($related_products as $related_product) :
                $main_image = PRODUCT_IMAGE_PATH . $related_product['images'][0];
                $currency = getCurrentCurrency();
                $price = ($currency === 'BYN') ? $related_product['price'] : $related_product['price_rub'];
            ?>
                <a href="index.php?page=product&id=<?php echo $related_product['id']; ?>" class="product-card">
                    <div class="product-card-image-container">
                        <img src="<?php echo $main_image; ?>" alt="<?php echo $related_product['title']; ?>" class="product-card-image">
                    </div>
                    <div class="product-card-content">
                        <h3 class="product-card-title"><?php echo $related_product['title']; ?></h3>
                        <p class="product-card-price"
                           data-price-byn="<?php echo $related_product['price']; ?>"
                           data-price-rub="<?php echo $related_product['price_rub']; ?>">
                            <?php echo formatPrice($price, $currency); ?>
                        </p>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</div>

<?php include 'templates/partials/footer.php'; ?>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Product thumbnails functionality
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            const thumbnailImg = this.querySelector('img');
            mainImage.src = thumbnailImg.src;
        });
    });
});
</script>