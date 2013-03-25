<?php
/**
 * Основные параметры WordPress.
 *
 * Этот файл содержит следующие параметры: настройки MySQL, префикс таблиц,
 * секретные ключи, язык WordPress и ABSPATH. Дополнительную информацию можно найти
 * на странице {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Кодекса. Настройки MySQL можно узнать у хостинг-провайдера.
 *
 * Этот файл используется сценарием создания wp-config.php в процессе установки.
 * Необязательно использовать веб-интерфейс, можно скопировать этот файл
 * с именем "wp-config.php" и заполнить значения.
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'catering');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', 'admin');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется снова авторизоваться.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '?;9|6wX+n<rmL1[%t:Nqt/^jbX(>=F*C8mK:=2-E^Q?+?CIzO>y;Y3-C(qmxTe#v');
define('SECURE_AUTH_KEY',  '}Kv[aJE/w0Q1J7_HK$jajm-S E+jWIP)iQz6X^cBH#<yW@Ib*/o7qtcGuB9Y503B');
define('LOGGED_IN_KEY',    'zhe{L=p-uaiYIh9~ssP8+rog#N6)(0gA{vH_Qi+|1gp5S8~Fv0N~%e%%:*]Mw(|k');
define('NONCE_KEY',        ')I/GDQ;*l54+c?&M(1emP}U^c:DcTIxFLk$.?ioUr5Y=STKFl` i<@(p|}|*CXoQ');
define('AUTH_SALT',        'wfcD]66-rm50!.|j]~]h2Zd0)`2P!ir2J2QbgF3j3~<xZ# Q v6v2FI3JXR08W<#');
define('SECURE_AUTH_SALT', '`]yKm}i``gFR9,9^PQ&*>KBUT~R`Za!TN(O=yKNCl0@eIvueJ>lCC6z!=~02G,8Y');
define('LOGGED_IN_SALT',   '6? [m_2ERLUX@%[<XEv5pJV|zV.J?1/YZ)Q@SUn1=(6/%OFi=0jE8T?LRwFv0-jp');
define('NONCE_SALT',       ';=s,g2*$6iy~^ &@6.Q?q{:IUZ@h3}h6a9Uk*M%SObLu@NkFMLvx*-!$a{?y4hcn');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько блогов в одну базу данных, если вы будете использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'wp_';

/**
 * Язык локализации WordPress, по умолчанию английский.
 *
 * Измените этот параметр, чтобы настроить локализацию. Соответствующий MO-файл
 * для выбранного языка должен быть установлен в wp-content/languages. Например,
 * чтобы включить поддержку русского языка, скопируйте ru_RU.mo в wp-content/languages
 * и присвойте WPLANG значение 'ru_RU'.
 */
define('WPLANG', 'ru_RU');

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Настоятельно рекомендуется, чтобы разработчики плагинов и тем использовали WP_DEBUG
 * в своём рабочем окружении.
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
