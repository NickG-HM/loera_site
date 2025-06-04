<?php 
$title = 'Page Not Found';
page_header($title);
?>

<section class="py-10">
    <div class="text-center">
        <h1 class="text-4xl font-bold mb-4 ravenholm">404</h1>
        <h2 class="text-2xl font-semibold mb-6">Page Not Found</h2>
        <p class="mb-8">The page you are looking for does not exist or has been moved.</p>
        <a href="<?php echo BASE_URL; ?>/" class="btn btn-primary">Go to Homepage</a>
    </div>
</section>

<?php page_footer(); ?>