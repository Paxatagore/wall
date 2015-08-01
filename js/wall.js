/* 
De Brier - le mur
début des travaux : 24/5/2015
*/

debug = 0 ;		//mode débugage - on chunte la connexion
verbose = 0 ;


var wall = {
	initialise:function() {
		$('envoimessageboutton').observe("click", wall.envoiMessage) ;
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
	
	envoiMessage:function (e) {
		e.stop() ;
		$('envoimessageboutton').style.display = "none" ;
		new Ajax.Request(localisation + 'REST/index.php', {
			"method": "post",
			"postBody":"objet=message&num=0&categorie=1&auteur=" + wallApp.personneConnectee + "&" + $('message_text').serialize(),
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
	}		

} ;

Event.observe(window, "load", wall.initialise, false) ;
//google.maps.event.addDomListener(window, 'load', initialize);