<?php 
include("function.php");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header('Content-Type: application/json; charset=UTF-8');
header("Access-Control-Allow-Credentials: true");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$date = date("Y-m-d H:i:s");
$response = array();
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $first_name = $_POST['name'];
    $email = $_POST['email'];
    $age = intval($_POST['age']);
    $fun = $_POST['fun'];
    $addInfo = $_POST['addInfo'];
    $wastTime = intval($_POST['wastTime']);
    $response = array(
        'status' => 'success',
        'message' => 'HTMLからPOST送信を受け取りました',
        'date' => $date,
        'data' => array(
            'name' => $first_name,
            'email' => $email,
            'age' => $age,
            'fun' => $fun,
            'addInfo' => $addInfo,
            'wastTime' => $wastTime
        ) 
    );
    echo "POST送信を受け取りました";    
} else {
    echo "POST送信に失敗しました。";
}
// echo json_encode($response, JSON_UNESCAPED_UNICODE);
$result = json_encode($response, JSON_UNESCAPED_UNICODE);
$file_path = make_file(dirname(__FILE__). '/results' . '/' . 'result.json');
echo dirname(__FILE__);
file_put_contents($file_path , $result);
exit;

// ファイル名を連番で出力する関数
function make_file($org_path, $num=0) {
    if( $num > 0 ) {
        $info = pathinfo($org_path);
        $path = $info['dirname'] . "/" . $info['filename'] . "_" . $num;
        if(isset($info['extension'])) $path .= "." . $info['extension'];
    } else {
        $path = $org_path;
    }
    if(file_exists($path)){
        $num++;
        return make_file($org_path, $num);
    } else {
        return $path;
    }
}
?>