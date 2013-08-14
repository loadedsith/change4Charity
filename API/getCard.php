<?php

header('Content-Type: application/json');

$results = array();
if($_GET['seed']&&$_GET['seed']!=0){
  $execString = "./succubusFun.rb ".$_GET['seed'] ;
}else{
  $execString = "./succubusFun.rb";
}
$results[]= exec($execString);
echo json_encode($results);

?>