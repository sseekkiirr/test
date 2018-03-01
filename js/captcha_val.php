<?php 
session_start();
// include "captcha.php";
$captcha_val=$_SESSION['captcha_val'];
// echo "captcha_val";
echo "$captcha_val";
 ?>