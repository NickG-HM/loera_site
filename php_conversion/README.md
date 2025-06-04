# LOERA Shop PHP Version

This is the PHP version of the LOERA Shop website, designed to work on standard shared hosting providers like REG.RU without requiring Node.js.

## Deployment Instructions

### Option 1: Manual File Upload

1. Upload all files and folders to your web hosting using FTP or the hosting control panel's file manager.
2. Make sure the `index.php` file is in the root directory of your hosting.
3. No database setup is required as the application uses memory storage with PHP arrays.

### Option 2: ZIP Archive Upload

1. Download the entire project as a ZIP file.
2. Upload the ZIP file to your hosting and extract it in the root directory.
3. Make sure all permissions are set correctly (folders to 755, files to 644).

## File Structure

```
/
├── index.php               # Main entry point
├── css/                    # Stylesheet files
│   ├── main.css            # Main stylesheet
│   └── tailwind.css        # Tailwind CSS utilities
├── js/                     # JavaScript files
│   └── main.js             # Main JavaScript file
├── assets/                 # Static assets
│   ├── Logo_LOERA_final.png # Logo image
│   ├── images/             # Product images
│   └── fonts/              # Font files
├── includes/               # PHP include files
│   ├── config.php          # Configuration
│   ├── data.php            # Product data
│   └── functions.php       # Helper functions
└── templates/              # Page templates
    ├── home.php            # Home page
    ├── products.php        # Products listing
    ├── product.php         # Product detail
    ├── cart.php            # Shopping cart
    ├── checkout.php        # Checkout page
    ├── contact.php         # Contact page
    └── partials/           # Partial templates
        ├── header.php      # Header partial
        ├── footer.php      # Footer partial
        └── navigation.php  # Navigation partial
```

## Configuration

If needed, you can modify the site configuration in `includes/config.php`:

- Update `WHATSAPP_NUMBER` with your actual WhatsApp number
- Update `INSTAGRAM_HANDLE` with your Instagram username
- Modify the site title and description
- Set default currency

## Adding or Updating Products

The product data is stored in `includes/data.php`. To add or update products:

1. Open the file in a text editor
2. Follow the existing format to add new products or modify existing ones
3. Make sure to upload any new product images to the `assets/images/` directory
4. Update the `images` array in the product data with the correct filenames

## Contact Information

For more information or assistance, please contact:
- WhatsApp: +375291234567
- Instagram: @loerastore