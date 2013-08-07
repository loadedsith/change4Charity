<?php

header('Content-Type: application/json');

$results = array("Yellow killer whale","Smarty Lear's Macaw");
$execString = "./succubusFun.rb "."3" ;
$results[]= exec($execString);
echo json_encode($results);

?>