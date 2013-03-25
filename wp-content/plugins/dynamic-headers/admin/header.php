<?php
	$dhnd_image_dir = ABSPATH.'wp-content/header-images/';
	$dhnd_image_url_base = get_bloginfo('wpurl').'/wp-content/header-images/';

	$path = ABSPATH."wp-content/header-images/";
	
	if(is__writable($dhnd_image_dir) != true){
		echo '<div class="error"><p>';
			echo 'Похоже, что  <strong>wp-content/header-images/</strong> не доступно для записи или не существует.<br /><br /> Вам необходимо создать директорию и установить ей права на запись, чтобы плагин работал.<br /><br />Возможно, вам поможет<a href="http://codex.wordpress.org/Changing_File_Permissions" target="_blank">эта статья</a> из WordPress.';
		echo '</p></div><br />';
	}
?>