<?php

class photo extends alpha {

	var $nom ;
	var $auteur ;
	var $legende ;
	var $album ;
	var $note ;
	
	var $fields		= array("num", "nom", "auteur", "legende", "album", "note") ;
	var $jsonliste 	= array("num", "nom", "auteur", "legende", "album", "note") ;
	var $eJson ;

	public function delete() {
		//suppression des fichiers
		$a = new album() ;
		$a->get($this->album) ;
		$url 	= '../photos/'.$a->nom."/" ;
		unlink($url.'miniatures/'.$this->nom) ;
		unlink($url.'photos/'.$this->nom) ;
		unlink($url.'stockage/'.$this->nom) ;
		//et de la base de donnée
		return parent::delete() ;
	}

}