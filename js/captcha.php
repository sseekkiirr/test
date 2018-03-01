<?php
session_start(); 
$width = 100;               //Ширина изображения
$height = 60;               //Высота изображения
$font_size = 16;            //Размер шрифта
$let_amount = 4;            //Количество символов, которые нужно набрать
$fon_let_amount = 60;       //Количество символов на фоне
$font = "Franklin Gothic Book.ttf";   //Путь к шрифту
$test="test";
//набор символов
$letters = array("q", "w", "e", "r","t","y","u","i","p","a","s","d","f","g","h","j","k","l","z","x","c","v","b","n","m","1","2","3","4","5","6","7","8","9");     
//цвета
// $colors = array("90","110","130","150","170","190","210"); 
 
$src = imagecreatetruecolor($width,$height);    //создаем изображение              
$fon = imagecolorallocate($src,255,255,255);    //создаем фон
imagefill($src,0,0,$fon);                       //заливаем изображение фоном

for($i=0;$i < $fon_let_amount;$i++)          //добавляем на фон буковки
{
//случайный цвет
$color = imagecolorallocatealpha($src,rand(0,255),rand(0,255),rand(0,255),rand(90,105));
//случайный символ
$letter = $letters[rand(0,sizeof($letters)-1)];
//случайный размер                             
$size = rand($font_size-4,$font_size+4);                                           
imagettftext($src,$size,rand(0,45),
rand($width*0.1,$width-$width*0.1),
rand($height*0.2,$height),$color,$font,$letter);
}
 
for($i=0;$i < $let_amount;$i++)      //то же самое для основных букв
{
$color = imagecolorallocatealpha($src,rand(0,200),rand(0,200),rand(0,200),0);
// $colors[rand(0,sizeof($colors)-1)],
// $colors[rand(0,sizeof($colors)-1)],rand(20,40));
$letter = $letters[rand(0,sizeof($letters)-1)];
$size = rand($font_size*2-4,$font_size*2+4);
$x = ($i+1)*$font_size + rand(1,5);      //даем каждому символу случайное смещение
$y = (($height*2)/3) + rand(0,5);                           
$cod[] = $letter;                        //запоминаем код
imagettftext($src,$size,rand(0,15),$x,$y,$color,$font,$letter);
}

 
$cod = implode("",$cod);                    //переводим код в строку

 

header ("Content-type: image/gif");         //выводим готовую картинку

imagegif($src);
$_SESSION['captcha_val']=$cod;
 ?>