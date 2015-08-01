<?php
require_once("../app/head.php") ;
head("Edouard et Gabrielle", ["photo"]) ;
body() ;
menu() ;
?>
<h2>Photos</h2>
<div id="infos">
	<div>Sur cette page, chacun d'entre vous peut ajouter une ou des photos. Il suffit de :</div>
	<div>1) sélectionner une photo qui ne fasse pas plus de 5 Mo</div>
	<div>2) la glisser dans la zone de drop (il y a une zone de drop par album)</div>
	<div>3) ajouter une légende</div>
	<div>Utilisez de préférence les albums existants ou, à défaut, <span onClick="photos.creerAlbum()" class="link">créez le vôtre</span>.</div>
</div>

<div id="albums_photos"></div>

<div id="albumPhotographique">
	<div id="legendePhoto" class="infoPhoto cliquable" title="cliquer pour modifier la légende"></div>
	<div id="nomPhoto"></div>
	<div id="infoPhoto" class="infoPhoto">Branche(s) : 
		<span id="tag1" class="tag">Renée</span> 
		<span id="tag2" class="tag">Robert</span>  
		<span id="tag3" class="tag">Ghislain</span>  
		<span id="tag4" class="tag">Mithy</span>  
		<span id="tag5" class="tag">Henri</span>  
		<span id="tag6" class="tag">Hélène</span> 
	</div>
	<div id="photographie">
		<img id="laPhoto" src="../photos/le_petit_roc/photos/photo0002.jpg"/ usemap="#photoMap">
	</div>
	<div id="infoPhoto" class="infoPhoto">Photo ajoutée par <span id="photoAuteur" class="link"></span></div>
	<div id="commandesPhotos" class="infoPhoto link">Supprimer cette photo</div>
	<div id="closeAlbumBox">
		<span id="photoPrec">Photo précédente  --- </span>
		<span id="closeAlbum">Fermer l'album</span>
		<span id="photoSuiv"> --- Photo suivante</span>
	</div>	
</div>
<?php
bottom() ;
?>