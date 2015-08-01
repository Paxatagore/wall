<?php
require_once("../app/head.php") ;
head("Edouard et Gabrielle", ["wall"]) ;
body() ;
menu() ;
?>
<div class="information">
	<div>Bienvenue <span id="personneConnectee"></span> !</div>
	<div>Voici un site, qui remplace Zankyou, pour nous permettre de faire connaissance ou de garder des liens, de partager des informations sur nos ascendants ou sur un événement à venir comme la réunion de famille de juillet prochain.</div>
	<div>C’est un site fait pour vous, qui doit se développer par vous, alors n’hésitez pas à le faire vivre, à poster des commentaires, à mettre des photos !</div>
</div>
<form id="nouveauMessage" method="post" action="javascript:void()">
	<fieldset>
	<legend>Ajoutez ici votre message</legend>
	<textarea rows="5" cols="100" id="message_text" name="message_text"></textarea>
	<div class="fboutton">
		<input class="rightbutton" type="submit" id="envoimessageboutton" name="envoimessageboutton" value="Envoyer ce message">
	</div>
</fieldset>
</form>
<div id ="lemur"></div>
</div>
		

		<div id="partie3" class="partie">
			<div class="information">Ce site a été réalisé pour la famille de Brier.</div>
		</div>
		
<?php
bottom() ;
die() ;
?>