<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// レスポンス内容を変数に格納
$name = $_GET["name"];
$email = $_GET["email"];
$age = $_age("age");
ini_set('display_errors', 'On'); // エラーを表示させるようにしてください
error_reporting(E_ALL); // 全てのレベルのエラーを表示してください
?>
<html>
<head>
<meta charset="utf-8">
<title>GET練習（受信）</title>
</head>
<body>
お名前：<?= $name?> 
Mail：<?= $mail?> 
<ul>
<li><a href="index.php">index.php</a></li>
</ul>
</body>
</html>