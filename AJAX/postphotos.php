<?php
require_once("../inc/centrale.php") ;
extraction("galerie", "modeVerbeux") ;
$url 	= '../photos/'.$galerie ;

if (isset($_FILES['myfile'])) {
    $sFileName = $_FILES['myfile']['name'] ;
    $sFileType = $_FILES['myfile']['type'] ;
	$sTemp = $_FILES['myfile']['tmp_name'] ;
	if ($_FILES['myfile']['size'] > 1250000) {
		$json = '{"status":-3, "taille":'.$_FILES['userfile']['size'].'"}' ;
	}
	else {
		$t = move_uploaded_file($sTemp, $url."/".$sFileName) ;
		if ($t) {
			
			$p = opendir('../photos/'.$galerie.'/photos/') ;
			$compteur = 0 ;
			while (($file = readdir($p)) !== false) {
				$nfile = substr($file, 5, 4) ;
				if ($nfile > $compteur) $compteur = $nfile ;
			}
			$compteur++ ;
			$image = new Imagick('../photos/'.$galerie.'/'.$sFileName) ;
			//a - sauvegarde de l'image principale dans le dossier des photos, avec renommage
			if ($compteur < 10) 		$nnf = "photo000".$compteur.".jpg" ;
			elseif ($compteur < 100) 	$nnf = "photo00".$compteur.".jpg" ;
			elseif ($compteur < 1000)	$nnf = "photo0".$compteur.".jpg" ;
			else 						$nnf = "photo".$compteur.".jpg" ;
			$s = $image->writeImage($url."/photos/".$nnf) ;
			//b - réalisation d'une miniature
			$t = $image->thumbnailImage(300, 0) ;
			$image->writeImage($url."/miniatures/".$nnf) ;
			//suppression de l'image
			$t = unlink($url."/".$sFileName) ;
			$json = '{"status":1, "compteur":'.$compteur.', "photoNom":"'.$nnf.'"}' ;
		}
		else {
			$json = '{"status":-1, "fichier":"'.$sFileName.'"}' ;
		}
	}
}
else {
	$json = '{"status":-2}' ;
}
die($json) ;
?>
