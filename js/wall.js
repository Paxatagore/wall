/* 
De Brier - le mur
début des travaux : 24/5/2015
*/

debug = 0 ;		//mode débugage - on chunte la connexion
verbose = 0 ;


var wall = {
	initialise:function() {
		//une personne est-elle déjà connectée ?
		if (localStorage.hasOwnProperty("personne" + parametres.suffixe)) {
			console.log("Une personne est déjà connectée. Je la reprends.") ;
			$('authentifie').style.display 			= "block" ;
			displayManager.displayPartie(0) ;
			wall.connexion(JSON.parse(localStorage["personne"+parametres.suffixe])) ;
		}
		else {
			window.document.location = "index.html" ;
		}
		$('envoimessageboutton').observe("click", function (e) {
			e.stop() ;
			$('envoimessageboutton').style.display = "none" ;
			new Ajax.Request(localisation + 'REST/index.php', {
				"method": "post",
				//"postBody":"objet=message&num=0&categorie=1&auteur=" + wall.personneConnectee + "&texte=" + $('message_text').value,
				"postBody":"objet=message&num=0&categorie=1&auteur=" + wall.personneConnectee + "&" + $('message_text').serialize(),
				"onSuccess":function(requester) {
					console.log("J'ai reçu une réponse du serveur.") ;
					var json = requester.responseJSON ;
					$('lemur').insert({"top":wall.traiteMessage(json.message)}) ;
					$('envoimessageboutton').style.display 	= "" ;
					$('message_text').value					= "" ;
					console.log("J'ai affiché le résultat") ;
					return true ;
				}
			}) ;
		}) ;
		$('deconnect').observe("click", wall.disconnect) ;
		$('info').observe("click", function() { displayManager.displayPartie(3) ; }) ;
		//liens et boutons de la partie "mon compte"
		$('linkMonCompte').observe("click", function() { displayManager.displayPartie(1) ;}) ;
		$('menuFamille').observe("click", function() { displayManager.displayPartie(5) ;}) ;
		$('monCompte_boutton').observe("click", wall.envoiemonCompte) ;
		$('monMotdePasse_bouton').observe("click", wall.modifiepass) ;
	},
	
	connexion:function(personne) {
		//youpi, on est connecté !
		wall.setPays(personne.pays) ;
		$('personneConnectee').innerHTML		= personne.prenom + " " + personne.nom ;
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
		wall.personneConnectee					= personne.num ; //on est connecté
		if (personne.admin == 1) $('menuAdmin').style.display = "inline" ;	//la personne est un administrateur => on affiche le lien d'administration
		$('menuAdmin').observe("click", function() { window.document.location = "admin.html" ;}) ;
		$('menuMur').observe("click", function() { displayManager.displayPartie(0) ; }) ;
		$('menuPhoto').observe("click", function() { wall.affichePhotos() ;	}) ;
		$('menuReunion').observe("click", function() { displayManager.displayPartie(2) ;} ) ;
		wall.chargeMessage() ;
		console.log("Achèvement de la fonction connexion.") ;
		return true ;
	},
	
	chargeMessage:function() {
		new Ajax.Request(localisation + 'REST/messages.php',	{
			"method" : "get",
			"parameters" : "categorie=1&modeVerbeux=0",
			"onSuccess": function(requester) {
				console.log("Le serveur a répondu.") ;
				var string = [] ;
				json = requester.responseJSON ;
				for (var i = 0 ; i < json.lenen ; i++) {
					string.push(wall.traiteMessage(json.messages[i])) ;
				}
				$('lemur').innerHTML = string.join("") ;
				console.log("Le résultat a été affiché.") ;
				return true ;
			}
		}) ;
	},
	
	traiteMessage:function(m) {
		var d = m.date.split(" ") ;
		var dd = d[0] ;
		var dd2 = dd.split("-") ;
		var h = d[1] ;
		var h2 = h.split(":") ;
		var texte = m.texte.split("\n").join('<br/>') ;
		if (dd == "2015-05-01") return '<div id="message_' + m.num + '" class="message"><div class="messageCorps">' + texte + '</div></div>' ;
		else return '<div id="message_' + m.num + '" class="message"><div class="messageTete">Le ' + dd2[2] + " " + wallApp.mois[eval(dd2[1])] + " " + dd2[0] + ' à ' + h2[0] + 'h' + h2[1] + ', <a href="mailto:' + m.mail + '">' + m.auteur + '</a> a posté le message suivant :</div><div class="messageCorps">' + texte + '</div></div>' ;
	},
	
	displayinfo:function(e) {
		$('authentifie').style.display 			= "none" ;
		$('partieInformations').style.display	= "block" ;
		return true ;
	},
	
	displaynoinfo:function(e) {
		$('authentifie').style.display 			= "block" ;
		$('partieInformations').style.display			= "none" ;
		return true ;
	},
	
	/* fonctions de gestion de l'espace "Mon Compte" */
	
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
		wall.effacepassemessage() ;
		if ($('monMotdePasse_pw2').value != $('monMotdePasse_pw3').value) {
			//le nouveau mot de passe n'a pas été rentré deux fois de la même façon
			$('messagemonCompte-3').style.display = "block" ;
			wall.videpasse() ;
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
					wall.videpasse() ;
					var personne = JSON.parse(localStorage["personne"+parametres.suffixe]) ;
					personne.motdepasse = $('monMotdePasse_pw2').value ;
					localStorage.setItem("personne"+parametres.suffixe, JSON.stringify(personne)) ;
					return true ;
				}
				else if (json.status == -4) {
					//on s'est trompé dans l'ancien mot de passe
					$('messagemonCompte-5').style.display = "block" ;
					wall.videpasse() ;
					return false ;
				}
				else if (json.status == -5) {
					//erreur dans la base.
					$('messagemonCompte-6').style.display = "block" ;
					wall.videpasse() ;
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
	},
	
	disconnect:function(e) {
		localStorage.removeItem("personne"+parametres.suffixe) ;
		$('personneConnectee').innerHTML		= "" ;
		window.document.location	= "index.html" ;
		return true ;
	},	//fonction de déconnexion
	
	/* galerie photos */
	
	/* définition : les photos sont stockées des galeries, affichées par défaut dans un tableau.
	quand on les affiche en grand, cela se passe dans l'album. */
	
	affichePhotos:function() {
		console.log("Affichage des albums photos.") ;
		wall.album = 0 ;		//0 - l'album n'est pas affiché ; 1 - il est affiché.
		new Ajax.Request(localisation + "REST/galeries.php", {
			"method":"GET",
			"onSuccess":function(requester) {
				console.log(requester.responseJSON.galeries) ; 
				wall.galeries = requester.responseJSON.galeries
				return wall.affichePhotos2(wall.galeries) ;
				
			}
		}) ;	//lance une requête AJAX sur galeries.php, qui retourne un tableau de la liste des galeries à afficher.
		return 1 ;
	},
				
	affichePhotos2:function(galeries) {	
		//affiche les album photos et fournit les fonctions nécessaires au dépôt de photos.
		$('albums_photos').innerHTML = "" ;			//on vide l'affichage en cours.
		displayManager.displayPartie(4) ; 			//on affiche la partie "photos" du site
		var string = [] ;
		for (var i = 0 ; i < galeries.length ; i++) {	//on prend une à une chacune des galeries.
			var g = galeries[i].nom ;
			var gphotos = galeries[i].contenu ;
			console.log(g) ;
			string.push('<h3>' + g + '</h3><div class="album" id="photos_' + g + '"><table id="galerie_' + g + '" nElement = "' + gphotos.length + '">') ;			
			var k = 0 ;
			for (var j = 0 ; j < gphotos.length ; j++) {
				if (!k) string.push('<tr>') ;
				string.push('<td><img src="../photos/' + g + '/miniatures/' + gphotos[j] + '" alt="' + gphotos[j] + '" onClick="javascript:wall.afficheUnePhoto(' + i + ', ' + j + ')"></td>') ;
				k++ ;
				if (k >= 3) {
					string.push('<tr>') ;
					k = 0 ;
				}
			}
			if (k == 0) string.push('<tr>') ;
			string.push('<td><div class="dropArea" id="dropArea_' + g + '"><p></p>Déposez ici une nouvelle photo.</div></td></tr></table></div>') ;
		} 
		$('albums_photos').innerHTML = string.join("") ;
		for (var i = 0 ; i < galeries.length ; i++) {
			var g = galeries[i].nom ;
			var evt = function (g) {
				$('dropArea_' + g).observe("drop", function(e) {handleDrop(e, g) ;}) ;
				$('dropArea_' + g).observe("dragover", function(e) {handleDrop(e, g) ;}) ;//on ajoute deux Observer, pour le drag & drop.
			} ;
			evt(g) ;
		}
		
		function handleDragOver(event, g) {
			event.stop();
			$('dropArea_' + g).className = 'hover';
        }
		
		// glisser déposer
		function handleDrop(e, g) {
			e.stop() ;
			filelist = e.dataTransfer.files ;
			if (!filelist || !filelist.length) return ;
			list = [] ;
			for (var i = 0; i < filelist.length && i < 5; i++) {
				list.push(filelist[i]);
			}
			if (list.length) {
				$('dropArea_'+ g).className = 'uploading';
				var nextFile = list.shift();
				uploadFile(nextFile, g) ;
			} 
			else {
				dropArea.className = '';
			}
		}
		
		 // transfert du fichier
		function uploadFile(file, g) {
			if (file.size >= 1262144) { // 1Mo
				$('dropArea_' + g).innerHTML = "Fichier trop lourd !" ;
				return false ;
			}
			// création de l'objet XMLHttpRequest
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '../AJAX/postphotos.php?galerie=' + g) ;
			xhr.onload = function() {
				$('dropArea_' + g).innerHTML = "Chargement terminé...." ;
				wall.affichePhotos() ;
			} ;
			xhr.onerror = function() {
				$('dropArea_' + g).innerHTML = "Erreur." ;
			} ;
			xhr.upload.onloadstart = function(event) {
				$('dropArea_' + g).innerHTML = "Chargement en cours...." ;
			} ;

			// création de l'objet FormData
			var formData = new FormData();
			formData.append('myfile', file);
			xhr.send(formData);
		}

		
		// transfert du fichier suivant
		function uploadNext() {
			if (list.length) {
				$('count').textContent = list.length - 1;
				$('dropArea').className = 'uploading';

				var nextFile = list.shift();
				if (nextFile.size >= 262144) { // 256 kb
					$('result').innerHTML += '<div class="f">Fichier trop gros (dépassement de la taille maximale)</div>';
					handleComplete(nextFile.size);
				} else {
					uploadFile(nextFile, status);
				}
			} else {
				dropArea.className = '';
			}
		}
		return true ;
	},
	
	afficheUnePhoto:function(galerie, numero) {
		/* cette fonction gère l'affichage d'une photo dans l'album, càd en grand */
		$('photoPrec').stopObserving() ;	// on enlève les observeurs pour éviter qu'ils ne s'accumulent.
		$('photoSuiv').stopObserving() ;
		if (wall.album == 0) {
			//l'album n'est pas affiché : on l'affiche
			$('albumPhotographique').style.display = "block" ;	
			wall.album = 1 ;
			//on ajoute l'observer qui permettra de le refermer
			$('closeAlbum').observe("click", function() {
					$('albumPhotographique').style.display = "none" ;	//on cache l'album
					wall.album = 0 ;
					return $('closeAlbum').stopObserving() ; //on défait l'observeur
				}
			) ;
		}
		//on affiche la photo
		$('laPhoto').src = "../photos/" + wall.galeries[galerie].nom + "/photos/" + wall.galeries[galerie].contenu[numero] ;
		$('nomPhoto').innerHTML = wall.galeries[galerie].contenu[numero] ;
		$('photoPrec').title = "Photo précédente" ;
		$('photoSuiv').title = "Photo suivante" ;
		//on regarde quel est le numéro précédent et, s'il existe, on règle l'observer sur le mapping de l'image côté gauche.
		var prec = numero - 1 ;
		if (prec >= 0) $('photoPrec').observe("click", function() { 
				$('photoPrec').stopObserving() ;	//on bloque aussitôt les observeurs pour éviter une double manoeuvre
				$('photoSuiv').stopObserving() ;
				wall.afficheUnePhoto(galerie, prec) ; 	//on affiche la photo précédente
			}) ;
		else {
			$('photoPrec').title = "C'est la première photo" ;
		}
		//on fait pareil pour la photo suivante
		var suiv = numero + 1 ;
		console.log(wall.galeries[galerie].contenu.length) ;
		if (suiv < wall.galeries[galerie].contenu.length) { 	//le nombre de photos dans la galeries
			$('photoSuiv').observe("click", function() { 
				$('photoPrec').stopObserving() ;
				$('photoSuiv').stopObserving() ;
				wall.afficheUnePhoto(galerie, suiv) ; 
			}) ;
		}
		else {
			$('photoSuiv').title = "C'est la fin de l'album" ;
		}
		console.log("Fin de afficheUnePhoto.") ;
		return true ;
	}
} ;

var displayManager = {
	
	partie:0,				// 1 - le mur, etc.
	maxPartie:5,
	
	displayPartie:function(part) {
		console.log("On m'a demandé l'affichage de la partie " + part) ;
		if (part < 0 || part > this.maxPartie) {
			return false ;
		}
		for (var i = 0 ; i <= this.maxPartie ; i++) {
			$('partie' + i).style.display = "none" ;	//on cache tout
		}
		$('partie' + part).style.display = "block" ;
		this.partie = part ;
		return true ;
	}
}
/*
function initialize() {
	//initialisation de la carte googlemap
	var mapProp = {
		'center':new google.maps.LatLng(44.703899, 0.577030), 
		'zoom':8,
		'mapTypeId':google.maps.MapTypeId.ROADMAP,
		'disableDefaultUI': false,
		'mapTypeControl':false,
		'overviewMapControl':false} ;
	carte = new google.maps.Map(document.getElementById("ggmaplpr"), mapProp) ;
	infowindow = new google.maps.InfoWindow(
			{'content':"Le petit roc", 
			"position":new google.maps.LatLng(44.703899, 0.577030)}) ;
	infowindow.open(carte) ;
	console.log("J'ai terminé l'affichage de la carte.") ;
	return carte ;
}*/

Event.observe(window, "load", wall.initialise, false) ;
//google.maps.event.addDomListener(window, 'load', initialize);