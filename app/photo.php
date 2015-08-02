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

	<div id="infoPhoto" class="infoPhoto">Photo <span id="nomPhoto"></span> ajoutée par <span id="photoAuteur" class="link"></span> | <span id="commandesPhotos" class="link">Supprimer cette photo</span></div>
	<div id="photographie">
		<img id="laPhoto" src="../photos/le_petit_roc/photos/photo0002.jpg"/ usemap="#photoMap">
	</div>
	
	<div class="infoPhoto">Branche(s) : 
		<span id="tag1" class="tag">Renée</span> 
		<span id="tag2" class="tag">Robert</span>  
		<span id="tag3" class="tag">Ghislain</span>  
		<span id="tag4" class="tag">Mithy</span>  
		<span id="tag5" class="tag">Henri</span>  
		<span id="tag6" class="tag">Hélène</span> 
	</div>	
	<div id="legendePhoto" class="infoPhoto cliquable" title="cliquer pour modifier la légende"></div>
	
	<div id="closeAlbumBox">
		<span id="photoPrec">Photo précédente  | </span>
		<span id="closeAlbum">Fermer l'album</span>
		<span id="photoSuiv"> | Photo suivante</span>
	</div>
	
	<div id="commentaires">
		<div id="commentairesChargementEnCours">(chargement en cours)</div>
		<div id="commentairesPhotos"></div>
		<form id="nouveauCommentaire" method="post" action="javascript:void()">
			<fieldset>
			<legend>Ajoutez ici votre commentaire</legend>
			<textarea rows="5" cols="100" id="commentaire_text" name="commentaire_text"></textarea>
			<div class="fboutton">
				<input class="rightbutton" type="submit" id="envoiCommentaireBouton" name="envoimessageboutton" value="Envoyer ce commentaire">
			</div>
			</fieldset>
		</form>
	</div>
</div>
<?php
bottom() ;
?>