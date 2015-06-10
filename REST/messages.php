<?php
/* script qui renvoie des messages */
require_once("../inc/centrale.php") ;
extraction("borneinf", "bornesup", "categorie") ;

$m = new message() ;

$ojson = array() ;

if (!isset($categorie)) 	$categorie = 1 ;
if (!isset($borneinf)) 		$borneinf = 0 ;
if (!isset($bornesup)) 		$bornesup = 150 ;

$req = mysqldb::$id->prepare("SELECT message.num, message.categorie, message.texte, message.pere, message.date, concat(personne.prenom, ' ', personne.nom) as auteur, personne.mail FROM message, personne WHERE personne.num = message.auteur AND categorie = :categorie ORDER BY date DESC LIMIT $borneinf, $bornesup") ;
$res = $req->execute(array(':categorie' => $categorie)) ;

if ($res) {
	while ($m = $req->fetchObject("message")) {
		$ojson[] = $m->json() ;
	}
	$json = '{"status":1, "lenen":'.$req->rowCount().', "message" : ['.implode(", ", $ojson).']}' ;
}
else {
	$json = '{"status":-1}' ;
}
die($json) ;
?>