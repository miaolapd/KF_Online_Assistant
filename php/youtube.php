<?php
/* 获取YouTube视频地址 */

/**
 * 获取Token
 * @return string Token
 */
function getToken()
{
    $token = '';
    $content = file_get_contents('https://www.findyoutube.net/');
    if (preg_match('/<input id="csrf_token" name="csrf_token" type="hidden" value="([^"]+)">/i', $content, $matches)) {
        $token = $matches[1];
    }
    return $token;
}

/**
 * 获取视频地址
 * @param string $id 视频ID
 * @param string $token Token
 * @return string 视频地址
 */
function getVideoUrl($id, $token)
{
    $data = [
        'csrf_token' => $token,
        'url' => 'https://www.youtube.com/watch?v=' . $id,
        'submit' => 'Download'
    ];
    $options['http'] = array(
        'timeout' => 60,
        'method' => 'POST',
        'header' => 'Content-type:application/x-www-form-urlencoded',
        'content' => http_build_query($data)
    );

    $url = 'https://www.findyoutube.net/result';
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);

    $url = '';
    if (preg_match('/<td>MP4,High Quality - 1280x720<\/td>(?:.|\r|\n)+?<a href=(\S+) /i', $result, $matches)) {
        $url = $matches[1];
    } else if (preg_match('/<td>MP4,Medium Quality - 480x360<\/td>(?:.|\r|\n)+?<a href=(\S+) /i', $result, $matches)) {
        $url = $matches[1];
    }
    return str_replace('&amp;','&', $url);
}


function main()
{
    $id = $_GET['id'];
    if (!$id) {
        echo 'No Param';
        return;
    }

    $token = getToken();
    //echo "Token: $token<br>";
    if (!$token) {
        echo 'Token No Found';
        return;
    }

    $url = getVideoUrl($id, $token);
    //echo "Url: $url<br>";
    if ($url) {
        Header('Location: ' . str_replace('http://', 'https://', $url));
    } else {
        echo 'Video No Found';
    }
}

main();
?>