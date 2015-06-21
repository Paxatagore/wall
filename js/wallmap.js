/* 
De Brier - la carte
début des travaux : 21/6/2015
*/

var wallMap = {} ;

wallMap.initialise = function() {
	new Ajax.Request(localisation + 'REST/index.php', {
		"method": "get",
		"parameters":"objet=personne",
		"onSuccess":wallMap.traiteResult}) ;
	return true ;
}

wallMap.traiteResult = function(requester) {
	//dessin de la carte
	var cartes = [] ; 
	var centres = [
		new google.maps.LatLng(50.850, 4.351), 
		new google.maps.LatLng(45.777, 3.087), 
		new google.maps.LatLng(43.8072350,4.6442690),
		new google.maps.LatLng(41.252, -95.997)
	] ;
	
	var mapProp = {
		'center':centres[0],
		'zoom':8,
		'mapTypeId':google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true,
		'mapTypeControl':false,
		'overviewMapControl':false} ;
	cartes[0] = new google.maps.Map(document.getElementById("Belgique"), mapProp) ;
	//France
	mapProp.zoom = 6 ;
	mapProp.center = centres[1] ;
	cartes[1] = new google.maps.Map(document.getElementById("France"), mapProp) ;
	//Sud-est de la France
	mapProp.zoom = 9 ;
	mapProp.center = centres[2] ;
	cartes[2] = new google.maps.Map(document.getElementById("FranceSE"), mapProp) ;
	//USA
	mapProp.zoom = 4 ;
	mapProp.center = centres[3] ;
	cartes[3] = new google.maps.Map(document.getElementById("Etats-Unis"), mapProp) ;
	
	//carte du monde
	mapProp.zoom = 3 ;
	mapProp.center = new google.maps.LatLng(57.7127562,-44.3847656) ;	//un coin vers le Groenland
	cartemonde = new google.maps.Map(document.getElementById("Monde"), mapProp) ;
	
	//traitement des personnes
	
	personnes = requester.responseJSON.personne ;
	adresses = [] ;
	for (var i = 0 ; i < personnes.length ; i++) {
		if (personnes[i].ville !="") {
			adresses.push(personnes[i]) ;
			
			
		}
	}
	console.log(adresses) ;
	

	
	return true ;
}

wallAdmin.codeAddress = function(address, map) {
	geocoder = new google.maps.Geocoder() ;
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });


Event.observe(window, "load", wallMap.initialise, false) ;