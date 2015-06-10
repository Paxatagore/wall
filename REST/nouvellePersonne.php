<?php
/* script d'inscription */
require_once("../inc/centrale.php") ;
extraction("nom", "prenom", "mail", "position") ;

$p = new personne ;
$req = mysqldb::$id->prepare("SELECT * FROM personne WHERE LOWER(nom) = ? AND LOWER(prenom) = ?") ;
$req->execute(array(strtolower($nom), strtolower($prenom))) ;
$res = $req->fetch() ;
if (is_array($res)) {
	//il y a déjà quelqu'un qui s'appelle comme ça.
	$json = '{"status":-1}' ;
}
else {
	$p2 = new personne_temp() ;
	$p2->nom 	= $nom ;
	$p2->prenom	= $prenom ;
	$p2->mail 	= $mail ;
	$p2->position	= $position ;
	if ($p2->save())	$json = '{"status":1}' ;
	else $json = '{"status":-2}' ;
}
die($json) ;
?>