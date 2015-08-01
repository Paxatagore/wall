<?php
/* script qui renvoie les albums photos  */
require_once("../inc/centrale.php") ;
$url 	= '../photos/' ;

$a = new album() ;
$a->select("ORDER BY nom") ;
$r = array() ;
$rj = array() ;
while ($a->next()) {
	$r[] = $a->num ;
	$rj[$a->num] = '{"album":'.$a->json().', "photos":[' ;
}

$auteurs = array() ;
$f = new photo() ;
$f->select() ;
$rj2 = array() ;
while ($f->next()) {
	$rj2[$f->album][] = $f->json() ;
	if (!in_array($f->auteur, $auteurs)) $auteurs[] = $f->auteur ;
}
$json = array() ;
foreach($r as $i) {
	if (isset($rj2[$i])) $json[] = $rj[$i].implode(",", $rj2[$i]).']}' ;
	else $json[] = $rj[$i].']}' ;
}
$tags = array() ;
$t = new tag() ;
$t->select("ORDER BY nom") ;
while ($t->next()) {
	$tags[] = $t->json() ;
}

$lientp = array() ;
$ltp = new lientp() ;
$ltp->select("ORDER BY photo") ;
while ($ltp->next()) {
	$lientp[] = $ltp->json() ;
}

$personnes = array() ;
$p = new personne() ;
$p->select('WHERE num IN ('.implode(",", $auteurs).')') ;
while ($p->next()) {
	$personnes[] = $p->json() ;
}

$json = '{"album":['.implode(",", $json).'], "personnes":['.implode(",", $personnes).'], "tags":['.implode(",", $tags).'], "lientp":['.implode(",", $lientp).']}' ; 
die($json) ;
?>