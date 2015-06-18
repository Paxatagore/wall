<?php
class message extends alpha {

	var $categorie ;
	var $texte ;
	var $pere ; 
	var $date ;
	var $auteur ;
	
	var $mail ;
	
	var $fields		= array("num", "categorie", "texte", "pere", "date", "auteur") ;
	var $jsonliste 	= array("num", "categorie", "texte", "pere", "date", "auteur", "mail") ;
	var $eJson ;
	
	function beforetreat() {
		//définition de la date
		$this->date = date('Y-m-d H:i:s') ;
		return true ;
	}
	
	function aftertreat() {
		$p = new personne() ;
		$p->get($this->auteur) ;
		if ($p->num < 1) return false ; 
		$this->auteur 	= $p->prenom." ".$p->nom ;
		$this->mail 	= $p->mail ;
		//mailing
		$p2 = new personne() ;
		$p2->select("WHERE newsletter = 6") ;
		$message = '<html><head><title>Un nouveau message sur le site familial des Brier</title></head><body>' ;
		$message3 = '<p></p>Vous êtes abonné à la liste d\'informations du site. Voici les nouveaux messages publiés depuis votre dernière livraison. Le rythme des mails que vous recevez dépend de votre abonnement - vous pouvez le modifier directement <a href="https://www.steppe.fr/deBrier/wall">sur le site</a>.<p></p>' ;
		$headers  = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
		$headers .= 'From: Mur de Brier <as@steppe.fr>' . "\r\n";
		$message2 = '<div><b>'.$p->prenom.' '.$p->nom.' vient de poster le message suivant :</b></div><div>'.$this->texte.'</div><hr>' ;
		while ($p2->next()) {
			$m = mail($p2->mail, "Nouveau message sur le site familial des Brier",  $message.$message2.$message3, $headers) ;
		}
		return true ;
	}
	
}
?>
	