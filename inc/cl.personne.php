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
	var $latitude ;
	var $longitude ; 
	var $newsletter ;
	var $motdepasse ;
	var $admin ;
	var $derniere_connexion ;
	
	
	var $fields		= array("num", "nom", "prenom", "mail", "date_naissance", "lieu_naissance", "adresse", "ville", "pays", "latitude", "longitude", "newsletter", "motdepasse", "admin", "derniere_connexion") ;
	var $jsonliste 	= array("num", "nom", "prenom", "mail", "date_naissance", "lieu_naissance", "adresse", "ville", "pays", "latitude", "longitude", "newsletter", "admin", "derniere_connexion") ;
	var $eJson ;
	
	function beforetreat() {
		//la date de naissance
		$this->date_naissance = mysqldb::date_to_mysql($this->date_naissance) ;
		//géoencodage de l'adresse
		if ($this->ville != "") {
			$string = str_replace (" ", "+", urlencode($this->ville."+".$this->adresse)) ;
			$details_url = "http://maps.googleapis.com/maps/api/geocode/json?address=".$string."&sensor=false" ;
			$ch = curl_init() ;
			curl_setopt($ch, CURLOPT_URL, $details_url) ;
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1) ;
			$response = json_decode(curl_exec($ch), true) ;
			if ($response['status'] == 'OK') {
				$geometry = $response['results'][0]['geometry'] ;
				$this->longitude = $geometry['location']['lng'] ;
				$this->latitude = $geometry['location']['lat'] ;
			}
			//$eJson = '{"string":"'.$string.'", "response":"'.$response.'"}' ;
		}
		return 1 ;
	}
	
	function checkpwd($test) {
		if (md5($test) == $this->motdepasse) return true ;
		else return false ;
	}
}
?>