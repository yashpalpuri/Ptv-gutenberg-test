<?php
/**
 * Plugin Name: Advertising Settings
 * Plugin URI: https://github.com/yashpalpuri/
 * Description: Gutenberg siderbar for advertising settings
 * Version: 1.0.0
 * Author: YashpalPuri
 * Author URI: https://github.com/yashpalpuri/
 */

namespace AdvertisingSettings;

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Main AdvertisingSettings Class.
 *
 * @since  1.0
 */
class AdvertisingSettings {

    /**
     * AdvertisingSettings instance.
     *
     * @var array $instance
     */
    private static $instance;

    /**
     * Plugins name.
     *
     * @var array $pluginname
     */
    private static $pluginslug = 'advertisingsettings';

    /**
     * WordPress post meta fields.
     *
     * @var array $metafields
     */
    private $metafields = array(
        'toggle' => 'advertisements_toggle',
        'type' => 'commercial_content_type',
        'name' => 'advertiser_name'
    );

    /**
     * __construct.
     *
     * Initialize properties.
     *
     * @since 1.0.0
     */
    public function __construct() { }


    /**
     * instance.
     *
     * Initialize the plugin.
     *
     * @since 1.0.0
     */
    public static function instance() {

        if ( ! isset( self::$instance ) && ! ( self::$instance instanceof AdvertisingSettings ) ) {
            self::$instance = new Self();
        }
        return self::$instance;
    }

    /**
     * register.
     *
     * Register hooks with WordPress.
     * 
     * @uses add_action() https://developer.wordpress.org/reference/functions/add_action/
     *
     * @access public
     * @return void
     */
    public function register() : void {

        \add_action(
            'enqueue_block_editor_assets',
            array( $this , 'enqueue_styles' ),
            999
        );

        \add_action(
            'enqueue_block_editor_assets',
            array( $this , 'enqueue_scripts'),
            999
        );

        \add_action(
            'init',
            array( $this , 'register_meta_fields' ),
            1
        );
    }

    /**
     * enqueue_styles.
     * 
     * Enqueue editor sidebar stylesheets.
     * 
     * @uses wp_enqueue_style() https://developer.wordpress.org/reference/functions/wp_enqueue_style/
     * 
     * @access public
     * @return void
     */
    public function enqueue_styles() : void {

        \wp_enqueue_style(
            $this->pluginslug . '-styles',
            plugin_dir_url( __FILE__ ) . 'dist/css/main.css',
            array(),
            '1.0.0',
            'all'
        );
    }

    /**
     * enqueue_scripts.
     * 
     * Enqueue editor sidebar scripts.
     * 
     * @uses wp_enqueue_script() https://developer.wordpress.org/reference/functions/wp_enqueue_script/
     * 
     * @access public
     * @return void
     */
    public function enqueue_scripts() : void {

        \wp_enqueue_script(
            $this->pluginslug . '-scripts',
            plugin_dir_url( __FILE__ ) . 'dist/js/main.js',
            $this->dependencies,
            '1.0.0',
            'all'
        );
    }

    /**
     * register_meta_fields.
     * 
     * Register meta fields with WordPress.
     * 
     * @uses register_meta() https://developer.wordpress.org/reference/functions/register_meta/
     * 
     * @access public
     * @return void
     */
    public function register_meta_fields() : void {

        $args = array(
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
        );

        foreach( $this->metafields as $key => $value ) {
            \register_meta( 'post' , $value , $args );
        }
    }
}


function runAdvertisingSettingse() {
    AdvertisingSettings::instance()->register();
}

runAdvertisingSettingse();
?>