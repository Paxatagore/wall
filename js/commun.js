cetteAnnee 			= new Date().getFullYear() ;

wallApp = {
	"version":"0.0.1",
	"auteur":"Matthieu Duclos",
	"connexion":0,
	"mois":["", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	
	initialise:function() {
		//une personne est-elle déjà connectée ?
		if (localStorage.hasOwnProperty("personne" + parametres.suffixe)) {
			var personne = JSON.parse(localStorage["personne" + parametres.suffixe]) ;		
			if (personne.motdepasse != "") {
				console.log("Une personne est déjà connectée. Je la reprends.") ;		
				wallApp.tryConnexion(personne) ;
				wallApp.personneConnectee	= personne.num ; //on est connecté
				wallApp.personne			= '<a href="mailto:' + personne.mail + '" class="cliquable">' + personne.prenom + ' ' + personne.nom + '</a>' ; 
				wallApp.personneConnecteeAdmin	= personne.admin ;
				if (personne.admin == 1) $('menuAdmin').style.display = "inline" ;	//la personne est un administrateur => on affiche le lien d'administration
				$('authentifie').style.display 			= "block" ;			
				$('deconnect').observe("click", wallApp.disconnect) ;
				//a faire
				//$('info').observe("click", function() { displayManager.displayPartie(3) ; }) ;
				console.log("Achèvement de la fonction connexion.") ;
				return true ;
			}
			else {
				window.document.location = "index.php" ;
			}
		}
		else {
			window.document.location = "index.php" ;
		}
	},
	
	tryConnexion:function(p) {
		requeteURL = "nom=" + p.nom  + "&prenom=" + p.prenom + "&password=" + p.motdepasse ;
		new Ajax.Request(localisation + 'REST/authentification.php',	{
			"method" : "post",
			"postBody" : requeteURL + "&modeVerbeux=0",
				"onSuccess": function(requester) {
					reponse = requester.responseJSON ;
					console.log("Réponse reçue du serveur !") ;
					console.log(reponse) ;
					if (reponse.connexion == -2) {
						window.document.location = "index.php" ;
					}
					else if (reponse.connexion == -1) {
						window.document.location = "index.php" ;
					}
					else if (reponse.connexion == 1) {
						return true ;
					}
				}
		}) ; 
	},
	
	disconnect:function(e) {
		localStorage.removeItem("personne" + parametres.suffixe) ;
		window.document.location	= "index.php" ;
		return true ;
	}	//fonction de déconnexion
}

Event.observe(window, "load", wallApp.initialise, false) ;