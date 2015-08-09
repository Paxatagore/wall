<?php
/* script d'authentification */
require_once("../inc/centrale.php") ;
extraction("nom", "prenom", "password", "modeVerbeux") ;
$p = new personne ;

$prenom = str_replace("\'", "%", $prenom) ;
$prenom = str_replace("'", "%", $prenom) ;
$prenom = str_replace("-", "%", $prenom) ;
$prenom = strtolower($prenom) ;
$nom = str_replace("\'", "%", $nom) ;
$nom = str_replace("'", "%", $nom) ;
$nom = str_replace("-", "%", $nom) ;
$nom = strtolower($nom) ;
$q = "SELECT * FROM personne WHERE LOWER(nom) LIKE '".$nom."' AND LOWER(prenom) LIKE '".$prenom."'" ;
//echo ($q) ;
mysqldb::send($q) ;
if ($res = mysqldb::$req->fetch()) {
	foreach($res as $key => $value) {
		$p->$key = stripslashes($value) ;
	}
	if (md5($password) == $p->motdepasse) {
		$json = '{"connexion":1, "personne":'.$p->json().'}' ;
		$p->derniere_connexion = date('Y-m-d H:i:s') ;
		$p->save() ;
	}
	else {
		$json = '{"connexion":-1}' ;
	}
}
else {
	$json = '{"connexion":-2}' ;
}
die($json) ;
?>