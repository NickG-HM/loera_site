<nav class="nav container">
    <a href="index.php" class="logo-container">
        <img src="assets/Logo_LOERA_final.png" alt="LOERA Logo" class="logo">
    </a>
    
    <div class="nav-links">
        <a href="index.php">Главная</a>
        <a href="#about">О нас</a>
        <a href="index.php?page=category&id=bags">Сумки</a>
        <a href="index.php?page=category&id=cosmetic-bags">Косметички</a>
        <a href="index.php?page=contact">Контакты</a>
    </div>
    
    <div class="flex items-center">
        <!-- Currency Switcher -->
        <div class="currency-switcher mr-4">
            <a href="index.php?currency=BYN" class="currency-button <?php echo getCurrentCurrency() === 'BYN' ? 'active' : ''; ?>" data-currency="BYN">BYN</a>
            <a href="index.php?currency=RUB" class="currency-button <?php echo getCurrentCurrency() === 'RUB' ? 'active' : ''; ?>" data-currency="RUB">RUB</a>
        </div>
        
        <!-- Cart Icon -->
        <div id="cart-icon-container" class="cart-icon-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            
            <?php $cartItemCount = getCartItemCount(); ?>
            <?php if ($cartItemCount > 0) : ?>
                <span id="cart-count" class="cart-count"><?php echo $cartItemCount; ?></span>
            <?php else : ?>
                <span id="cart-count" class="cart-count" style="display: none;">0</span>
            <?php endif; ?>
        </div>
        
        <!-- Mobile Nav Toggle -->
        <button id="mobile-nav-toggle" class="mobile-nav-toggle ml-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        </button>
    </div>
</nav>

<!-- Mobile Navigation -->
<div id="mobile-nav" class="mobile-nav">
    <button id="mobile-nav-close" class="mobile-nav-close">&times;</button>
    <a href="index.php">Главная</a>
    <a href="#about">О нас</a>
    <a href="index.php?page=category&id=bags">Сумки</a>
    <a href="index.php?page=category&id=cosmetic-bags">Косметички</a>
    <a href="index.php?page=contact">Контакты</a>
    
    <div class="currency-switcher mt-4">
        <span>Валюта:</span>
        <a href="index.php?currency=BYN" class="currency-button <?php echo getCurrentCurrency() === 'BYN' ? 'active' : ''; ?>" data-currency="BYN">BYN</a>
        <a href="index.php?currency=RUB" class="currency-button <?php echo getCurrentCurrency() === 'RUB' ? 'active' : ''; ?>" data-currency="RUB">RUB</a>
    </div>
</div>