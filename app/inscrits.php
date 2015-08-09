<?php
require_once("../app/head.php") ;
head("Edouard et Gabrielle", []) ;
body() ;
menu() ;
?>
<h2>Ils sont inscrits sur ce site</h2>
<div class="information">Voici la liste des personnes inscrites :</div>
<table id="Users">
	<thead>
		<tr>
			<th>Prénom</th>
			<th>Nom</th>
			<th>e-mail</th>
			<th>Ville</th>
		</tr>
	</thead>
	<tbody id="UsersBody">
	<?php
	require_once("../local/database.php") ;		//les coordonnées de connexion à mysql
	require_once("../inc/cl.mysqldb.php") ;
	require_once("../inc/cl.alpha.php") ;		//la classe alpha
	require_once("../inc/cl.personne.php") ;
	//Connexion mysql
	mysqldb::instance($bddserver, $bdduser, $bddpassword, $bdddatabase) ;
	$p = new personne() ;
	$p->select("ORDER BY nom, prenom") ;
	while ($p->next()) {
		echo('<tr><td><a href="mailto:'.$p->mail.'">'.$p->prenom.'</a></td><td><a href="mailto:'.$p->mail.'">'.$p->nom.'</a></td><td>'.$p->mail.'</td><td>'.$p->ville.'</td></tr>') ;
	}
	?>
	</tbody>
</table>
<?php
bottom() ;
die() ;
?>