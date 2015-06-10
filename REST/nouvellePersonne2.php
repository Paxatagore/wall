<?php
/* script de validation  */
require_once("../inc/centrale.php") ;
extraction("num") ;

$p1 = new personne_temp() ;
$p1->get($num );

$p 				= new personne ;
$p->nom 		= $p1->nom ;
$p->prenom 		= $p1->prenom ;
$p->mail 		= $p1->mail ;
$p->motdepasse 	= md5($p->prenom) ;
if ($p->save()) {
	if ($p1->delete()) {
		$json = '{"status":1}' ;
	}
	else {
		$json = '{"status":-1}' ;
	}
}
else {
	$json = '{"status":-2}' ;
}
$message = '<html><head><title>Nouvelle personne sur le site familial des Brier</title></head><body>Vous avez été inscrit à votre demande sur le site de la famille Brier. <a href="https://www.steppe.fr/deBrier/wall/">Vous pouvez désormais vous connecter sur le site</a>, en utilisant votre nom et votre prénom. Votre mot de passe provisoire est votre prénom : veillez à le changer rapidement !' ;
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: Mur de Brier <nous.debrier@outlook.fr>' . "\r\n";
@mail($p->mail, "Validation de votre inscription sur le site familial des Brier",  $message, $headers) ;
die($json) ;
?>