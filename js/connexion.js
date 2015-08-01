var connexion = {

	initialise:function() {
		//une personne est-elle déjà en mémoire ?
		console.log(localStorage) ;
		$('connexionboutton').observe("click", connexion.tryToAuthentify) ;
		$('inscriptionbouton').observe("click", connexion.sinscrire) ;	//inscription		
		if (localStorage.hasOwnProperty("personne" + parametres.suffixe)) {
			var p = JSON.parse(localStorage["personne"+parametres.suffixe]) ;
			if (p.motdepasse != "") {
				console.log("Une personne est déjà connectée. Je la reprends.") ;
				return connexion.tryToConnect(p) ;
			}
			else {
				localStorage.removeItem("personne" + parametres.suffixe) ;			
			}
		}
		return true ;
	},
	
	tryToConnect:function(p) {
		console.log("Tentative d'authentification avec les paramètres locaux.") ;
		connexion.videMessagesErreur() ;
		requeteURL = "nom=" + p.nom  + "&prenom=" + p.prenom + "&password=" + p.motdepasse ;
		return connexion.tryConnexion(requeteURL) ;
	},
			
	tryToAuthentify:function(e) {
		e.stop() ;
		console.log("Tentative d'authentification.") ;
		connexion.videMessagesErreur() ;
		requeteURL = "nom=" + $('connexion_nom').value + "&prenom=" + $('connexion_prenom').value + "&password=" + $('connexion_password').value ;
		return connexion.tryConnexion(requeteURL) ;
	},
			
	tryConnexion:function(requete) {
		new Ajax.Request(localisation + 'REST/authentification.php',	{
			"method" : "post",
			"postBody" : requeteURL + "&modeVerbeux=0",
				"onSuccess": function(requester) {
					reponse = requester.responseJSON ;
					console.log("Réponse reçue du serveur !") ;
					console.log(reponse) ;
					if (reponse.connexion == -2) {
						//la personne n'existe pas
						connexion.videFormConnexion() ;	//on vide le formulaire
						$('messageConnexion-2').style.display = "block" ;	//on montre le message d'erreur correspondant
						if (localStorage.hasOwnProperty("personne" + parametres.suffixe)) localStorage.removeItem("personne" + parametres.suffixe) ;
						return false ;
					}
					else if (reponse.connexion == -1) {
						//mauvais mot de passe
						connexion.videFormConnexion() ;	//on vide le formulaire
						$('messageConnexion-1').style.display = "block" ;	//on montre le message d'erreur correspondant
						if (localStorage.hasOwnProperty("personne" + parametres.suffixe)) localStorage.removeItem("personne" + parametres.suffixe) ;
						return false ;
					}
					else if (reponse.connexion == 1) {
						//youpi, on est connecté !
						reponse.personne.motdepasse = $('connexion_password').value ;
						localStorage.setItem("personne"+parametres.suffixe, JSON.stringify(reponse.personne)) ;
						window.document.location = "wall.php" ;
						return true ;
					}
				}
		}) ; 
	},
	
	videMessagesErreur:function() {
		$('messageConnexion-1').style.display = "none" ;
		$('messageConnexion-2').style.display = "none" ;
		return true ;
	},
	
	videFormConnexion:function() {
		connexion.videMessagesErreur() ;			//on efface tous les messages d'erreur
		$('connexion_nom').value 		= "" ;
		$('connexion_prenom').value 	= "" ;
		$('connexion_password').value 	= "" ;
		return true ;
	},
	
	//inscription
	
	sinscrire:function(e) {
		e.stop() ;
		new Ajax.Request(localisation + 'REST/nouvellePersonne.php', {	
			"method":"post",
			"postBody":'objet=personne&num=0&nom=' + $('inscription_nom').value + '&prenom=' + $('inscription_prenom').value+ '&mail=' + $('inscription_mail').value + '&position=' + $('inscription_position').value,
			"onSuccess":function(requester) {
				var json = requester.responseJSON ;
				if (json.status == -1) {
					//cette personne existe déjà.
					$('messageConnexion-3').style.display = "block" ;
					return false ;
				}
				else if (json.status == 1) {
					$('tentativeinscription').style.display = "block" ;
					$('nonauthentifie').style.display = "none" ;
					return true ;
				}
				return true ;
			}
		}) ;
	}
}
	
Event.observe(window, "load", connexion.initialise, false) ;