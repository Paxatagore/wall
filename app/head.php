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
		<base target="_blank">
	</head>
	<?php	
}

function body() {
	echo('<body><div id="mainConteneur"><div id="authentifie"><h1 class="grostitre">Edouard et Gabrielle</h1><div id="bandeau"><img src="../img/bandeau.jpg" /></div>') ;
}

function menu() {	
	?>
	<div id="menuhaut">
		<div class="menu admin" id="menuAdmin" title="Page d'administration"><a href="admin.php" target="_self">Administration</a></div>
		<div class="menu" id="menuMur" title="Le mur"><a href="wall.php" target="_self">Le mur</a></div>
		<div class="menu" id="menuFamille" title="La famille d'Edouard et Gabrielle"><a href="genealogie.php" target="_self">Famille</a></div>
		<div class="menu" id="menuPhoto" title="Galeries photos"><a href="photo.php" target="_self">Photos</a></div>
		<div class="menu" id="menuReunion" title="Réunion de famille"><a href="reunion2015.php" target="_self">Réunion du 11-12 juillet 2015</a></div>
		<div class="menu" id="linkMonCompte"><a href="compte.php" target="_self">Mon compte</a></div>
	</div>
	<?php
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