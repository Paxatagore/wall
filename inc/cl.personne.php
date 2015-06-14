<?php
class personne extends alpha {

	var $nom ;
	var $prenom ;
	var $mail ;
	var $date_naissance ;
	var $lieu_naissance ;
	var $adresse ;
	var $ville ;
	var $pays ;
	var $newsletter ;
	var $motdepasse ;
	var $admin ;
	var $derniere_connexion ;
	
	
	var $fields		= array("num", "nom", "prenom", "mail", "date_naissance", "lieu_naissance", "adresse", "ville", "pays", "newsletter", "motdepasse", "admin", "derniere_connexion") ;
	var $jsonliste 	= array("num", "nom", "prenom", "mail", "date_naissance", "lieu_naissance", "adresse", "ville", "pays", "newsletter", "admin", "derniere_connexion") ;
	var $eJson ;
	
	function beforetreat() {
		//la date de naissance
		$this->date_naissance = mysqldb::date_to_mysql($this->date_naissance) ;
		return 1 ;
	}
	
	function checkpwd($test) {
		if (md5($test) == $this->motdepasse) return true ;
		else return false ;
	}
}
?>