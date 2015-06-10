<?php
$headerHTML = 1 ;
require_once("../inc/centrale.php") ;
extraction("galerie", "modeVerbeux") ;

$url 	= '../photos/'.$galerie ;
$size	= 3 ;

if (is_dir($url)) {
	$urlg = $url.'/miniatures' ;
	if (is_dir($urlg)) {
		$p = opendir($urlg) ;
		$photos = array() ;
		while (($file = readdir($p)) !== false) {
			if (substr($file, 0, 5) == "photo") $photos[] = $file ;
        }
		sort($photos) ;
        closedir($p);
		$j = 0 ;
		echo '<table id="galerie_'.$galerie.'" nElement = "'.count($photos).'">' ;
		for ($i = 0 ; $i < count($photos) ; $i++) {
			if ($j == 0) echo "<tr>" ;
			$nphoto = $i + 1 ;
			echo '<td><img src="'.$urlg."/".$photos[$i].'" onClick="javascript:wall.afficheUnePhoto('.$nphoto.', \''.$galerie.'\')" alt=""></td>' ;
			$j++ ;
			if ($j >= $size) {
				echo "</tr>" ;
				$j = 0 ;
			}
		}
		if ($j == 0) echo "<tr>" ;
		echo '<td><div class="dropArea" id="dropArea_'.$galerie.'"><p></p>Déposez ici une nouvelle photo.</div></td>' ;
		echo '</tr>' ;
		echo '</table>' ;
	}
}
?>