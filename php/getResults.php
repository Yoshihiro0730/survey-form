<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Credentials: true");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$files = glob("results/*.json");
$name=$_GET['name'];
$email=$_GET['email'];

$results = [];

// 指定された条件がjsonファイルにあるかチェック
for ($count = 0; $count < count($files); $count++) {
    $target_file = $files[$count];
    $texts = file_get_contents($target_file);
    $file_content = json_decode($texts, true);

    // クエリパラメータの名前とメールアドレスが一致していた時にデータを格納
    if(isset($file_content['data']['name']) && $file_content['data']['name'] === $name && $file_content['data']['email'] === $email){
        $result[] = $file_content; 
    }; 
}

echo json_encode($result);
?>

