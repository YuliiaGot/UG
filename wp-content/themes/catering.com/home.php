<?php
/**
 * Created by JetBrains PhpStorm.
 * User: pigrider
 * Date: 24.03.13
 * Time: 23:08
 * To change this template use File | Settings | File Templates.
 */
/*
Template Name: home
*/

get_header(); ?>

<?php
$content_post = get_post('8');
echo $content_post->post_content;
?>
<div class="content">

    <?php echo do_shortcode("[metaslider id=39]"); ?>

    <?php
    $content_post = get_post('45');
    echo $content_post->post_content;
    ?>

    <?php
    $content_post = get_post('50');
    echo $content_post->post_content;
    ?>

    <?php
    $content_post = get_post('52');
    echo $content_post->post_content;
    ?>

</div>


<?php get_footer(); ?>
