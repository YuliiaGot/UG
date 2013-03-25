<div class="wrap">
	<h2>Dynamic Headers - Управление файлами</h2>
	
<?php
	include("header.php");
	$conf = 0;
	
	if($_POST['delete'] == 'yes'){
		$myFile = $_POST['mediaHeader'];
		unlink($dhnd_image_dir.$myFile);
		
		echo '<div style="background-color: rgb(255, 251, 204);" id="message" class="updated fade"><p>File: <strong>'.$myFile.'</strong> has been deleted.</p></div>';
	}
	
	if($_POST['altText'] != "" && isset($_POST['altText'])){
		update_option('dhnd_'.$_POST['mediaHeader'].'_alt', $_POST['altText']);
		$conf = 1;
	}
	
	if($_POST['link'] != "" && isset($_POST['link'])){
		update_option('dhnd_'.$_POST['mediaHeader'].'_link', $_POST['link']);
		update_option('dhnd_'.$_POST['mediaHeader'].'_target', $_POST['target']);
		$conf = 1;
	}
	
	if($conf = 1){
		echo '<div style="background-color: rgb(255, 251, 204);" id="message" class="updated fade"><p>File: <strong>'.$_POST['mediaHeader'].'</strong> has been updated.</p></div>';
}	
?>
	<h3>Удаление файлов</h3>
	<p>Используйте эту форму, чтобы удалить ненужные файлы на вашем сервере<br />
	<strong>Внимание: Это действие не может быть отменено!</strong></p>
	<form action="<?php echo $_SERVER["REQUEST_URI"]; ?>" method="POST">
		<input type="hidden" name="delete" value="yes" />
		<select name="mediaHeader" id="mediaHeader">
			<option value="None">-- Медиа-файл не выбран --</option>
			<?php
			//Print out the media file list
			if($media_dir = opendir($dhnd_image_dir)){
				while ($m_file = readdir($media_dir)) {
					if($m_file != "." && $m_file != ".."){
						if($media_file == $m_file){
							echo '<option value="'.$m_file.'" selected>'.$m_file.'</option>';
						} else {
							echo '<option value="'.$m_file.'">'.$m_file.'</option>';
						}
					}
				}
			}
			?>
		</select>
		<input type="submit" class="button-primary" value="<?php _e('Удалить файл') ?>" />
	</form>
	<br /><br />
	<h3>Обновление файлов</h3>
	<p>Используйте эту форму для коррекции alt / title тэгов вашего медиа-файла.<br />
	Это поможет браузерам и посковикам правильно прочитать и описать ваши файлы.</p>
	<form action="<?php echo $_SERVER["REQUEST_URI"]; ?>" method="POST">
		<input type="hidden" name="altUpdate" value="yes" />
		Обновить файл:<br />
		<select name="mediaHeader" id="mediaHeader">
			<option value="None">-- Медиа-файл не выбран --</option>
			<?php
			//Print out the media file list
			if($media_dir = opendir($dhnd_image_dir)){
				while ($m_file = readdir($media_dir)) {
					if($m_file != "." && $m_file != ".."){
						if($media_file == $m_file){
							echo '<option value="'.$m_file.'" selected>'.$m_file.'</option>';
						} else {
							echo '<option value="'.$m_file.'">'.$m_file.'</option>';
						}
					}
				}
			}
			?>
		</select>
		<br />
		<br />
		Новый тэг Alt:<br />
		<input type="text" name="altText" id="altText" />
		<br />
		<br />
		Новый URL:<br />
		<input type="text" name="link" id="link" />
		<br />
		<br />
		В каком окне выводить:<br />
					<select name="target">
					<option value="">В этом же окне</option>
					<option value="_blank">Новое окно</option>
				</select>
		<br />
		<br />
		<input type="submit" class="button-primary" value="<?php _e('Обновить файл') ?>" />
	</form>
	
</div>