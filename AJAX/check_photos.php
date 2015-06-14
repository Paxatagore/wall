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
		if (!is_dir($url."/".$file."/stockage")) {
			echo ("Le dossier de stockage des photos n'existe pas. Je le crée. ") ;
			mkdir($url."/".$file."/stockage") ;
		}
		$p2 = opendir($url."/".$file) ;
		while (($file2 = readdir($p2)) !== false) {
			if (!is_dir($url."/".$file."/".$file2)) {
				if ((substr(strtolower($file2), -3) == "jpg") || (substr(strtolower($file2), -3) == "png")) {
					echo "Je dois traiter la photo $file2. " ;
					$image = new Imagick($url."/".$file."/".$file2) ;
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
					$s = $image->writeImage($url."/".$file."/stockage/".$file2) ;
					if (!$s) echo "Echec dans la sauvegarde initiale du document. " ;
					
					//b - réalisation d'une image de taille moyenne
					$t = $image->thumbnailImage(0, 600) ;	
					if (!$t) echo "Echec dans la réalisation de la taille moyenne. " ;
					$s = $image->writeImage($url."/".$file."/photos/".$file2) ;

					//c - réalisation d'une miniature
					if($image->getImageHeight() <= $image->getImageWidth()) {
						$t = $image->thumbnailImage(300, 0) ;	
					}
					else {
						$t = $image->thumbnailImage(0, 300) ;	
					}
					if (!$t) echo "Echec dans la réalisation de la miniature. " ;
					$s = $image->writeImage($url."/".$file."/miniatures/".$file2) ;
					if (!$s) echo "Echec dans la sauvegarde de la miniature. " ;
					//suppression de l'image
					$t = unlink($url."/".$file."/".$file2) ;
					$image->destroy() ;
				}
			}
		}
	}
}
?>