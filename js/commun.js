cetteAnnee 			= new Date().getFullYear() ;

wallApp = {
	"version":"0.0.1",
	"auteur":"Matthieu Duclos",
	"connexion":0,
	"mois":["", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],

}


/*objet coreObjet */

function coreObjet (nom) {
	this.objetNom = nom ;
	this.IDtable = "liste" + this.objetNom.capitalize() + "s" ;
	this.IDn = "n" + this.objetNom.capitalize() + "s" ;
	this.IDrecherche = "boiteRechercher" + nom + "Champ" ;
	this.donnees = [] ;
	this.charge = 0 ;
	this.elementTri = "nom" ; 
	this.parametresRequest = "" ;
	
	//fonctions destinées à vider l'objet
	this.vide = function() {
		this.donnees.splice(0, this.length) ;
		this.charge = 0 ;
		return 1 ;
	} ;
	
	this.videEfface = function() {
		this.vide() ;
		$(this.IDtable).innerHTML = '' ;
		$(this.IDn).innerHTML = '' ;		
		return 1 ;
	} ;

	//fonctions destinées à nourrir l'objet
	this.requeteObtient = function() {
		var that = this ;
		new Ajax.Request(localisation + 'REST/index.php?objet=' + this.objetNom + this.parametresRequest + '&verbose=' + verbose,
			{"method" : "GET",
			"onSuccess" :  function(requester) {
				that.donnees = requester.responseJSON[that.objetNom] ;
				that.charge = 1 ;		//indicateur de chargement
				CTFA.initialise2() ;	//suiteInitialisation() ;
				return that.donnees.length ;
			}
		}) ;
		return 1 ;
	} ;
	
	this.setDonnees = function(datas) {
		this.donnees 	= datas || [] ;
		this.charge 	= 1 ;		//indicateur de chargement
		this.corrige() ;			//fonction de correction des données
		this.affiche() ;
		return this.donnees.length ;
	} ;
	
	this.traite = function () {
		this.corrige() ;
		this.affiche() ;
	} ;
	
	this.triEtCorrige = function() {
		this.sort() ;
		this.corrige() ;
	} ;
	
	this.corrige = function() {
		this.each(this.corrigeUne) ;
	} ;
	
	this.corrigeUne = function() {
		return 1 ;
	} ;

	this.corrige2 = function() {
		//fonction de correction des données - fonction globale, exécutée au chargement des données
		this.sort() ;
		if (this.condition() == 0) return 0 ;
		this.each(this.corrigeUne) ;
		return 1 ;
	} ;

	/* Fonction affiche
	affiche : se borne à lancer l'affichage individuel de chaque donnée
	affichePL : affiche une collection, pour un tableau, avec un index de premières lettres
	*/

	this.affiche = function() {
		if (this.condition() == 0) return 0 ;
		this.each(this.afficheUne) ;
		return 1 ;
	} ;

	this.affichePL = function() {
		//affiche la collection & la liste des premières lettres
		var chaine = "" ;
		var chaineDesLiens = "" ;
		var premiereLettre = "" ;
		for (var i = 0 ; i < this.donnees.length ; i++) {
			if (this.donnees[i][this.elementTri][0].toUpperCase() != premiereLettre) {
				premiereLettre = this.donnees[i][this.elementTri][0].toUpperCase() ;
				chaineDesLiens += ' - <span onClick="$(\'' + this.objetNom + this.donnees[i].num + '\').scrollTo();" class = "cliquable">' + premiereLettre + "</span>" ;
			}
			chaine += this.afficheUne(this.donnees[i]) ;
		}
		chaineDesLiens = chaineDesLiens.slice(3) ;
		$(this.IDtable).innerHTML = chaine ;
		$(this.IDn).innerHTML = this.donnees.length ;
		$(this.objetNom + 'ParLettres').innerHTML = chaineDesLiens ;
		if (this.objetNom == "tag") lesLiensTT.affiche() ;
		return 1 ;
	} ;

		
	this.condition = function() {
		return 1 ;
	} ;
 
	/* fonction de tri */ 

	this.sort = function() {
		this.donnees.sort(fonctionTri(this.elementTri)) ;
		return 1 ;
	} ;

	/*fonction d'itération */
		
	this.each = function(iterateur) {
		//itération
		for(var i = 0 ; i < this.donnees.length ; i++) {
			iterateur(this.donnees[i]) ;
		}
		return 1 ;
	} ;
		
	/*fonction getBy Id */
	this.getById = function(x) {
		for (var i = 0 ; i < this.donnees.length ; i++) {
			if (this.donnees[i].num == x) {
				return this.donnees[i] ;
			}
		}
		return false ;
	} ;

	/*Fonction get Id */
	this.getId = function(x) {
		for (var i = 0 ; i < this.donnees.length ; i++) {
			if (this.donnees[i].num == x) {
				return i ;
			}
		}
		return false ;
	} ;
	
	/*Fonctions get by name */
	this.getByName = function(nom) {
		for (var i = 0 ; i < this.donnees.length ; i++) {
			if (this.donnees[i].nom.toLowerCase() == nom.toLowerCase()) {
				return this.donnees[i] ;
			}
		}
		return false ;
	} ;

	
	/* modification */
	this.sendForm = function(e) {
		Event.stop(e) ;
		messager.affiche("Envoi en cours.") ;
		if (this.pretraitementForm()) {
			//on vérifie que la fonction de prétraitement ne détecte rien d'anormal.
			$('edition').fade() ;
			var that = this ;
			new Ajax.Request(localisation +  'REST/index.php',	{
				"method" : "post",
				"postBody" : $('edition').serialize(),
				"onSuccess": function(requester) {
					that.modifie(requester.responseJSON[that.objetNom]) ;
					messager.fade() ;
				}
			}) ;
		}
	} ; //sendForm
	
	this.pretraitementForm = function() {
		//fonction de pré traitement du formulaire
		return 1 ;
	}
		
	this.modifie = function(oJson) {
		//ajoute ou modifie l'un des éléments de la collection
		var ok = 0 ;
		this.corrigeUne(oJson) ;	//correction préliminaire
		for (var i = 0 ; i < this.donnees.length ; i++) {
			if (this.donnees[i].num == oJson.num) {
				this.donnees[i] = oJson ;
				i == this.length ;
				ok = 1 ;
			}
		}
		if (ok == 0) {
			this.ajoute(oJson) ;
		}
		this.sort() ;
		this.affiche() ;
		if ($(this.objetNom + oJson.num)) {
			$(this.objetNom + oJson.num).scrollTo() ;
			new Effect.Highlight(this.objetNom + oJson.num) ;
		}
		return 1 ;
	} ;
	
	this.ajouteDonnees = function(oJson) {
		var ajoute = 0 ;
		for (var i = 0 ; i < oJson.length ; i++) {
			d = oJson[i] ;
			this.corrigeUne(d) ;
			var ok = 0 ;
			for (var j = 0 ; j < this.donnees.length ; j++) {
				if (this.donnees[j].num == d.num) {
					i == this.length ;
					ok = 1 ;
				}	
			}
			if (ok == 0) {
				d.contexte = 1 ;
				this.ajoute(d) ;
				ajoute++ ;
			}
		}
		return ajoute ;
	} ;
	
	this.ajoute = function(oJson) {
		//fonction qui ajoute un élément à la pile de données à partir d'un objet JSON
		this.donnees.push(oJson) ;
		return 1 ;
	} ;

	/* suppression : on tue la donnée x */
	this.reqSupprime = function(num) {
		messager.affiche("Suppression en cours...") ;
		that = this ;
		new Ajax.Request(localisation + 'REST/index.php', {
			method:"post",
			"postBody":'command=delete&objet=' + this.objetNom + '&num=' + num + '&verbose=' + verbose,
			"onSuccess" : function(requester) {
				messager.fade("Réponse du serveur.") ;
				console.log(requester) ;
				if (requester.responseJSON.status == "1") {
					if (that.supprime(num) > 0) {
						messager.fade("Suppression effective.") ;
					}
					else {
						messager.fade("Erreur dans le processus interne. L'objet est cependant bien supprimé dans la base. ") ;
					}
				}
				else {
					messager.fade("Echec dans la suppression.") ;
				}
				return 1 ;
			}}) ;	
		return 0 ;
	} ;

	this.supprime = function(x) {
		//supprime l'un des éléments de la collection
		for (var i = 0 ; i < this.donnees.length ; i++) {
			if (this.donnees[i].num == x) {
				$(this.objetNom + this.donnees[i].num).fade() ;
				this.donnees[i] = {} ;
				i = this.donnees.length ;
				return 1 ;
			}
		}
		return 0 ;
	} ;
	
	//recherche
	this.recherche = function() {
		//permet d'afficher certaines données seulement à partir du mot clé. Utile pour les tags, les fonctions, les dynasties.
		var motCle = $(this.IDrecherche).value.toLowerCase() ;
		if (motCle == "") {
			this.each(function(o) { o.visible = 1 ; }) ;
		}
		else {
			this.each(function(o) { 
				if (o.nom.toLowerCase().indexOf(motCle) > -1) o.visible = 1 ;
				else o.visible = 0 ;
			}) ;
		}
		return this.affichePL() ;
	} ;	//recherche
}