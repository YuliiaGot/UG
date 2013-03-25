<?php
/**
 * Created by JetBrains PhpStorm.
 * User: pigrider
 * Date: 24.03.13
 * Time: 23:08
 * To change this template use File | Settings | File Templates.
 */
/*
Template Name: menu
*/

get_header(); ?>

<?php
$content_post = get_post('6');
echo $content_post->post_content;
?>

<div class="main-wrap">

    <?php get_sidebar('menu'); ?>

    <div class="content-menu">

        <?php
        $content_post = get_post('56');
        echo $content_post->post_content;
        ?>

        <?php
        $content_post = get_post('60');
        echo $content_post->post_content;
        ?>
        <?php
        $content_post = get_post('71');
        echo $content_post->post_content;
        ?>

    </div><!--end-of-content-menu-->

</div>

<?php get_footer(); ?>
