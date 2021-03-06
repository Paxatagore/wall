<?php
require_once("../app/head.php") ;
head("Edouard et Gabrielle", ["connexion"]) ;
?>

<body>
<div id="mainConteneur">
	<div id="nonauthentifie">
		<h1 class="grostitre">Edouard et Gabrielle</h1>
		<div class="information">Bonjour, cher visiteur. Ce site est réservé aux membres de la famille de Brier. Si vous êtes déjà inscrit sur ce site, vous ne devriez pas avoir de difficulté à vous connecter avec votre prénom, votre nom et votre mot de passe. Si vous n'êtes pas inscrit,  vous pouvez solliciter votre inscription sur le site en remplissant le second formulaire et en indiquant votre position dans la famille. Lorsque votre inscription sera validée, vous recevrez un e-mail de confirmation.</div>
		<h2>Formulaire de connexion</h2>
		<div class="errormessage" id="messageConnexion-1">Erreur dans le mot de passe ! Merci de bien vouloir réessayer !</div>
		<div class="errormessage" id="messageConnexion-2">Erreur ! Ce prénom et ce nom ne sont pas connus. Merci de bien vouloir réessayer !</div>
		<form id="connexion">
		<fieldset>
			<legend>Paramètres de connexion</legend>
			<div class="fchamp">
				<label for="nom" class="left">Nom</label>
				<input type="text" id="connexion_nom" value="" size="40">
			</div>
			<div class="fchamp">
				<label for="prenom" class="left">Prénom</label>
				<input type="text" id="connexion_prenom" value="" size="40"></div>
			<div class="fchamp">
				<label for="password" class="left">Mot de passe</label>
				<input type="password" id="connexion_password" value="" size="20">
			</div>
			<div class="fboutton">
				<input class="rightbutton" type="submit" id="connexionboutton" value="Se connecter">
			</div>
		</fieldset>
		
		</form>
		
		<h2>Formulaire d'inscription</h2>
		<div class="errormessage" id="messageConnexion-3">Erreur ! Ce prénom et ce nom sont déjà connus.</div>
		<form id="inscription">
		<fieldset>
			<legend>Décrivez-vous !</legend>
			<div class="fchamp">
				<label for="inscription_nom" class="left">Nom</label>
				<input type="text" id="inscription_nom" value="" size="40">
			</div>
			<div class="fchamp">
				<label for="inscription_prenom" class="left">Prénom</label>
				<input type="text" id="inscription_prenom" value="" size="40">
			</div>
			<div class="fchamp">
				<label for="inscription_mail" class="left">Mail</label>
				<input type="text" id="inscription_mail" value="" size="200">
			</div>
			<div class="fchamp">
				<label for="inscription_position" class="left">Votre position dans la famille</label>
				<input type="text" id="inscription_position" value="" size="250">
			</div>
			<div class="fboutton">
				<input class="rightbutton" type="submit" id="inscriptionbouton" value="S'inscrire !"></div>
		</fieldset>
		</form>
	</div>

	<div id="tentativeinscription">
		<h1 class="grostitre">Edouard et Gabrielle</h1>
		<div class="information">Votre demande d'inscription a bien été enregistrée et envoyée par mail à l'administrateur de ce site, qui répondra dans les meilleurs délais. Vous recevrez alors un e-mail de confirmation. Merci de votre visite !</div>
	</div>
</div>
</body>
</html>