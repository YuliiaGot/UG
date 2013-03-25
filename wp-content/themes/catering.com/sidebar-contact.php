<?php
/**
 * The Sidebar containing the main widget area.
 *
 * @package Catering.com
 * @subpackage Catering.com
 * @since Catering.com
 */

$options = twentyeleven_get_theme_options();
$current_layout = $options['theme_layout'];

if ( 'content' != $current_layout ) :
?>
    <div class="wrapper">
		<div class="sidebar-contact" role="complementary">
			<?php if ( ! dynamic_sidebar( 'sidebar-contact' ) ) : ?>
                <h3>Our Contacts</h3>
                <?php echo do_shortcode("[mapsmarker marker=2]"); ?>

                <?php
                $content_post = get_post('74');
                echo $content_post->post_content;
                ?>

			<?php endif; // end sidebar widget area ?>
		</div><!-- #secondary .widget-area -->
<?php endif; ?>
