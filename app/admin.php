<?php
require_once("../app/head.php") ;
head("Administration du mur", ["walladmin"]) ;
?>
<body>
<div id="mainConteneur">
	<div id="authentifie">
		<div id="menuhaut">
			<div class="menu" id="menu1">Demandes d'inscription (<span id="nDemandesInscription"></span>)</div>
			<div class="menu" id="menu2">Utilisateurs (<span id="nUsers"></span>)</div>	
			<div class="menu" id="menu3">Messages</div>
			<div class="menu" id="menu4">Paramètres généraux</div>
		</div>
	</div>
	<h1>Administration du mur</h1>

	<div id="admin1" class="adminTopic">
	<h2>Demandes d'inscription</h1>
	Voici les demandes en cours :
	<table id="newUsers">
		<thead>
			<tr>
				<th>Nom</th>
				<th>Prénom</th>
				<th>Mail</th>
				<th>Lien</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody id="newUsersBody">
		</tbody>
	</table>
	</div>

	<div id="admin2" class="adminTopic">
	<h2>Utilisateurs</h2>
	Voici la liste des personnes inscrites :
	<table id="Users">
		<thead>
			<tr>
				<th>Prénom</th>
				<th>Nom</th>
				<th>Adresse</th>
				<th>Ville</th>
				<th>Né(e) le</th>
				<th>à</th>
				<th>Newsletter</th>
				<th>Dernière connexion</th>
			</tr>
		</thead>
		<tbody id="UsersBody">
		</tbody>
	</table>
	</div>

	<div id="admin3" class="adminTopic">
	<h2>Messages</h2>
	<table id="messages">
		<thead>
			<tr>
				<th>Auteur</th>
				<th>Date</th>
				<th>Contenu</th>
				<th></th>
			</tr>
		</thead>
		<tbody id="messagesBody">
		</tbody>
	</table>
	</div>

	<div id="admin4" class="adminTopic">
	<h2>Paramètres généraux</h2>
	
	</div>	
	
	<div class="bottom">
		<span class="link" id="info3">Revenir sur la page principale</span>
	</div>	

</div>
</body>
</html>