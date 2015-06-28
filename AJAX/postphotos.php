<?php
require_once("../inc/centrale.php") ;
extraction("galerie", "auteur", "modeVerbeux") ;
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
			$orientation = $image->getImageOrientation() ; 
			 switch($orientation) {
				case imagick::ORIENTATION_BOTTOMRIGHT:
					$image->rotateimage("#000", 180); // rotate 180 degrees
				break;

				case imagick::ORIENTATION_RIGHTTOP:
					$image->rotateimage("#000", 90); // rotate 90 degrees CW
				break;

				case imagick::ORIENTATION_LEFTBOTTOM:
					$image->rotateimage("#000", -90); // rotate 90 degrees CCW
				break;
			}
			// Now that it's auto-rotated, make sure the EXIF data is correct in case the EXIF gets saved with the image!
			$image->setImageOrientation(imagick::ORIENTATION_TOPLEFT); 

			//a - sauvegarde de l'image principale dans le dossier de stockage photos
			$s = $image->writeImage($url."/".$file."/stockage/".$sFileName) ;
			if (!$s) $json = '{"status":-4, "fichier":"'.$sFileName.'"}' ;
			else {
				//b - réalisation d'une image de taille moyenne
				$t = $image->thumbnailImage(0, 600) ;	
				if (!$t) $json = '{"status":-5, "fichier":"'.$sFileName.'"}' ;
				else {
					$s = $image->writeImage($url."/".$file."/photos/".$sFileName) ;
					//c - réalisation d'une miniature
					if($image->getImageHeight() <= $image->getImageWidth()) {
						$t = $image->thumbnailImage(300, 0) ;	
					}
					else {
						$t = $image->thumbnailImage(0, 300) ;	
					}
					if (!$t) $json = '{"status":-5, "fichier":"'.$sFileName.'"}' ;
					$s = $image->writeImage($url."/".$file."/miniatures/".$sFileName) ;
					if (!$s) $json = '{"status":-6, "fichier":"'.$sFileName.'"}' ;
					else $json = '{"status":1, "fichier":"'.$sFileName.'"}' ;
					//suppression de l'image initiale
					$t = unlink($url."/".$file."/".$sFileName) ;
					//création d'un message
					$m = new message() ;
					$m->categorie = 1 ;
					$m->auteur = $auteur ;
					$a = new personne() ;
					$a->get($m->auteur) ;
					$m->date = date('Y-m-d H:i:s') ;
					$m->texte = '<div>'.$a->prenom.' '.$a->nom.' vient de déposer une nouvelle photographie sur le site.</div><div><img src="../photos/'.$file.'/miniatures/'.$file2.'"></div>' ;
					$m->save() ;
					$m->aftertreat() ;
				}
			}
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
