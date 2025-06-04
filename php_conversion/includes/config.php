<?php
/**
 * Configuration file for the LOERA Shop
 * Contains global settings and constants
 */

// Site Configuration
define('SITE_TITLE', 'LOERA - Handcrafted Bags');
define('SITE_DESCRIPTION', 'Unique, handcrafted bags and accessories');
define('SITE_AUTHOR', 'LOERA');
define('BASE_URL', ''); // Leave empty for relative paths, or set to absolute URL if needed

// Default Currency
define('DEFAULT_CURRENCY', 'BYN');

// Contact Information
define('WHATSAPP_NUMBER', '+375291234567'); // Replace with actual WhatsApp number
define('INSTAGRAM_HANDLE', 'loerastore'); // Replace with actual Instagram handle

// Image Settings
define('PRODUCT_IMAGE_PATH', 'assets/images/');

// Error Reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Time Zone
date_default_timezone_set('Europe/Minsk');

// Session Settings
session_start();