<?php
// Здесь нужно сделать все проверки передавемых файлов и вывести ошибки если нужно

// Переменная ответа
$data = array();

if( isset( $_GET['uploadfiles'] ) ){  
    $error = false;
    $files = array();
    $check;
    $uploaddir = './../../../images/uploads/'; // . - текущая папка где находится submit.php
	
	// Создадим папку если её нет
	if( ! is_dir( $uploaddir ) ) mkdir( $uploaddir, 0777 );

	// переместим файлы из временной директории в указанную
	foreach( $_FILES as $file ){
        if( move_uploaded_file( $file['tmp_name'], $uploaddir . basename($file['name']) ) ){
            $check=$file['type'];
            if(($check=="image/jpeg")||($check=="image/jpg")||($check=="image/png")){
                $files[] = realpath( $uploaddir . $file['name'] );
            } else{
               unlink($file['tmp_name']);
            }
            
        }
        else{
            $error = true;
        }
    }
	
    $data = $error ? array('error' => 'Ошибка загрузки файлов.') : array('files' => $files );
	
	echo json_encode( $data );
}
