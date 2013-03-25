<div class="wrap">
<h2>Dynamic Headers - Свойства</h2>

<?php
	include("header.php");
	if($_GET['updated'] == 'true'){
		echo '<div style="background-color: rgb(255, 251, 204);" id="message" class="updated fade"><p>Settings Updates</p></div>';
	}
?>

<form method="post" action="options.php">
<?php wp_nonce_field('update-options'); ?>

<table class="form-table">

<tr valign="top">
<th scope="row">Связь с нами в вашем "подвале" (footer.php)</th>
<td><input type="checkbox" name="dhnd_footer_link" value="Yes" <?php  if(get_option('dhnd_footer_link') == 'Yes') echo 'Checked' ?> />
	<span class="setting-description">Выберите этот "флажок" для добавления ссылки на нас в вашем "подвале" (footer.php).<br />Это не обязательная опция, но мы поддерживаем плагин бесплатно и ценим любую связь с вами.<br /></span></td>
</tr>

<th scope="row">Максимальный размер файла</th>
<td><input type="text" name="dhnd_max_size" value="<?php echo get_option('dhnd_max_size'); ?>" />
	<span class="setting-description">Размер файла в Кб<br />Максимальный размер файла, который вы можете загрузить с помощью нашей панели загрузки, ограничен 200-500 k и является наиболее безопасным размером.</span></td>
</tr>

<tr valign="top">
<th scope="row">Медиа-файл по умолчанию</th>
<td>	<select name="dhnd_default" id="dhnd_default">
			<option value="None" <?php if(get_option('dhnd_default') == 'None') echo 'selected'  ?>>- Нет файла по умолчанию -</option>
			<option value="Random" <?php if(get_option('dhnd_default') == 'Random') echo 'selected'  ?>>- Использовать любой случайный -</option>
			<?php
			//Print out the media file list
			if($media_dir = opendir($dhnd_image_dir)){
				while ($m_file = readdir($media_dir)) {
					if($m_file != "." && $m_file != ".."){
						if(get_option('dhnd_default') == $m_file){
							echo '<option value="'.$m_file.'" selected>'.$m_file.'</option>';
						} else {
							echo '<option value="'.$m_file.'">'.$m_file.'</option>';
						}
					}
				}
			}
			?>
		</select>
	<span class="setting-description"><br />
	Если вы не выберите никакого медиа-файла, соответственно - ничего не будет выводиться в заголовке вашей страницы. <br />Выберите "Использовать любой случайный" - тогда будет выводиться любой произвольно выбранный медиа-файл.</span></td>
</tr>

<tr valign="top">
<th scope="row">Главная страница блога</th>
<td>	<select name="dhnd_homepage" id="dhnd_homepage">
			<option value="None" <?php if(get_option('dhnd_homepage') == 'None') echo 'selected'  ?>>- Нет файла по умолчанию -</option>
			<option value="Random" <?php if(get_option('dhnd_homepage') == 'Random') echo 'selected'  ?>>- Использовать любой случайный -</option>
			<?php
			//Print out the media file list
			if($media_dir = opendir($dhnd_image_dir)){
				while ($m_file = readdir($media_dir)) {
					if($m_file != "." && $m_file != ".."){
						if(get_option('dhnd_homepage') == $m_file){
							echo '<option value="'.$m_file.'" selected>'.$m_file.'</option>';
						} else {
							echo '<option value="'.$m_file.'">'.$m_file.'</option>';
						}
					}
				}
			}
			?>
		</select>
	<span class="setting-description"><br />
	Главная страница вашего блога. Эта страница показывает ваши последние посты. <br />Здесь вы можете выбрать медиа-файл, который будет постоянно виден на вашей главной странице блога.</span></td>
</tr>
</table>

<input type="hidden" name="action" value="update" />
<input type="hidden" name="page_options" value="dhnd_max_size,dhnd_default,dhnd_homepage,dhnd_footer_link" />

<p class="submit">
<input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
</p>

</form>
</div>