/* album photo */

photos = {

	affiche:0,
	
	affichePhotos:function() {
		console.log("Affichage des albums photos.") ;
		new Ajax.Request(localisation + "REST/album.php", {
			"method":"GET",
			"onSuccess":function(requester) { 
				photos.album 	= requester.responseJSON.album ;
				photos.auteurs 	= requester.responseJSON.personnes ;
				photos.lientp	= requester.responseJSON.lientp ;
				return photos.affichePhotos2(photos.album) ;
			}
		}) ;	//lance une requête AJAX sur album.php, qui retourne un tableau de la liste des album à afficher.
		return 1 ;
	},
				
	affichePhotos2:function(album) {	
		//affiche les album photos et fournit les fonctions nécessaires au dépôt de photos.
		$('albums_photos').innerHTML = "" ;			//on vide l'affichage en cours.
		var string = [] ;
		for (var i = 0 ; i < album.length ; i++) {	//on prend une à une chacune des album.
			var gphotos = album[i].photos ;
			string.push('<h3>' + album[i].album.nom + '</h3><div class="album" id="photos_' + album[i].album.num + '"><table id="album_' + album[i].album.num + '" nElement = "' + gphotos.length + '">') ;			
			var k = 0 ;
			for (var j = 0 ; j < gphotos.length ; j++) {
				if (!k) string.push('<tr>') ;
				string.push('<td><img src="../photos/' + album[i].album.nom + '/miniatures/' + gphotos[j].nom + '" title="' + gphotos[j].legende + '" alt="' + gphotos[j].legende + '" onClick="javascript:photos.afficheUnePhoto(' + i + ', ' + j + ')"></td>') ;
				k++ ;
				if (k >= 3) {
					string.push('<tr>') ;
					k = 0 ;
				}
			}
			if (k == 0) string.push('<tr>') ;
			string.push('<td><div class="dropArea" id="dropArea_' + album[i].album.num + '"><p></p>Déposez ici une nouvelle photo.</div></td></tr></table></div>') ;
		} 
		$('albums_photos').innerHTML = string.join("") ;
		for (var i = 0 ; i < album.length ; i++) {
			var ng = album[i].album.num ;
			var evt = function (ng) {
				$('dropArea_' + ng).observe("drop", function(e) {handleDrop(e, ng) ;}) ;
				$('dropArea_' + ng).observe("dragover", function(e) {handleDrop(e, ng) ;}) ;//on ajoute deux Observer, pour le drag & drop.
			} ;
			evt(ng) ;
		}
		
		function handleDragOver(event, g) {
			event.stop();
			$('dropArea_' + g).className = 'hover';
        }
		
		// glisser déposer
		function handleDrop(e, g) {
			e.stop() ;
			console.log(g) ;
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
			if (file.size >= 6262144) { // 6Mo
				$('dropArea_' + g).innerHTML = "Fichier trop lourd !" ;
				return false ;
			}
			// création de l'objet XMLHttpRequest
			var xhr = new XMLHttpRequest();
			xhr.open('POST', '../AJAX/postphotos.php?album=' + g + '&auteur=' + wallApp.personneConnectee) ;
			xhr.onload = function() {
				$('dropArea_' + g).innerHTML = "Chargement terminé...." ;
				photos.affichePhotos() ;
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
		console.log("Fin de la fonction photos.") ;
		return true ;
	},
	
	afficheUnePhoto:function(album, numero) {
		console.log("Lancement de afficheUnePhoto.") ;
		/* cette fonction gère l'affichage d'une photo dans l'album, càd en grand */
		photos.chargeCommentaires(album, numero) ;
		$('envoiCommentaireBouton').stopObserving() ;
		$('photoPrec').stopObserving() ;	// on enlève les observeurs pour éviter qu'ils ne s'accumulent.
		$('photoSuiv').stopObserving() ;
		$('legendePhoto').stopObserving() ;
		$('commandesPhotos').stopObserving() ;
		for (var i = 1 ; i < 7 ; i++) {
			$('tag' + i).stopObserving() ;
		}		
		if (photos.affiche == 0) {
			//l'album n'est pas affiché : on l'affiche
			$('albumPhotographique').style.display = "block" ;	
			$('albums_photos').style.display = "none" ;
			$('infos').style.display = "none" ;
			photos.affiche = 1 ;
			//on ajoute l'observer qui permettra de le refermer
			$('closeAlbum').observe("click", photos.fermeAlbum) ;
		}
		//on affiche la photo
		var nomPhoto = photos.album[album].photos[numero].nom ;		
		$('laPhoto').src = "../photos/" + photos.album[album].album.nom + "/photos/" + nomPhoto ;
		//nomPhoto = nomPhoto.replace(/.(jpg|png)/i, "") ;
		//$('nomPhoto').innerHTML = '(' + nomPhoto + ')' ;
		$('nomPhoto').innerHTML = nomPhoto ;
		$('legendePhoto').innerHTML = photos.album[album].photos[numero].legende ;
		$('photoAuteur').innerHTML = photos.getAuteur(photos.album[album].photos[numero].auteur) ;
		
		//tags
		$('tag' + 1).observe("click", function() { photos.setTag(album, numero, 1) ; })	;
		$('tag' + 2).observe("click", function() { photos.setTag(album, numero, 2) ; })	;
		$('tag' + 3).observe("click", function() { photos.setTag(album, numero, 3) ; })	;
		$('tag' + 4).observe("click", function() { photos.setTag(album, numero, 4) ; })	;
		$('tag' + 5).observe("click", function() { photos.setTag(album, numero, 5) ; })	;
		$('tag' + 6).observe("click", function() { photos.setTag(album, numero, 6) ; })	;
		photos.tags = ["", 0, 0, 0, 0, 0, 0] ;
		for (var i = 1 ; i < 7 ; i++) {
			$('tag' + i).removeClassName("tagactive") ;
			$('tag' + i).addClassName("tag") ;
			for (var j = 0 ; j < photos.lientp.length ; j++) {
				if (photos.lientp[j].photo == photos.album[album].photos[numero].num && photos.lientp[j].tag == i) {
					$('tag' + i).removeClassName("tag") ;
					$('tag' + i).addClassName("tagactive") ;
					photos.tags[i] = photos.lientp[j].num ;
				} 			
			}
		}
		if (photos.album[album].photos[numero].auteur == wallApp.personneConnectee || photos.album[album].album.createur == wallApp.personneConnectee || wallApp.personneConnecteeAdmin == 1) {
			//créateur de la photo, administrateur du site ou de l'album
			$('legendePhoto').observe("click", function () { photos.modifieLegende(album, numero) ; }) ;
			$('commandesPhotos').style.display = "inline" ;
			$('commandesPhotos').observe("click", function() {photos.supprimePhoto(photos.album[album].photos[numero].num) ;}) ;
		}
		else $('commandesPhotos').style.display = "none" ;
		$('photoPrec').innerHTML = "Photo précédente | " ;
		$('photoSuiv').innerHTML = " | Photo suivante" ;
		//on regarde quel est le numéro précédent et, s'il existe, on règle l'observer sur le mapping de l'image côté gauche.
		var prec = numero - 1 ;
		if (prec >= 0) $('photoPrec').observe("click", function() { 
				$('photoPrec').stopObserving() ;	//on bloque aussitôt les observeurs pour éviter une double manœuvre
				$('photoSuiv').stopObserving() ;
				photos.afficheUnePhoto(album, prec) ; 	//on affiche la photo précédente
			}) ;
		else {
			$('photoPrec').innerHTML = "" ;
		}
		//on fait pareil pour la photo suivante
		var suiv = numero + 1 ;
		if (suiv < photos.album[album].photos.length) { 	//le nombre de photos dans la album
			$('photoSuiv').observe("click", function() { 
				$('photoPrec').stopObserving() ;
				$('photoSuiv').stopObserving() ;
				photos.afficheUnePhoto(album, suiv) ; 
			}) ;
		}
		else {
			$('photoSuiv').innerHTML = "" ;
		}
		$('envoiCommentaireBouton').observe("click", function (e) { 
			e.stop() ; 
			photos.ajouteCommentaire(album, numero) ; }) ;
		console.log("Fin de afficheUnePhoto.") ;
		return true ;
	},
	
	chargeCommentaires:function(album, numero) {
		$('commentairesChargementEnCours').style.display = "block" ;
		new Ajax.Request(localisation + "REST/index.php", {
			"parameters":"objet=commentaire&photo=" + photos.album[album].photos[numero].num,
			"method":"GET",
			"onSuccess":function(requester) {
				console.log(requester.responseJSON) ; 
				$('commentairesChargementEnCours').style.display = "none" ;		
				var commentaires = requester.responseJSON.commentaire ;
				if (commentaires.length == 0) {
					$('commentairesPhotos').innerHTML = "Aucun commentaire n'a été déposé pour cette photo." ;
				}
				else {
					var string = ['<div class="commentairesAccroches">' + commentaires.length + ' commentaire(s) : </div>'] ;
					for (var i = commentaires.length-1 ; i > -1 ; i--) {
						string.push(photos.traiteCommentaire(commentaires[i])) ;
					}
					$('commentairesPhotos').innerHTML = string.join("") ;
				}
			}
		})			;
		return true ;
	},
	
	traiteCommentaire:function(commentaire) {
		if (commentaire.creation) {
			var d = commentaire.creation.split("-") ;
			return '<div class="unCommentaire">Le ' + d[2] + "/" + d[1] + "/" + d[0] + ', ' + commentaire.texte + '</div>' ;
		}
		else {
			return '<div class="unCommentaire">Aujourd\'hui, ' + commentaire.texte + '</div>' ;
		}
	},
		
	ajouteCommentaire:function(album, numero) {
		var texte = wallApp.personne + " : " + $('commentaire_text').value.trim() ;
		
		new Ajax.Request(localisation + "REST/index.php", {
			"postBody":"objet=commentaire&&num=0&photo=" + photos.album[album].photos[numero].num + '&texte=' + texte,
			"method":"POST",
			"onSuccess":function(requester) {
				console.log(requester.responseJSON) ; 				
				$('commentairesPhotos').insert({"top":photos.traiteCommentaire(requester.responseJSON.commentaire)}) ;
				$('commentaire_text').value = "" ;
				return true ;
			}
		}) ;
		return true ;
	},
	
	getAuteur:function(num) {
		for (var i = 0 ; i < photos.auteurs.length ; i++) {
			if (eval(photos.auteurs[i].num) == num) {
				return '<a href="mailto:' + photos.auteurs[i].mail + '">' + photos.auteurs[i].prenom + " " + photos.auteurs[i].nom + '</a>' ;
			}
		}
		return "un auteur non spécifié" ;
	},
	
	modifieLegende:function(album, numero) {
		legende = prompt("Modifier la légende", photos.album[album].photos[numero].legende) ;
		legende = legende.strip().stripTags().stripScripts() ;
		if (legende != photos.album[album].photos[numero].legende && legende != "") {
			$('legendePhoto').innerHTML = legende + ' (sauvegarde en cours)' ;
			console.log(photos.album[album].photos[numero].num) ;
			new Ajax.Request(localisation + "REST/index.php", {
			"postBody":"objet=photo&verbose=1&num=" + photos.album[album].photos[numero].num + '&legende=' + legende,
			"method":"POST",
			"onSuccess":function(requester) {
				console.log(requester.responseJSON) ; 
				$('legendePhoto').innerHTML = legende ;
				photos.album[album].photos[numero].legende = legende ;
				return true ;
			}
		}) ;	//lance une requête AJAX sur album.php, qui retourne un tableau de la liste des album à afficher.
		return 1 ;
		}
		console.log(legende) ;
	},
	
	creerAlbum:function() {
		nomAlbum = prompt("Donnez un nom à votre album") ;
		nomAlbum = nomAlbum.strip().stripTags().stripScripts() ;
		for (var i = 0 ; i < photos.album.length ; i++) {
			if (photos.album[i].album.nom.toLowerCase() == nomAlbum.toLowerCase()) {
				alert("Cet album existe déjà.") ;
				return false ;			
			}
		}
		new Ajax.Request(localisation + "REST/index.php", {
			"postBody":"objet=album&num=0&nom=" + nomAlbum + '&createur=' + wallApp.personneConnectee,
			"method":"POST",
			"onSuccess":function(requester) {
				console.log(requester.responseJSON) ;
				photos.affichePhotos() ;
				alert("Votre album a bien été créé.") ;
				return true ;
			}
		}) ;
		return true ;
	},
	
	supprimePhoto:function(num) {
		var r = confirm("êtes vous certain de vouloir supprimer cette photo ? ");
		if (r == true) {
		   new Ajax.Request(localisation + "REST/index.php", {
					"postBody":"objet=photo&command=delete&num=" + num,
					"method":"POST",
					"onSuccess":function(requester) {
						console.log(requester.responseJSON) ;
						photos.fermeAlbum() ;				
						photos.affichePhotos() ;
						alert("Cette photo a bien été supprimée.") ;
						return true ;
					}
			}) ;
		} 
		else {
			return false ;
		} 
	},
	
	fermeAlbum : function() {
		$('albumPhotographique').style.display = "" ;	//on cache l'album
		$('albums_photos').style.display = "" ;
		$('infos').style.display = "block" ;					
		photos.affiche = 0 ;
		photos.tags = ["", 0, 0, 0, 0, 0, 0] ;
		return $('closeAlbum').stopObserving() ; //on défait l'observeur
	},
	
	setTag:function(album, numero, i) {
		console.log(photos.tags) ;
		//recherche du tag en question		
		if (photos.tags[i] > 0) {
			//on l'a trouvé ! s'il existe, c'est qu'il faut le désactiver
			$('tag' + i).removeClassName("tagactive") ;
			$('tag' + i).addClassName("tag") ;
			console.log("On désactive ce tag.") ;
			//partie serveur
			var numaeffacer = photos.tags[i] ;
			new Ajax.Request(localisation + "REST/index.php", {
				"postBody":"objet=lientp&command=delete&num=" + numaeffacer,
				"method":"POST",
				"onSuccess":function(requester) {
					console.log(requester.responseJSON) ;
					//partie JS
					for (var j = 0 ; j < photos.lientp.length ; j++) {
						if (photos.lientp[j].num == numaeffacer)	{
							photos.lientp[j] = "" ;
							j = photos.lientp.length ;
						}				
					}
					console.log("Bonne suppression du tag.") ;
					return true ;
				}
			}) ;
			photos.tags[i] = 0 ;
			return false ;
		}
		else {
			//on n'a rien trouvé : il faut l'activer
			console.log("On active ce tag.") ;
			$('tag' + i).addClassName("tagactive") ;
			$('tag' + i).removeClassName("tag") ;
			//partie serveur
			new Ajax.Request(localisation + "REST/index.php", {
				"postBody":"objet=lientp&num=0&photo=" + photos.album[album].photos[numero].num + '&tag=' + i,
				"method":"POST",
				"onSuccess":function(requester) {
					console.log(requester.responseJSON) ;
					photos.tags[i] = requester.responseJSON.num ;
					photos.lientp.push(requester.responseJSON.lientp) ;
					console.log("Bon ajout du tag.") ;
					return true ;
				}
			}) ;
			return true ;
		}
	}
} ;

Event.observe(window, "load", photos.affichePhotos, false) ; 