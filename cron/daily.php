<?php

function __autoload($class_name) {
    (@require_once "../inc/cl.".$class_name.".php") or die("Impossible de trouver ".$class_name) ;
}
require_once("../local/database.php") ;		//les coordonnées de connexion à mysql
require_once("../inc/cl.alpha.php") ;		//la classe alpha

//Connexion mysql
mysqldb::instance($bddserver, $bdduser, $bddpassword, $bdddatabase) ;


function traitement($level = 1, $codeSQL="1 DAY") {
	$q = "SELECT DISTINCT message.*, personne.nom, personne.prenom, personne.mail FROM message, personne WHERE personne.num = message.auteur AND date BETWEEN DATE_SUB(NOW(), INTERVAL ".$codeSQL.") AND NOW() ORDER BY DATE ASC" ;
	$message = '<html><head><title>De nouveaux messages sur le site familial des Brier</title></head><body>Vous êtes abonné à la liste d\'informations du site. Voici les nouveaux messages publiés depuis votre dernière livraison. Le rythme des mails que vous recevez dépend de votre abonnement - vous pouvez le modifier directement <a href="https://www.steppe.fr/deBrier/wall">sur le site</a>.<p></p>' ;
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
	$headers .= 'From: Mur de Brier <as@steppe.fr>' . "\r\n";
	$message2 = "" ; 
	$req = mysqldb::$id->query($q) ;
	if ($req->rowCount() > 0) {
		echo("Il y a des messages à envoyer. ") ;
		while ($row = $req->fetchObject()) {
			$d = explode(" ", $row->date) ;
			$j = explode("-", $d[0]) ;
			$h = explode(":", $d[1]) ;
			$message2 .= '<div><b>Le '.$j[2].'/'.$j[1].'/'.$j[0].' à '.$h[0].':'.$h[1].' , <a href="mailto:'.$row->mail.'">'.$row->prenom.' '.$row->nom.'</a> a posté le message suivant :</b></div><div>'.$row->texte.'</div><hr>' ;
		}
		$p = new personne() ;
		$p->select("WHERE newsletter = ".$level) ;
		while ($p->next()) {
			$m = mail($p->mail, "Newsletter du site familial des Brier",  $message.$message2, $headers) ;
			if ($m) echo ("Envoi du message à $p->mail. ") ;
			else echo ("Echec de l'envoi du message à $p->mail. ") ;
		}
	}
	else {
		echo ("Aucun message à envoyer pour le level $level.") ;
	}
}

//traitement quotidien
traitement() ;
 //traitement hebdomadaire - tous les lundis
if (date("N") == 1) traitement(2, "1 WEEK") ;
//traitement mensuel - tous les 1er du mois
if (date("j") == 1) traitement(3, "1 MONTH") ;
//traitement trimestriel
if (date("j-n") == "31-03") traitement(4, "3 MONTH") ;
if (date("j-n") == "30-06") traitement(4, "3 MONTH") ;
if (date("j-n") == "30-09") traitement(4, "3 MONTH") ;
if (date("j-n") == "31-12") traitement(4, "3 MONTH") ;
//traitement annuel - le 31/12 de chaque année
if (date("j-n") == "31-12") traitement(5, "1 YEAR") ;
?>