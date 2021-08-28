<?php
// PHP解析网易云音乐高品质320kbps音乐

function netease_http($url) {
    $refer = 'http://music.163.com/';
    $header[] = 'Cookie: ' . 'appver=1.5.0.75771;';
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
    curl_setopt($ch, CURLOPT_REFERER, $refer);
    $cexecute = curl_exec($ch);
    curl_close($ch);
    if ($cexecute) {
        $result = json_decode($cexecute, true);
        return $result;
    } else {
        return false;
    }
}

function encrypted_id($dfsid) {
    $key = '3go8&$8*3*3h0k(2)2';
    $key_len = strlen($key);
    for ($i = 0; $i < strlen($dfsid); $i++) {
        $dfsid[$i] = $dfsid[$i] ^ $key[$i % $key_len];
    }
    $raw_code = base64_encode(md5($dfsid, true));
    $code = str_replace(array('/', '+' ) , array('_', '-') , $raw_code);
    return $code;
}

function get_mp3_url($mp3_url, $dfsid) {
    $url = '';
    if ($mp3_url && $dfsid) {
        $id = number_format($dfsid, 0, '', '');
        $url = 'http://' . explode("/", $mp3_url) [2] . '/' . encrypted_id($id) . '/' . $id . '.mp3';
    }
    return $url;
}

function netease_song($music_id) {
    $url = 'http://music.163.com/api/song/detail/?id=' . $music_id . '&ids=%5B' . $music_id . '%5D';
    $response = netease_http($url);
    if ($response['code'] == 200 && $response['songs']) {
        // 处理音乐信息
        $songs = $response['songs'][0];
        $dfsid = 0;
        if ($songs['hMusic']) $dfsid = $songs['hMusic']['dfsId'];
        else if ($songs['mMusic']) $dfsid = $songs['mMusic']['dfsId'];
        else if ($songs['lMusic']) $dfsid = $songs['lMusic']['dfsId'];
        if ($dfsid) return str_replace('http://m', 'http://p', get_mp3_url($songs['mp3Url'], $dfsid));
        else return false;
    }
    return false;
}

$id = $_REQUEST['id'];
$url = netease_song($id);
//print_r($url);
if ($url) Header("Location: $url");
else echo 'Music No Found';
?>
