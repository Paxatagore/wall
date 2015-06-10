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
		if ($p->num > 0) {
			$this->auteur 	= $p->prenom." ".$p->nom ;
			$this->mail 	= $p->mail ;
			return true ;
		}
		else {
			return false ;
		}
	}
	
}
?>
	