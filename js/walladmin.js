/* administration du site */

wallAdmin = {
	
	nDemandesInscription:0,
	nUsers:0,
	fnl:["aucune", "quotidienne", "hebdomadaire", "mensuel", "trimestriel", "annuel", "immédiate"],

	initialise:function() {
		$('mainConteneur').style["max-width"] = "2000px" ;
		if (!localStorage.hasOwnProperty("personne" + parametres.suffixe)) {
			console.log("Personne n'est connecté... on renvoie sur la page index.") ;
			window.document.location="index.html" ;
			return false ;
		}
		wallAdmin.personne = JSON.parse(localStorage["personne"+parametres.suffixe]) ;
		if (wallAdmin.personne.admin == 0) {
			console.log("C'est une personne qui n'a pas les droits d'administration.") ;
			window.document.location="index.html" ;
			return false ;
		}
		$('authentifie').style.display = "block" ;
		console.log("Connexion acceptée.") ;
		//récupération des personnes temporaires
		new Ajax.Request(localisation + 'REST/index.php',	{
				"method" : "GET",
				"parameters" : "objet=personne_temp",
				"onSuccess": function(requester) {
						console.log("Chargement des personnes à valider.") ;
						var reponse = requester.responseJSON ;
						wallAdmin.nDemandesInscription = reponse.lenen ;
						wallAdmin.displaynDemandesInscription() ;
						if (reponse.lenen > 0) {
							string = [] ;
							for (var i = 0 ; i < reponse.lenen ; i++) {
								var nu = reponse.personne_temp[i] ;
								string.push('<tr id="newUser' + nu.num + '"><td>' + nu.nom + '</td><td>' + nu.prenom + '</td><td>' + nu.mail + '</td><td>' + nu.position + '</td><td><img src="../img/vert.png" onClick="javascript:wallAdmin.newUserValidate(' + nu.num + ')" /> <img src="../img/b_drop.png" onClick="javascript:wallAdmin.newUserRefuse(' + nu.num + ')" /></td></tr>') ;
							}
							$('newUsersBody').innerHTML = string.join("") ;
						}
						return true ;
					}
				}) ;
		//récupération des personnes
		
		$('mainConteneur').style.display = "block" ;		//on montre le contenu de la page
		$('admin1').style.display = "block" ;				//et la première section d'administration
		$('menu1').observe("click", function() {wallAdmin.showSection(1) ;}) ;
		$('menu2').observe("click", function() {
			wallAdmin.getUsers() ;
			wallAdmin.showSection(2) ;}) ;
		$('menu3').observe("click", function() {
			wallAdmin.getMessages(0, 30) ;			
			wallAdmin.showSection(3) ;}) ;
		$('menu4').observe("click", function() {wallAdmin.showSection(4) ;}) ;
		$('info3').observe("click", function() {window.document.location="wall.php" ;}) ;
	},
	
	getUsers:function() {
		new Ajax.Request(localisation + 'REST/index.php',	{
			"method" : "GET",
			"parameters" : "objet=personne",
			"onSuccess": function(requester) {
				console.log("Chargement des personnes.") ;
				var reponse = requester.responseJSON ;
				wallAdmin.nUsers = reponse.lenen ;
				//wallAdmin.displaynPersonnes() ;
				if (reponse.lenen > 0) {
					string = [] ;
					for (var i = 0 ; i < reponse.lenen ; i++) {
						var u = reponse.personne[i] ;
						var d = u.date_naissance.split("-") ;
						var dd = u.derniere_connexion.split(" ") ;
						var dd2 = dd[0].split("-") ;	
						string.push('<tr id="User' + u.num + '"><td><a href="mailto:' + u.mail + '">' + u.prenom + '</a></td><td><a href="mailto:' + u.mail + '">' + u.nom + '</a></td><td>' + u.adresse + '</td><td>' + u.ville + '</td><td>' + d[2] + "/" + d[1] + "/" + d[0] + '</td><td>' + u.lieu_naissance + '</td><td>' + wallAdmin.fnl[u.newsletter] + '</td><td>' + dd2[2] + "/" + dd2[1] + "/" + dd2[0]  + ' à ' + dd[1] + '</td></tr>') ; 
					}
					wallAdmin.displaynUsers() ;
					$('UsersBody').innerHTML = string.join("") ;
				}
				return true ;
			}
		}) ;
	},
	
	getMessages:function(m,n) {
		new Ajax.Request(localisation + 'REST/messages.php',	{
			"method" : "get",
			"parameters" : "categorie=1&borneinf="+m+"&bornesup="+n+"&modeVerbeux=0",
			"onSuccess": function(requester) {
				console.log("Le serveur a répondu.") ;
				var string = [] ;
				var json = requester.responseJSON ;
				for (var i = 0 ; i < json.lenen ; i++) {
					string.push(wallAdmin.traiteMessage(json.messages[i])) ;
				}
				$('messagesBody').innerHTML = string.join("") ;
				console.log("Le résultat a été affiché.") ;
				return true ;
			}
		}) ;
	},	//récupération des messages
	
	traiteMessage:function(m) {
		var d = m.date.split(" ") ;
		var dd = d[0] ;
		var dd2 = dd.split("-") ;
		var h = d[1] ;
		var h2 = h.split(":") ;
		return '<tr id="message' + m.num + '"><td>' + m.auteur + '</td><td>' + dd2[2] + '/' + dd2[1] + '/' + dd2[0] + ' ' + h2[0] + ':' + h2[1] + '</td><td>' + m.texte.slice(0, 60) + '...</td><td><img src="../img/b_drop.png" onClick="javascript:wallAdmin.removeMessage(' + m.num + ')" /></td></tr>' ;
	}, 	//traitement des messages
	
	showSection:function(n) {
		//on cache tout
		for (var i = 1 ; i < 5 ; i++) $('admin' + i).style.display = "" ;	
		//on montre la bonne section
		$('admin' + n).style.display = "block" ;
		return true ;	
	},
	
	/* validation des nouvelles demandes */
	
	displaynDemandesInscription:function() {
		return $('nDemandesInscription').innerHTML = wallAdmin.nDemandesInscription ;
	},
	
	displaynUsers:function() {
		return $('nUsers').innerHTML = wallAdmin.nUsers ;
	},
	
	newUserValidate:function(n) {
		new Ajax.Request(localisation + 'REST/nouvellePersonne2.php',	{
			"method" : "GET",
			"parameters":"objet=personne_temp&num=" + n,
			"onSuccess":function(requester) {
				var reponse = requester.responseJSON ;
				if (reponse.status == 1) {
					console.log("Réponse reçue. Validé.") ;
					$('newUser' + n).style.display = "none" ;
					wallAdmin.nDemandesInscription-- ;
					wallAdmin.displaynDemandesInscription() ;
					wallAdmin.nUsers++ ;
					wallAdmin.displaynUsers() ;	
					return true ;
				}
				else {
					console.log("Erreur !") ;
					return false ;
				}
			}
		}) ;
	},
	
	
	newUserRefuse:function(n) {
		new Ajax.Request(localisation + 'REST/index.php',	{
			"method" : "POST",
			"parameters":"objet=personne_temp&command=delete&num=" + n,
			"onSuccess":function(requester) {
				var reponse = requester.responseJSON ;
				if (reponse.status == 1) {
					console.log("Réponse reçue. Suppression validée.") ;
					$('newUser' + n).innerHTML = "" ;
					wallAdmin.nDemandesInscription-- ;
					wallAdmin.displaynDemandesInscription() 
					return true ;
				}
				else {
					console.log("Erreur !") ;
					return false ;
				}
			}
		}) ;
	},
	
	removeMessage:function(n) {
		new Ajax.Request(localisation + 'REST/index.php',	{
			"method" : "POST",
			"parameters":"objet=message&command=delete&num=" + n,
			"onSuccess":function(requester) {
				var reponse = requester.responseJSON ;
				if (reponse.status == 1) {
					console.log("Réponse reçue. Suppression validée.") ;
					$('message' + n).innerHTML = "" ;
					return true ;
				}
				else {
					console.log("Erreur !") ;
					return false ;
				}
			}
		}) ;	
	}
}


Event.observe(window, "load", wallAdmin.initialise, false) ;