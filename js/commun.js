cetteAnnee 			= new Date().getFullYear() ;

wallApp = {
	"version":"0.0.1",
	"auteur":"Matthieu Duclos",
	"connexion":0,
	"mois":["", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
	
	initialise:function() {
		//une personne est-elle déjà connectée ?
		if (localStorage.hasOwnProperty("personne" + parametres.suffixe)) {
			console.log("Une personne est déjà connectée. Je la reprends.") ;
			var personne = JSON.parse(localStorage["personne" + parametres.suffixe]) ;
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
	},
	
	disconnect:function(e) {
		localStorage.removeItem("personne" + parametres.suffixe) ;
		window.document.location	= "index.php" ;
		return true ;
	}	//fonction de déconnexion
}

Event.observe(window, "load", wallApp.initialise, false) ;