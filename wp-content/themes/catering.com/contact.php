<?php
/**
 * Created by JetBrains PhpStorm.
 * User: pigrider
 * Date: 24.03.13
 * Time: 23:43
 * To change this template use File | Settings | File Templates.
 */

/*
Template Name: contact
*/

get_header(); ?>

<?php
$content_post = get_post('10');
echo $content_post->post_content;
?>

<?php get_sidebar('contact'); ?>

<div class="content-wrap">
    <h3>Contact Form</h3>
    <?php echo do_shortcode("[contact_form]"); ?>

</div>

</div><!--end-of-wrapper-->

<?php get_footer(); ?>
