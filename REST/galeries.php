<?php
/* script qui renvoie les galeries  */
require_once("../inc/centrale.php") ;
$url 	= '../photos/' ;
if (!is_dir($url)) {
	mkdir($url) ;
}
$p = opendir($url) ;
$json2 = [] ;
$dossiers = array() ;
while (($file = readdir($p)) !== false) {
	if (is_dir($url."/".$file) && $file != "." && $file != "..")  {
		if (!is_dir($url."/".$file."/miniatures")) {
			mkdir($url."/".$file."/miniatures") ;
		}
		if (!is_dir($url."/".$file."/photos")) {
			mkdir($url."/".$file."/photos") ;
		}
		$dossiers[] = $file ;
	}
}
sort($dossiers) ;
foreach($dossiers as $file) {	
	$p2 = opendir($url."/".$file."/photos") ;
	$json3 = [] ;
	while (($file2 = readdir($p2)) !== false) {
		if (!is_dir($url."/".$file."/".$file2)) {
			if ((substr(strtolower($file2), -3) == "jpg") || (substr(strtolower($file2), -3) == "png")) {
				$json3[] = '"'.$file2.'"' ;
			}
		}
	}
	sort($json3) ;
	$json2[] = '{"nom":"'.$file.'", "contenu":['.implode(",", $json3).']}' ;
}
$json = '{"galeries":['.implode(",", $json2).']}' ;
die($json) ;
?>