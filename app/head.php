<?php
function head($title, $scripts = ["wall"]) {
	?> 
	<!DOCTYPE html>
	<html>
	<head>
		<title><?php echo $title ; ?></title>
		<meta charset="UTF-8">
		<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
		<meta http-equiv="Pragma" content="no-cache" />
		<meta http-equiv="Expires" content="0" />
		<meta name="Robots" content="None">
		<meta http-equiv="content-language" content="fr"> 
	<!-- 	<script src="http://maps.googleapis.com/maps/api/js"></script> -->	
		<script type="text/javascript" src="../local/localisation.js"></script>
		<script type="text/javascript" src="../js/prototype.js"></script>
		<?php
		if ($scripts != ["connexion"]) {
			echo('<script type="text/javascript" src="../js/commun.js"></script>') ;
		}
		?>
		<script type="text/javascript" src="../js/config.js"></script>
		<?php
		foreach($scripts as $s) {
			echo '<script type="text/javascript" src="../js/'.$s.'.js"></script>' ;
		}
		?>
		<link rel="stylesheet" type="text/css" href="../css/ordinaire.css" media="screen and (min-width: 720px)" />
		<link rel="icon" type="image/png" href="http://www.steppe.fr/images/cavaliermongol.png" />
		<base target="_self">
	</head>
	<?php	
}

function body() {
	echo('<body><div id="mainConteneur"><div id="authentifie"><h1 class="grostitre">Edouard et Gabrielle</h1><div id="bandeau"><img src="../img/bandeau.jpg" /></div>') ;
}

function menu() {	
	?>
	<div id="mainMenu">
		
		<li class="menu" id="menuMur" title="Le mur"><a href="wall.php">Le mur</a></li>
		<li class="menu" id="menuFamille" title="La famille d'Edouard et Gabrielle"><a>Famille</a>
			<nav id="subMenuFamille" class="subMenu">
				<li id="genealogie"><a href="genealogie.php">Arbre généalogique</a></li>
				<li id="geographie"><a href="cartographie.php">Répartition géographique</a></li>
			</nav>
		</li>
		<li class="menu" id="menuPhoto" title="Galeries photos"><a href="photo.php">Photos</a>
			<?php
			/*<nav id="subMenuPhotos" class="subMenu">
				<li id="album0"><a>Album0</a></li>
				<li id="album1"><a>Album1</a></li>
			</nav>*/
			?>
		</li>
		<li class="menu" id="menuReunion" title="Réunion de famille"><a>Cousinade 2015</a>
			<nav id="subMenuCousinades" class="subMenu">
				<li id="souvenirs"><a href="cousinade2015.php">Les souvenirs</a></li>
				<li id="participants"><a href="participants.php">Les participants</a></li>
				<li id="infospratiques"><a href="infopratiques.php">Les informations pratiques</a></li>
			</nav>
		</li>
		<li class="menu" id="site" title="Tout sur ce site"><a>Le site E&G</a>
			<nav id="subMenuSite" class="subMenu">
				<li id="inscrits"><a href="inscrits.php">Les membres du site</a></li>
				<li id="linkMonCompte"><a href="compte.php">Mon compte</a></li>
				<li id="menuAdmin" class="admin" title="Page d'administration"><a href="admin.php">Administration</a></li>
			</nav>
		</li>
	</div>
	<?php
	/*<div id="menuhaut">
		<div class="menu admin" id="menuAdmin" title="Page d'administration"><a href="admin.php">Administration</a></div>
		<div class="menu" id="menuMur" title="Le mur"><a href="wall.php">Le mur</a></div>
		<div class="menu" id="menuFamille" title="La famille d'Edouard et Gabrielle"><a href="genealogie.php">Famille</a></div>
		<div class="menu" id="menuPhoto" title="Galeries photos"><a href="photo.php">Photos</a></div>
		<div class="menu" id="menuReunion" title="Réunion de famille"><a href="cousinade2015.php">Cousinade 2015</a></div>
		<div class="menu" id="linkMonCompte"><a href="compte.php">Mon compte</a></div>
	</div>*/
	
}

function bottom() {
?>
		<div class="bottom">
			<span class="link" id="deconnect">Se déconnecter</span> - 
			<span class="link" id="info">Informations sur ce site</span>
		</div>
	</div>
</div>
</body>
</html>
<?php
}	
?>