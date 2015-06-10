<?php
//Site familial - inscription en masse
require_once("../inc/centrale.php") ;

$personnes = array() ;

$lines = file("datas.csv") ;
foreach ($lines as $line_num => $line) {
	$personnes[] = explode(",", $line) ;
}
//$personnes[0] = array("Matthieu", "Duclos", "m@steppe.fr") ;

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: Site familial de Brier <nous.debrier@outlook.fr>' . "\r\n";

for ($i = 0 ; $i < count($personnes) ; $i++) {
	$perso = $personnes[$i] ;
	if ($perso[2] == "") {
		if ($perso[3] != "") {
			$mail = $perso[3] ;
		}
		else $mail = "" ;
	}
	else {
		$mail = $perso[2] ;
	}
	if ($mail != "") {
		$message = '<html><head><title>Inscription sur le site familial des Brier</title></head><body><div>Bonjour à tous,</div>
		<div>Certains d\'entre vous connaissent le site Zankyou de la famille d\'Edouard et Gabrielle de Brier, ouvert en début d\'année 2015 lorsque Claire Crespel, Antoinette de Brier et Alain de Becker ont lancé le projet d\'une fête de famille au Petit Roc, en juillet 2015.</div>
		<div>Ce site Zankyou a une durée de vie limitée à un an, et sera donc supprimé dans quelques mois, automatiquement.</div>
		<div>J\'ai donc cherché une solution : il s\'agit d\'un nouveau site, "Edouard et Gabrielle", dont voici l\'adresse : <a href="https://www.steppe.fr/deBrier/wall/app/">https://www.steppe.fr/deBrier/wall/app/</a>.</div>
		<div>Vous êtes tous chaleureusement invités à y participer, c\'est un site fait pour vous tous !</div>
		<div>Le site n\'est accessible qu\'aux personnes inscrites. Afin de ne pas perdre de temps (la réunion de famille approche), j\'ai fait le choix de tous vous inscrire d\'office. Mais peut-être certains d\'entre vous ne souhaitent-ils pas être inscrits sur ce site ? Si vous êtes dans ce cas, vous pouvez m\'écrire à l\'adresse suivante "nous.debrier@outlook.com" pour demander votre désinscription. Je ferai le nécessaire le plus rapidement possible.</div>
		<div>Vous pouvez désormais vous connecter sur le site</a>, en utilisant votre nom ('.$perso[1].') et votre prénom ('.$perso[0].'). Votre mot de passe provisoire est votre prénom : veillez à le changer rapidement !</div>
		<div>Il est prévu que chacun des inscrits reçoive un mail quotidien (une "newsletter") reprenant les messages postés sur le site depuis le dernier mail (et si aucun message n\'est posté pendant un jour donné, vous ne recevrez pas de mail). Si vous souhaitez modifier ce rythme, ou ne pas recevoir cette "newsletter", vous devez vous rendre sur le site, aller dans la rubrique "mon compte" (en haut à droite) et faire votre choix dans le menu déroulant "newsletter". Tout simplement.</div>
		<div>Enfin, une précision : ce site n\'est pas encore parfaitement opérationnel :</div>
		<div>- il n\'est pas encore possible que chacun d\'entre nous ajoute des photos comme il pouvait le faire sur le site Zankyou. Si vous souhaitez en ajouter, je vous invite à me les faire parvenir à cette adresse "nous.debrier@outlook.com" et Matthieu les ajoutera dès qu\'il en aura la possibilité.</div>
		<div>- l\'arbre généalogique n\'est pas encore mis sur le site.</div>
		<div>- ce site n\'est encore qu\'en français... J\'en suis désolée pour les non francophones, et espère avoir un jour la possibilité de le faire.
		<div>J\'espère que chacun d\'entre vous appréciera ce site. En tout cas, je vous souhaite à tous une bonne découverte, et surtout n\'hésitez pas à me faire des remarques ou suggestions !</div>
		<div></div>
		<div>A très vite,</div>
		<div></div>
		<div>Anne-Sophie.</div>
		<hr>
		<div>Hello everyone,</div>
		<div>Some of you know the Zankyou site of the family of Edouard and Gabrielle Brier, opened in early 2015 when Claire Crespel, Antoinette de Brier and Alain de Becker launched the project of a family party at Petit Roc in July, 2015.</div>
		<div>This site Zankyou has a lifetime limited to one year, and will be removed in a few months, automatically.</div>
		<div>So I looked for a solution: it is a new site, "Edouard and Gabrielle", whose adress is : https://www.steppe.fr/deBrier/wall/app/index.html
		<div>You are all heartily invited to participate, this site is yours !</div>
		<div>The site is only accessible to those registered. In order not to lose time (family reunion approach), I made the choice to register you automatically. But perhaps some of you they do not want to be registered on this site? If you are in this case, you can write me at the following address "nous.debrier@outlook.com" to request your unsubscribe. I will do the necessary as soon as possible.</div>
		<div>You may now access to the website, using your name ('.$perso[1].') and your first name ('.$perso[0].'). Your password is the the same as your first name : please change it quickly.</div>
		<div>Everyone registered receives a daily email (a "newsletter") containing the messages posted on the site since the last e-mail (and if no message is posted for a day, you will not receive mail).
		If you want to change this rate, or not receive this "newsletter", you must visit the site, go to the "My Account" (top right) and select from the popup menu "newsletter". Simply.</div>
		<div>Finally, a clarification: this site is not yet fully operational:</div>
		<div>- It is not possible that each of us adds pictures as he could do it on the site Zankyou. If you want to add, I invite you to send me thoses photos at "nous.debrier@outlook.com". Matthieu will add them as soon as possible.</div>
		<div>- Family tree is not yet placed on the site.</div>
		<div>- This site is still only in French ... I\'m sorry for non french speakers, and hopes one day I have the opportunity to do so.</div>
		<div>I hope each of you will enjoy this site. Anyway, I wish you all a happy discovery. Don\'t hesitate to comments or make suggestions!</div>
		<div></div>
		<div>See you soon,</div>
		<div></div>
		<div>Anne-Sophie. </div>' ;
		mail($mail, "Votre inscription sur le site familial des Brier",  $message, $headers) ;
		$p2 = new personne() ;
		$p2->nom 	= $perso[1];
		$p2->prenom	= $perso[0] ;
		$p2->mail 	= $mail ;
		$p2->newsletter = 1 ;
		$p2->motdepasse = md5($perso[0]) ;
		$p2->admin = 0 ;
		$p2->save() ;

		echo "Inscription de ".$perso[0]." ".$perso[1]." <br/>" ;
	}
	else {
		echo "Je ne peux inscrire ".$perso[0]." ".$perso[1]." qui n'a pas de mail.<br/>" ;
	}
}
?>