<?php
/**
 * Created by JetBrains PhpStorm.
 * User: pigrider
 * Date: 24.03.13
 * Time: 23:08
 * To change this template use File | Settings | File Templates.
 */

/*
Template Name: faq
*/

get_header(); ?>

<?php
$content_post = get_post('9');
echo $content_post->post_content;
?>

<div class="content">
    <?php
    $content_post = get_post('73');
    echo $content_post->post_content;
    ?>
</div>

<?php get_footer(); ?>
