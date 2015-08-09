<?php
require_once("../app/head.php") ;
head("Edouard et Gabrielle", []) ;
body() ;
menu() ;
?>
<h2>Généalogie</h2>
<div class="information">Pour un affichage plus confortable, <a href="../pdf/arbre_genealogique.pdf">vous pouvez télécharger l'arbre généalogique</a> ou zoomer dans le document PDF ci-dessous.</div>
<object id="arbre_genealogique" height="400" data="../pdf/arbre_genealogique.pdf" type="application/pdf" title="Arbre généalogique"></object> 




<?php
bottom() ;
die() ;
?>