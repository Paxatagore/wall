<?php

function __autoload($class_name) {
    (@require_once "/home/asophie/www/deBrier/wall/inc/cl.".$class_name.".php") or die("Impossible de trouver ".$class_name) ;
}
require_once("/home/asophie/www/deBrier/wall/local/database.php") ;		//les coordonnées de connexion à mysql
require_once("/home/asophie/www/deBrier/wall/inc/cl.alpha.php") ;		//la classe alpha

//Connexion mysql
mysqldb::instance($bddserver, $bdduser, $bddpassword, $bdddatabase) ;


function traitement($level = 1, $codeSQL="1 DAY") {
	//définition du message
	$passage_ligne 	= "\r\n" ;
	$boundary 		= "-----=".md5(rand()) ;
	$sujet 			= "Newsletter du site familial des Brier" ;
	
	//destinataires
	$p = new personne() ;
	$p->select("WHERE newsletter = ".$level) ;
	$destinataires = array() ;
	while ($p->next()) {
		$destinaires[] = $p->mail ;
	}
	$destinataires = implode(", ", $destinaires) ;
	
	// Création du header de l'e-mail
	$header = 'From: "Mur de Brier" <as@steppe.fr>'.$passage_ligne ;
	$header.= 'Reply-to: "Mur de Brier" <as@steppe.fr>'.$passage_ligne ;
	$header.= 'MIME-Version: 1.0'.$passage_ligne ;
	$header.= "Bcc: ".$destinataires.$passage_ligne ;
	$header.= "X-Mailer: PHP/".phpversion().$passage_ligne ;
	$header.= 'Content-Type: text/html; charset=UTF-8'.$passage_ligne ;
	
	//contenu
	$q = "SELECT DISTINCT message.*, personne.nom, personne.prenom, personne.mail FROM message, personne WHERE personne.num = message.auteur AND date BETWEEN DATE_SUB(NOW(), INTERVAL ".$codeSQL.") AND NOW() ORDER BY DATE ASC" ;
	$req = mysqldb::$id->query($q) ;
	$corpsHTML = "" ;
	$corpsTxt = "" ;
	if ($req->rowCount() > 0) {
		echo("Il y a des messages à envoyer. ") ;
		while ($row = $req->fetchObject()) {
			$d = explode(" ", $row->date) ;
			$j = explode("-", $d[0]) ;
			$h = explode(":", $d[1]) ;
			$corpsHTML .= '<div><b>Le '.$j[2].'/'.$j[1].'/'.$j[0].' à '.$h[0].':'.$h[1].' , <a href="mailto:'.$row->mail.'">'.$row->prenom.' '.$row->nom.'</a> a posté le message suivant :</b></div><div>'.$row->texte.'</div><hr>'.$passage_ligne ;
			$corpsTxt .= 'Le '.$j[2].'/'.$j[1].'/'.$j[0].' à '.$h[0].':'.$h[1].' , '.$row->prenom.' '.$row->nom.' a posté le message suivant : \n'.$row->texte.$passage_ligne ;
		}
		$corpsHTML 	= wordwrap($corpsHTML, 70, "\r\n") ;
		$corpsTxt 	= wordwrap($corpsTxt, 70, "\r\n") ;

		
		$bottomtxt		= "Vous êtes abonné à la liste d\'informations du site de la famille Brier. Voici les nouveaux messages publiés depuis votre dernière livraison. Le rythme des mails que vous recevez dépend de votre abonnement - vous pouvez le modifier directement sur le site internet (https://www.steppe.fr/deBrier/wall)." ;
		$bottomHtml		= '<p></p>Vous êtes abonné à la liste d\'informations du site. Voici les nouveaux messages publiés depuis votre dernière livraison. Le rythme des mails que vous recevez dépend de votre abonnement - vous pouvez le modifier directement <a href="https://www.steppe.fr/deBrier/wall">sur le site</a>.<p></p>' ;
		$bottomtxt 		= wordwrap($bottomtxt, 70, "\r\n") ;
		$bottomHtml 	= wordwrap($bottomHtml, 70, "\r\n") ;

		//=====Ajout du message au format HTML
		$message = $passage_ligne."<html><head></head><body>".$corpsHTML.$bottomHtml."</body></html>".$passage_ligne ;
		
		$m = mail("nous.debrier@outlook.com", $sujet, $message) ;
		if ($m) echo ("Envoi du message à $destinataires. $message") ;
		else echo ("Échec de l'envoi du message à $p->mail. $message") ;
		$m2 = mail("m@steppe.fr", "Envoi de la NL des Brier avec du contenu", $message) ;
	}
	else {
		echo ("Aucun message à envoyer pour le level $level.") ;
		$m2 = mail("m@steppe.fr", "Newsletter", "Pas de contenu de la NL des Brier") ;
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