<?php
$url 	= '../photos/' ;
if (!is_dir($url)) {
	mkdir($url) ;
}
$p = opendir($url) ;
echo ("J'ouvre le dossier ".$url.". ") ;
while (($file = readdir($p)) !== false) {
	if (is_dir($url."/".$file) && $file != "." && $file != "..")  {
		echo ("\n J'ouvre le sous dossier $file. ") ;
		if (!is_dir($url."/".$file."/miniatures")) {
			echo ("Le dossier des miniatures n'existe pas. Je le crée. ") ;
			mkdir($url."/".$file."/miniatures") ;
		}
		if (!is_dir($url."/".$file."/photos")) {
			echo ("Le dossier des photos n'existe pas. Je le crée. ") ;
			mkdir($url."/".$file."/photos") ;
		}
		$p2 = opendir($url."/".$file) ;
		$compteur = 1 ;
		while (($file2 = readdir($p2)) !== false) {
			if (!is_dir($url."/".$file."/".$file2)) {
				if ((substr(strtolower($file2), -3) == "jpg") || (substr(strtolower($file2), -3) == "png")) {
					echo "Je dois traiter la photo $file2. " ;
					$image = new Imagick($url."/".$file."/".$file2) ;
					//a - sauvegarde de l'image principale dans le dossier des photos, avec renommage
					if ($compteur < 10) $s = $image->writeImage($url."/".$file."/photos/photo000".$compteur.".jpg") ;
					elseif ($compteur < 100) $s = $image->writeImage($url."/".$file."/photos/photo00".$compteur.".jpg") ;
					elseif ($compteur < 1000) $s = $image->writeImage($url."/".$file."/photos/photo00".$compteur.".jpg") ;
					else $s = $image->writeImage($url."/".$file."/photos/photo".$compteur.".jpg") ;
					//b - réalisation d'une miniature
					$t = $image->thumbnailImage(300, 0) ;
					if (!$t) echo "Echec dans la réalisation de la miniature. " ;
					if ($compteur < 10) $image->writeImage($url."/".$file."/miniatures/photo000".$compteur.".jpg") ;
					elseif ($compteur < 100) $image->writeImage($url."/".$file."/miniatures/photo00".$compteur.".jpg") ;
					elseif ($compteur < 1000) $image->writeImage($url."/".$file."/miniatures/photo0".$compteur.".jpg") ;
					else $image->writeImage($url."/".$file."/miniatures/photo".$compteur.".jpg") ;
					//suppression de l'image
					$t = unlink($url."/".$file."/".$file2) ;
					$compteur++ ;
				}
			}
		}
	}
}
?>