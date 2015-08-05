<?php
require_once("../app/head.php") ;
head("Edouard et Gabrielle", []) ;
body() ;
menu() ;
?>
<h2>Généalogie</h2>
<div class="information">Pour un affichage plus confortable, <a href="../pdf/arbre_genealogique.pdf">vous pouvez télécharger l'arbre généalogique</a> ou zoomer dans le document PDF ci-dessous.</div>
<object id="arbre_genealogique" height="400" data="../pdf/arbre_genealogique.pdf" type="application/pdf" title="Arbre généalogique"></object> 
<h2>Cartographie</h2>
<div class="information">Prochainement, une carte du monde avec la localisation de chacun des membres de notre famille.</div>
<h2>Ils sont inscrits sur ce site</h2>
<div class="information">Voici la liste des personnes inscrites :</div>
<table id="Users">
	<thead>
		<tr>
			<th>Prénom</th>
			<th>Nom</th>
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
		echo('<tr><td><a href="mailto:'.$p->mail.'">'.$p->prenom.'</a></td><td><a href="mailto:'.$p->mail.'">'.$p->nom.'</a></td><td>'.$p->ville.'</td></tr>') ;
	}
	?>
	</tbody>
</table>
<?php
bottom() ;
die() ;
?>