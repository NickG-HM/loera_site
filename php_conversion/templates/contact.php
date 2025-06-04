<?php include 'templates/partials/header.php'; ?>

<div class="container section">
    <div class="contact-container">
        <h1 class="contact-heading">Контакты</h1>
        
        <div class="contact-info">
            <div class="contact-method">
                <p class="contact-method-title">Связаться с нами</p>
                <p>Для заказов, вопросов или предложений о сотрудничестве, пожалуйста, используйте любой удобный для вас способ связи:</p>
            </div>
            
            <div class="contact-method">
                <p class="contact-method-title">Телефон</p>
                <p><?php echo WHATSAPP_NUMBER; ?></p>
            </div>
            
            <div class="contact-method">
                <p class="contact-method-title">Instagram</p>
                <p>@<?php echo INSTAGRAM_HANDLE; ?></p>
            </div>
            
            <div class="contact-method">
                <p class="contact-method-title">Часы работы</p>
                <p>Понедельник - Пятница: 10:00 - 19:00</p>
                <p>Суббота: 11:00 - 17:00</p>
                <p>Воскресенье: Выходной</p>
            </div>
        </div>
        
        <div class="social-buttons">
            <a href="https://wa.me/<?php echo preg_replace('/[^0-9]/', '', WHATSAPP_NUMBER); ?>" class="social-button whatsapp-button" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                WhatsApp
            </a>
            <a href="https://instagram.com/<?php echo INSTAGRAM_HANDLE; ?>" class="social-button instagram-button" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                Instagram
            </a>
        </div>
    </div>
</div>

<?php include 'templates/partials/footer.php'; ?>