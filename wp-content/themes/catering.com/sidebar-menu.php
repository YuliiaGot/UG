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
		<div class="sidebar-menu" role="complementary">
			<?php if ( ! dynamic_sidebar( 'sidebar-menu' ) ) : ?>
                <?php
                $content_post = get_post('54');
                echo $content_post->post_content;
                ?>
			<?php endif; // end sidebar widget area ?>
		</div><!-- #secondary .widget-area -->
<?php endif; ?>
