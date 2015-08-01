<?php
require_once("../app/head.php") ;
head("Edouard et Gabrielle", ["compte"]) ;
body() ;
menu() ;
?>
<h2>Mon compte</h2>
<div class="information">Vous pouvez ici modifier certains éléments vous concernant. </div>
<div class="infomessage" id="messagemonCompte-1">Vos informations ont bien été modifiées.</div>
<div class="errormessage" id="messagemonCompte-2">Erreur de modification de vos informations. Merci de bien vouloir réessayer dans quelques instants ou contacter l'administrateur.</div>
<form method="javascript:void()" id="formCompte">
<fieldset>
	<legend>Mes paramètres</legend>
	<input type="hidden" id="monCompte_num" name="monCompte_num" value="">
	<div class="fchamp">
		<label for="monCompte_nom" class="left">Nom</label>
		<input type="text" id="monCompte_nom" namee="monCompte_nom" value="" size="40">
	</div>
	<div class="fchamp">
		<label for="monCompte_prenom" class="left">Prénom</label>
		<input type="text" id="monCompte_prenom" name="monCompte_prenom" value="" size="40">
	</div>
	<div class="fchamp">
		<label for="monCompte_mail" class="left">E-Mail</label>
		<input type="text" id="monCompte_mail" name="monCompte_mail" value="" size="80">
	</div>
	<div class="fchamp">
		<label for="monCompte_newsletter" class="left">Newsletter</label>
		<select id="monCompte_newsletter" name="monCompte_newsletter">
			<option id="monCompte_newsletter-0" value="0">Non</option>
			<option id="monCompte_newsletter-1" value="1">Quotidienne</option>
			<option id="monCompte_newsletter-2" value="2">Hebdomadaire</option>
			<option id="monCompte_newsletter-3" value="3">Mensuelle</option>
			<option id="monCompte_newsletter-4" value="4">Trimestrielle</option>
			<option id="monCompte_newsletter-5" value="5">Annuelle</option>
			<option id="monCompte_newsletter-6" value="6">En temps réel</option>
		</select>
	</div>
	<div class="fchamp">
		<label for="monCompte_datenaissance" class="left">Date de naissance</label>
		<input type="text" id="monCompte_datenaissance" name="monCompte_datenaissance" value="" size="80"> (au format jj/mm/aaaa)
	</div>
	<div class="fchamp">
		<label for="monCompte_lieunaissance" class="left">Lieu de naissance</label>
		<input type="text" id="monCompte_lieunaissance" name="monCompte_lieunaissance" value="" size="80"> (ville, pays)
	</div>
	<div class="fchamp">
		<label for="monCompte_adresse" class="left">Adresse</label>
		<input type="text" id="monCompte_adresse" name="monCompte_adresse" value="" size="250">
	</div>
	<div class="fchamp">
		<label for="monCompte_ville" class="left">Ville</label>
		<input type="text" id="monCompte_ville" name="monCompte_ville" value="" size="80">
	</div>
	<div class="fchamp">
		<label for="monCompte_pays" class="left">Pays</label>
		<select id="monCompte_pays" name="monCompte_pays">
		</select>
	</div>
	<div class="fboutton">
		<input class="rightbutton" type="submit" id="monCompte_boutton" name="monCompte_boutton" value="Enregistrer les modifications">
	</div>
</fieldset>
</form>
<div class="errormessage" id="messagemonCompte-3">Vous devez rentrer deux fois votre mot de passe, de façon identique. Merci de bien vouloir réessayer.</div>
<div class="infomessage" id="messagemonCompte-4">Votre mot de passe a bien été modifié.</div>
<div class="errormessage" id="messagemonCompte-5">Vous n'avez pas rentré votre bon mot de passe actuel. Vous ne pouvez pas définir un nouveau mot de passe si vous n'avez pas votre mot de passe actuel. Merci de bien vouloir réessayer.</div>
<div class="errormessage" id="messagemonCompte-6">Une erreur inconnue s'est produite. Merci de bien vouloir réessayer dans quelques instants.</div>
<form method="javascript:void()" id="formCompteMotdePasse">
<fieldset>
	<legend>Modifier mon mot de passe</legend>
	<input type="hidden" id="monMotdePasse_num" value="">
	<div class="fchamp">
		<label for="monMotdePasse_pw1" class="left">Mot de passe actuel</label>
		<input type="password" id="monMotdePasse_pw1" name="monMotdePasse_pw1" value="" size="20">
	</div>
	<div class="fchamp">
		<label for="monMotdePasse_pw2" class="left">Nouveau mot de passe</label>
		<input type="password" id="monMotdePasse_pw2" name="monMotdePasse_pw2" value="" size="20">
	</div>
	<div class="fchamp">
		<label for="monMotdePasse_pw3" class="left">Nouveau mot de passe (vérification)</label>
		<input type="password" id="monMotdePasse_pw3" name="monMotdePasse_pw3" value="" size="20">
	</div>
	<div class="fboutton">
		<input class="rightbutton" type="submit" id="monMotdePasse_bouton" name="monMotdePasse_bouton" value="Enregistrer les modifications">
	</div>
</fieldset>
</form>
<div class="information">Si vous souhaitez vous désinscrire du site "Edouard et Gabrielle", merci d'envoyer un message en ce sens à Anne-Sophie, à l'adresse suivante : <a href="mailto:nous.debrier@outlook.com">nous.debrier@outlook.com</a>. Si vous êtes désinscrit, vous ne recevrez plus les newsletters et vous ne pourrez plus accéder au site lui-même.</div>
<?php
bottom() ;
die() ;
?>