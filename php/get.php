<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Jsonファイルを読み込む
$files = glob("results/*.json");
$results = [];

try{
    for ($count=0; $count < count($files); $count++) {
        $target_file = $files[$count];
        $texts = file_get_contents($target_file);
        $file_content = json_decode($texts, true);
        if($file_content !== null){
            $results[] = $file_content; 
        } else {
            throw new Exception("JSONファイルのデコード処理に失敗しました。" . json_last_error_msg);
        }
    } 
} catch (Exception $e) {
    echo "エラーが発生しました。" . $e->getMessage();
    exit;
}
echo json_encode($results);
?>
