<div class="wrap">
	<h2>Dynamic Headers - Об авторе</h2>
<?php include("header.php"); ?>
	
	Этот плагин написан и поддерживается Dan Cannon из <a href="http://blog.nicasiodesign.com" target="_blank">Nicasio Design and Development</a>.<br />
	<br />
	Nicasio Design - фирма, которая выполняет различные дизайн-проекты и специализируется на WordPress.<br />
	<br />
	Вы легко можете сегодня <a href="http://nicasiodesign.com/contact-us.php" target="_blank">Связаться с нами</a>  чтобы обсудить ваш следующий проект.
	<br />
	<h2>Команда</h2>
	<strong>Dan Cannon</strong> - Lead Developer/Programmer<br />
	<strong>Chris Underwood</strong> - Lead Designer<br />
	<strong>Felix Figuereo</strong> - Project Management<br />
	
	<?php require_once (ABSPATH . WPINC . '/rss-functions.php'); ?>
	<?php $today = current_time('mysql', 1); ?>
	<div class="main">
	  <h2>Новости компании Nicasio</h2>

		<?php
		$rss = @fetch_rss('http://blog.nicasiodesign.com/feed/');
		if ( isset($rss->items) && 0 != count($rss->items) ) {
		?>
			<ol>
			<?php
			$rss->items = array_slice($rss->items, 0, 10);
			foreach ($rss->items as $item ) {
			?>
			<li>
			  <a href='<?php echo wp_filter_kses($item['link']); ?>'>
			  <?php echo wp_specialchars($item['title']); ?>
			  <small>-
				<?php echo human_time_diff( strtotime($item['pubdate'], time() ) ); ?>
				<?php _e('спустя'); ?>
			  </small>
			  </a>
			</li>
		<?php
		}
		}
		?>
		</ol>
	<h2>Функциональное назначение</h2>
	- Способен управлять различными динамическими медиа-файлами на любой странице.<br />
	- Способен создавать ваши собственные динамические медиа-модули.<br />
	- Более визуальный выбор и управление вашей динамической библиотекой.<br />
	- Допускает взаимодействие с вашей библиотекой медиа-файлов.<br />
	- Способен устанавливать заголовки для ваших архивных страниц и постов.<br />
	<br />
	<br />
</div>