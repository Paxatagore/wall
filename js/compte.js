/* 
De Brier - le mur
début des travaux : 24/5/2015
*/

debug = 0 ;		//mode débugage - on chunte la connexion
verbose = 0 ;


var monCompte = {
	initialise:function() {
		//une personne est-elle déjà connectée ?
		if (localStorage.hasOwnProperty("personne" + parametres.suffixe)) {
			var personne = JSON.parse(localStorage["personne"+parametres.suffixe]) ;	
			monCompte.setPays(personne.pays) ;
			//le formulaire de modification
			$('monCompte_num').value				= personne.num ;
			$('monCompte_nom').value				= personne.nom ;
			$('monCompte_prenom').value				= personne.prenom ;
			$('monCompte_mail').value				= personne.mail ;
			$('monCompte_newsletter-' + personne.newsletter).selected = true ;
			if (personne.date_naissance != "0000-00-00") {
				var dn = personne.date_naissance.split("-") ;
				$('monCompte_datenaissance').value	= dn[2] + "/" + dn[1] + "/" + dn[0] ;
			}
			else {
				$('monCompte_datenaissance').value	= "" ;
			}
			$('monCompte_lieunaissance').value		= personne.lieu_naissance ;
			$('monCompte_adresse').value			= personne.adresse ;
			$('monCompte_ville').value				= personne.ville ;
		}
		else {
			window.document.location = "index.php" ;
		}
		//liens et boutons de la partie "mon compte"
		$('monCompte_boutton').observe("click", monCompte.envoiemonCompte) ;
		$('monMotdePasse_bouton').observe("click", monCompte.modifiepass) ;
	},
	
	envoiemonCompte:function(e) {
		e.stop() ;
		new Ajax.Request(localisation + 'REST/index.php',	{
			"method" : "post",
			"parameters" : 'objet=personne&num=' + $('monCompte_num').value + '&nom=' + $('monCompte_nom').value + '&prenom=' + $('monCompte_prenom').value + '&mail=' + $('monCompte_mail').value + '&newsletter=' + $('monCompte_newsletter').value + '&date_naissance=' + $('monCompte_datenaissance').value + '&lieu_naissance=' + $('monCompte_lieunaissance').value + '&adresse=' + $('monCompte_adresse').value + '&ville=' + $('monCompte_ville').value + '&pays=' + $('monCompte_pays').value,
			"onSuccess": function(requester) {
				console.log("Le serveur a répondu.") ;
				var json = requester.responseJSON ;
				if (json.status == 1) {
					$('messagemonCompte-1').style.display	= "block" ;
					$('personneConnectee').innerHTML		= json.personne.prenom + " " + json.personne.nom ;
					var personne = JSON.parse(localStorage["personne"+parametres.suffixe]) ;
					personne.nom = $('monCompte_nom').value ;
					personne.prenom = $('monCompte_prenom').value ;
					personne.mail = $('monCompte_mail').value ;
					personne.newsletter = $('monCompte_newsletter').value ;
					personne.datenaissance = $('monCompte_datenaissance').value ;
					personne.lieunaissance = $('monCompte_lieunaissance').value ;
					personne.adresse = $('monCompte_adresse').value ;
					personne.ville = $('monCompte_ville').value ;
					personne.pays = $('monCompte_pays').value ;
					localStorage.setItem("personne"+parametres.suffixe, JSON.stringify(personne)) ;
					return true ;
				}
				else {
					$('messagemonCompte-2').style.display	= "block" ;
					return false ;
				}
			}
		}) ;
		return true ;
	},
	
	modifiepass:function(e) {
		e.stop() ;
		monCompte.effacepassemessage() ;
		if ($('monMotdePasse_pw2').value != $('monMotdePasse_pw3').value) {
			//le nouveau mot de passe n'a pas été rentré deux fois de la même façon
			$('messagemonCompte-3').style.display = "block" ;
			monCompte.videpasse() ;
			console.log("Erreur de coïncidence entre les deux mots de passe nouveaux.") ;
			return false ;
		}
		new Ajax.Request(localisation + 'REST/index.php',	{
			"method" : "post",
			"parameters":'objet=personne&command=password&num=' + $('monCompte_num').value + '&ancien=' + $('monMotdePasse_pw1').value + '&nouveau=' + $('monMotdePasse_pw2').value,
			"onSuccess":function(requester) {
				console.log("Le serveur a répondu.") ;
				var json = requester.responseJSON ;
				if (json.status == 1) {
					//c'est bon !
					$('messagemonCompte-4').style.display = "block" ;
					monCompte.videpasse() ;
					var personne = JSON.parse(localStorage["personne"+parametres.suffixe]) ;
					personne.motdepasse = $('monMotdePasse_pw2').value ;
					localStorage.setItem("personne"+parametres.suffixe, JSON.stringify(personne)) ;
					return true ;
				}
				else if (json.status == -4) {
					//on s'est trompé dans l'ancien mot de passe
					$('messagemonCompte-5').style.display = "block" ;
					monCompte.videpasse() ;
					return false ;
				}
				else if (json.status == -5) {
					//erreur dans la base.
					$('messagemonCompte-6').style.display = "block" ;
					monCompte.videpasse() ;
					return false ;
				}
				return false ;
			}
		}) ;
		return true ;
	},
	
	effacepassemessage:function() {
		//on efface les messages éventuels
		$('messagemonCompte-3').style.display = "" ;
		$('messagemonCompte-4').style.display = "";
		$('messagemonCompte-5').style.display = "";
		$('messagemonCompte-6').style.display = "";
	},
	
	videpasse:function() {
		//on vide le formulaire
		$('monMotdePasse_pw1').value = '' ;
		$('monMotdePasse_pw2').value = '' ;
		$('monMotdePasse_pw3').value = '' ;
		return true ;
	},
	
	//gestion des pays
	
	setPays:function(pays) {
		new Ajax.Request(localisation + 'REST/index.php', 
			{"method":"GET",
			"parameters":"objet=pays",
			"onSuccess":function(requester) {
				console.log("Les pays ont bien été chargés. Je dois définir le pays " + pays) ;
				var json = requester.responseJSON ;
				var string = ['<option id="monCompte_pays_0 " value="0">autre</option>'] ;
				console.log(json) ;
				for (var i = 0 ; i < json.lenen ; i++) {
					if (json.pays[i].num == pays) {
						string.push('<option selected id="monCompte_pays_' + i + '" value="' + json.pays[i].num + '">' + json.pays[i].nom + '</option>') ;
					}
					else {
						string.push('<option id="monCompte_pays_' + i + '" value="' + json.pays[i].num + '">' + json.pays[i].nom + '</option>') ;
					}
				}
				$('monCompte_pays').innerHTML = string.join("") ;
				
				$('monCompte_newsletter-' + reponse.personne.newsletter).selected = true ;
			}
		}) ;
	}
}

Event.observe(window, "load", monCompte.initialise, false) ;