<?php

// Подключаем SMTP класс для работы с почтой
include_once('km_smtp_class.php');
$message_template=$_POST['message_template'];
$post_theme=$_POST['post_theme'];



$domain_name=$_POST['domain_name'];
$files_lib=$_POST['files_lib'];
$full_domain_name=$_POST['full_domain_name'];
// Конфигурационный массив
$SenderConfig = array(
    "SMTP_server"   =>  "smtp.yandex.ru",
    "SMTP_port"     =>  "465",
    "SMTP_email"    =>  "site.demo-mail@yandex.ru",
    "SMTP_pass"     =>  "kNfQCsJJ4BxzU5SreTXp",
    "SMTP_type"     =>  "ssl"
);

// Email получателя/Получателей
// $Receiver = "site.shans@yandex.ru";

$Receiver = "sergey@rm26.ru";


    // Тема сообщения
    $Subject = $post_theme;
    // Текст сообщения (в HTML)
    $Text = "$message_template";



// Вложение в письме - адрес к файлу
$Attachments=array($files_lib);
// $Attachment = "uploads/mount-6-1-c640x0.jpg uploads/483291-dying-light-the-following-3612x2032.jpg";
// $Attachments = "http://www.natalya-shans.ru/images/uploads/mount-6-1-c640x0.jpg";

/* $mail = new KM_Mailer(сервер, порт, пользователь, пароль, тип); */
/* Тип может быть: null, tls или ssl */
$mail = new KM_Mailer($SenderConfig['SMTP_server'], $SenderConfig['SMTP_port'], $SenderConfig['SMTP_email'], $SenderConfig['SMTP_pass'], $SenderConfig['SMTP_type']);
if($mail->isLogin) {
    // Прикрепить файл
    if($Attachments) {
        foreach ( $files_lib as $file ) {
            $file=$full_domain_name.$file;
            $mail->addAttachment($file);
        } 
    }

    // Добавить ещё получателей
    // $mail->addRecipient('user@mail.ru');
    // $mail->addRecipient('user@yandex.ru');

    /* $mail->send(От, Для, Тема, Текст, Заголовок = опционально) */
    $SendMail = $mail->send($SenderConfig['SMTP_email'], $Receiver, $Subject, $Text);
    // Очищаем список получателей
    $mail->clearRecipients();
    $mail->clearCC();
    $mail->clearBCC();
    $mail->clearAttachments();
    if($Attachments){
        foreach ( $files_lib as $file ) {
            $file=$domain_name.$file;
            unlink($file);
        } 
    }
    echo "Письмо успешно отправлено";
}
 else {
    echo "Возникла ошибка во время подключения к SMTP-серверу<br />";
 }
?>