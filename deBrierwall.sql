-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Dim 31 Mai 2015 à 20:49
-- Version du serveur: 5.5.43-0ubuntu0.14.04.1
-- Version de PHP: 5.5.9-1ubuntu4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `deBrierwall`
--

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `num` int(4) NOT NULL AUTO_INCREMENT,
  `categorie` tinyint(1) NOT NULL,
  `texte` text NOT NULL,
  `pere` int(4) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `auteur` int(4) NOT NULL,
  `creation` date NOT NULL,
  `modification` date NOT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=43 ;

--
-- Contenu de la table `message`
--

INSERT INTO `message` (`num`, `categorie`, `texte`, `pere`, `date`, `auteur`, `creation`, `modification`) VALUES
(1, 1, '<div><b>Maxime de Brier il y a 9 jours\r\n</b></div><div><i>Maxime et Mélanie de Brier</i></div><div>Bonjour à tous, ce 1er mai nous laisse déjà entrevoir le mois de juillet et la rencontre qui nous attend. Nous y serons avec grand plaisir, avec nos 3 garçons : Antonin aura presque 7 ans, Arthur 4,5 ans, et Baptiste 1 an. Ils seront ravis de jouer avec leurs cousin(e)s. Au plaisir de vous revoir ou de faire votre connaissance ! Maxime et Mélanie.</div></div>', 0, '2015-05-01 18:08:16', 2, '2015-05-25', '0000-00-00'),
(2, 1, '<div><b>Bonjour...: Anne de Brier\r</b></div><div><i>Anne de Brier il y a 14 jours\r</i></div><div>Deuxième fille de Robert de Brier ( oncle Bob), et de Paule van Weddingen.\r</div><div>Née le 24 / 11 / 50 à Bruxelles.\r</div><div>Thierry Leroy mon mari est né à Namur le 07 / 03 / 44... et est décédé le 31 juillet 2013 d''un abcès pulmonaire.\r</div><div>Nous avions 41 ans de mariage.\r</div><div>Thierry était architecte (passionné).\r</div><div>J''ai été institutrice maternelle dans un centre de réadaptation pour enfants IMC (infirmité motrice cérébrale) durant toute ma carrière. (1970/2010)\r</div><div>Nous avons deux filles:\r</div><div>Claude Leroy 20 / 11 / 73\r</div><div>Dominique Leroy 06 / 01 / 76\r</div><div>Étant donné que Dominique et son compagnon Rahim Elasri attendent une petite fille pour la mi-juillet il nous est impossible de venir à la fête du "Petit Roc".\r</div><div>Je serai en pensée avec vous tous et vous souhaite de belles retrouvailles.\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(3, 1, '<div><b>Logement\r</b></div><div><i>Thierry de Brier il y a 28 jours\r</i></div><div>Pour le logement, nous avons réservé dans un hôtel à Bergerac (à 20 mn du Petit Roc) C''est l''Europ''hôtel. Hôtel simple mais agréable avec un petit déjeuner sympa et une piscine bien agréable ! www.europ-hotel-bergerac.com/	\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(4, 1, '<div><b>Autres cousins\r</b></div><div><i>Philippe Dachsbeck il y a 1 mois\r</i></div><div>Bonjour, je suis un neveu de Christiane et Ghislain de Brier. Ma maman est la sœur jumelle de "Tante Christiane".\r</div><div>J''ai passé toutes mes vacances au Petit Roc pendant mon enfance avec mes 4 frères et sœur de cœur.\r</div><div>Mon épouse Caroline et nos deux filles Antoinette et Alix habitons à Bruxelles .\r</div><div>Nous serons super heureux de vous retrouver dans ce lieu plein de souvenirs et si bien restauré par Christian et Blandine, nos hotes.\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(5, 1, '<div><b>messe\r</b></div><div><i>Christian de Brier il y a 1 mois\r</i></div><div>Pour ceux qui le souhaitent, il y aura une messe le dimanche matin à 11 h au village d''Eyrenville (500 m du Petit Roc) à l''intention d''Edouard et Gabrielle mais aussi de tous leurs enfants aujourd''hui partis, et pour toute la famille.\r</div><div>L''église sera exceptionnellement ouverte pour nous...\r</div><div>Anne Sophie, merci de le rajouter sur le programme\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(6, 1, '<div><b>Christian et Blandine\r</b></div><div><i>Christian de Brier il y a 1 mois\r</i></div><div>Le 1er mai, nous allons visiter 2 maisons et un appartement à 2 km du Petit Roc, au cas où.\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(7, 1, '<div><b>Merci Christian\r</b></div><div><i>Stéphanie de Halleux il y a 1 mois\r</i></div><div>Bonjour Christian et merci pour votre réponse.\r</div><div>Nous allons contacter Claire de Brier ainsi que l''office du tourisme d''Issigeac et Castillones pour voir s''ils ont d''autres pistes que celles que nous avons trouvé jusqu''à présent. Dominique de Halleux est le frère aîné de mon papa: Bernard de Halleux. Au plaisir de vous rencontrer au mois de juillet et belle journée !\r</div><div>Stéphanie de Halleux\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(8, 1, '<div><b>hébergement\r</b></div><div><i>Christian de Brier il y a 1 mois\r</i></div><div>pour l''hébergement, l''office de tourisme d''Issigeac (5 km du Petit Roc) 0553587962 et Castillonnes ( 7 km du Petit Roc) 0553368744\r</div><div>Claire et Hervé Crespel ont peut-être encore quelques adresses et nous allons essayer d''en voir deux juste à côté en avril...\r</div><div>Christian\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(9, 1, '<div><b>stéphanie de Halleux\r</b></div><div><i>Christian de Brier il y a 1 mois\r</i></div><div>Stéphanie, es tu fille de Claude et Dominique ? Christian de Brier\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(10, 1, '<div><b>hébergement\r</b></div><div><i>Christian de Brier il y a 1 mois\r</i></div><div>Bonjour\r</div><div>En attendant que la rubrique "hébergement" soit alimentée, Claire Crespel (fille de Robert de Brier) et Hervé son mari ont sillonné pour tous les alentours et ont de multiples adresses à conseiller.\r</div><div>claire.debrier@ichec.be\r</div><div>Christian\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(11, 1, '<div><b>Recherche Gite dans la région\r</b></div><div><i>Charles (1982) de Brier il y a 1 mois\r</i></div><div>Bonjour,\r</div><div>Je suis Stéphanie de Halleux, épouse de Charles de Brier qui est le fils de Pascale de Brier. Nous serons de la partie pour la grande réunion de famille et nous en réjouissons. Nous vous écrivons car nous sommes à la recherche d''un gîte dans les environs de la réunion de famille et jusqu''à présent, nous ne trouvons pas grand chose. Pour ceux qui vivent dans la région ou ont déjà trouvé un hébergement, pourriez-vous partager vos bonnes adresses? Un grand merci et au plaisir de vous rencontrer ! Stéphanie de Halleux - de Brier\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(12, 1, '<div><b>DC et d''ailleurs\r</b></div><div><i>Guillaume de Brier il y a 1 mois\r</i></div><div>Bonjour à tous,\r</div><div>On se réjouit de tous vous voir et revoir cet été! C''est une super initiative. Grand Merci aux organisateurs. Je suis Guillaume (de Brier, of course, fils de Jif, petit-fils de Robert de Brier et Paule van Weddingen). Je viendrai avec ma femme Kate. On s''est marié le 2 janvier dans le Massachusetts. On vient juste de déménager à Washington DC car Kate a trouvé un super poste (ça nous apprendra à rencontrer des gens intelligents . Elle travaille pour Promundo, une organisation qui travaille pour les droits de la femme à travers l''implication des hommes. Quant à moi, en attente de la fameuse green card, je m''occupe de mon documentaire Obama''s Law (www.obamaslaw.com), qui traite des mines au Congo et de la vision erronée occidentale des conflits de minerais. Avant DC, nous étions tous les deux au Rwanda, où on s''est rencontré, on travaillait pour ONUSIDA. Au plaisir de vous voir!!!\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(13, 1, '<div><b>MYRIAM DEBRIER RUSSELL\r</b></div><div><i>myriam debrier russell il y a 1 mois\r</i></div><div>BONJOUR, JE SUIS MYRIAM DE BRIER- RUSSELL FILLE DR ROBERT DE BRIER ET DE PAULE VAN WEDDINGEN, DERNIERE DE 5 ENFANTS, NEE A BRUXELLES LE 28 MAI 1960. JE VIENDRAI CET ETE AVEC MON MARI PETE RUSSELL ET MA PETITE FILLE ZOE QUI AURA 7 ANS, SVP PRATIQUE VOTRE ANGLAIS CAR ELLE NE PARLE PAS FRANCAIS. NOUS HABITONS AU TEXAS, OU JE SUIS INFIRMIERE ET PETE EST DANS LE TRANSPORT.\r</div><div>NOUS AVONS DEUX ENFANTS, MORGANE QUI EST INSTITUTRICE , MARIEE A DYLAN RODIEK QUI ONT DEUX FILLES ZOE 7 ANS ET CLAIRE QUI A 7 MOIS, NOUS AVONS AUSSI MARTIN QUI EST CHEF AU HYATT A BEAVER CREEK AU COLORADO QUI NE POURRA PAS NON PLUS VENIR.\r</div><div>ON SE REJOUIT DE REVOIR TOUT LE MONDE ET DE MONTRER LA TOUR EIFFEL A ZOE !!!!\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(14, 1, '<div><b>cousinade\r</b></div><div><i>Charles (1955) de Brier il y a 2 mois\r</i></div><div>bonjour\r</div><div>je suis Charles,fils ainé de Ghislain de Brier et de Christiane. Né le 10 Avril 1955 au Congo ,tout comme mon frère Thierry, j''avais donc 6 ans quand nous sommes arrivés au Petit Roc. je suis l''ainé de quatre enfants, suivent Thierry,Christian et Marie - Christine. Habitant a l''Isle sur la Sorgue ,dans le Vaucluse , depuis plus de 15 ans, je suis marié avec Béatrice et avons quatre enfants : Anne-Sophie,Gaetan, Gratiane et Henrik. Je travaille dans le secteur agro-alimentaire et plus précisément celui du fromage, et Béatrice dans l''éducation nationale. Nous nous réjouissons à l''idée de nous retrouver, - ou de faire connaissance !- l''été prochain au Petit Roc, pour cette belle réunion de famille. Charles.\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(15, 1, '<div><b>bonjour\r</b></div><div><i>gratiane de brier il y a 2 mois\r</i></div><div>Bonjour,\r</div><div>Gratiane, fille de Charles et Béatrice de Brier, petite fille de Ghislain et Christiane, j''ai 29 ans et vis à Marseille depuis 4 ans et où je suis médecin.\r</div><div>Je me réjouis de cette grande réunion de famille dont l''idée avait germé il y a plusieurs années.\r</div><div>merci aux organisateurs et aux créateurs du site\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(16, 1, '<div><b>Thierry de Brier\r</b></div><div><i>Thierry de Brier il y a 2 mois\r</i></div><div>Bonjour,\r</div><div>Je suis Thierry, fils de Ghislain de Brier et de Christiane. Je suis né le 1er février 1957 au Congo et, avec mon frère ainé Charles, nous avons découvert le Petit Roc le 11 février 1961 !\r</div><div>Avec Christine , mon épouse, nous habitons depuis 17 ans à Gap dans les Hautes Alpes après avoir vécu à Paris (où est née Florence), Aix en Provence (où est née Amélie) puis Avignon (où est née Elise). Nous avons 2 petits fils : Gabriel et Alban.\r</div><div>Après avoir travaillé pendant plus de 30 ans dans la production de boissons et d''eau minérale, je viens de prendre la responsabilité d''une société de Travail Temporaire d''Insertion. Christine exerce le métier de secrétaire documentaliste dans une association qui met en avant le patrimoine historique et culturel du département des Hautes Alpes. Elle est passionnée de généalogie, reliure et adore la montagne et la lecture. En ce qui me concerne, la photographie est une de mes grandes passions. J''aime profiter de la montagne qui nous entoure.\r</div><div>Je me réjouis de participer bientôt à cette grande réunion de famille !!!\r</div><div>Thierry\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(17, 1, '<div><b>Florence de Brier\r</b></div><div><i>Florence CASSAGNE il y a 2 mois\r</i></div><div>Bonjour à tous,\r</div><div>Je suis Florence Cassagne (née de Brier), je suis la fille ainée de Thierry de Brier, petite -fille de Ghislain.\r</div><div>Je serais là en juillet au petit Roc avec mon mari Florent Cassagne, qui est professeur de physique-chimie, et mes deux petits garçons : Gabriel 4 ans et Alban qui aura 1 an.\r</div><div>Nous vivons à Peynier dans le sud de la France et je suis orthophoniste.\r</div><div>Je me réjouis d''avance de cette belle réunion de famille et je salue au passage les créateurs de ce site ! Bravo !\r</div><div>A très vite !\r</div><div>Florence\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(18, 1, '<div><b>photos anciennes du Petit Roc\r</b></div><div><i>Charles (1955) de Brier il y a 2 mois\r</i></div><div>que de souvenirs qui reviennent en mémoire!.Charles.\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(19, 1, '<div><b>Rubrique "participants" 2\r</b></div><div><i>Anne-Sophie il y a 2 mois\r</i></div><div>Si les Bruxellois et les Américains souhaitent plus de précision quant à leur emplacement indiqué sur les cartes (rubrique "participants"), qu''ils n''hésitent pas à me donner leurs adresses !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(20, 1, '<div><b>Rubrique "participants"\r</b></div><div><i>Anne-Sophie (modifier votre profil) il y a 2 mois\r</i></div><div>Avec le soutien technique indispensable de Matthieu, j''ai complètement revu la rubrique "participants" du site. Je vous laisse découvrir.\r</div><div>Normalement, tous ceux qui se sont signalés comme participants sont mentionnés ; mais il se peut que j''en ai oublié quelques-uns, ou que d''autres se manifestent à l''avenir : n''hésitez pas à me faire part de tout cela !\r</div><div>Et s''il y a des erreurs (de nom, de génération, de famille, etc...), surtout dites-le moi pour que je rectifie !\r</div><div>Vous pouvez toujours adresser vos messages sur ce forum, ou alors utiliser la boite mail que j''avais créé pour le site (nous.debrier@outlook.com).\r</div><div>Bonne découverte !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(21, 1, '<div><b>Pascale de Brier\r</b></div><div><i>Charles de Brier il y a 2 mois\r</i></div><div>Bonjour à tous,\r</div><div>Bravo pour ce merveilleux site web qui nous rassemble déjà tous avant les grandes retrouvailles. Je suis Pascale de Brier, fille de Henri et Colette de Brier, et petite fille d''Edouard et Gabrielle de Brier. J''ai un fils, Charles de Brier (32 ans), qui est marié avec ma belle-fille Stéphanie de Halleux (31 ans). Ensemble, ils ont une adorable petite fille Alix qui a 18 mois. Charles est ingénieur en géotechnique et Stéphanie est gestionnaire de projets dans le domaine de la coopération au développement. Nous nous réjouissons de vous rencontrer à l''occasion de cette formidable opportunité de rassemblement familial.\r</div><div>À bientôt !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(22, 1, '<div><b>Elise de Brier\r</b></div><div><i>Elise de Brier il y a 2 mois\r</i></div><div>Je suis Elise de Brier (fille de Thierry de Brier et petite-fille de Ghislain), je suis étudiante en psychologie et je tente depuis l''an dernier les concours pour entrer en école de psychomotricien. \r</div><div>A très bientôt !! Elise\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(23, 1, '<div><b>Marie-Laure et Gaëtan de Brier\r</b></div><div><i>nous de brier il y a 2 mois\r</i></div><div>- Gaëtan de Brier (fils de Charles, petit-fils de Ghislain, arrière petit-fils d''Edouard) : je serai là en juillet prochain en compagnie de ma chère épouse Marie-Laure ! Je suis le deuxième des quatre enfants de Charles et Béatrice de Brier et suis informaticien dans une société de service à côté de Lille. Marie-Laure est Orthophoniste.\r</div><div>A très vite !!!!\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(24, 1, '<div><b>Bruno\r</b></div><div><i>Bruno de Becker il y a 3 mois\r</i></div><div>Bruno de Becker : 2ème fils de Mithy de Brier (4ème sur la 1ere photo -où tante Pouce -Hélène- la plus jeune est manquante et sur la 4ème photo de l’album) et de Daniel de Becker.\r</div><div>    Merci à toutes & tous pour ces présentations qui ne manquent pas de nous rafraîchir la mémoire…\r</div><div>    Papa de 5 enfants (32 à 25 ans):\r</div><div>    *Quentin qui sera absent au Petit Roc, va se marier avec Cristina en août prochain.\r</div><div>    Il vit à Toronto (Canada) et y enseigne le français et l’histoire.\r</div><div>    *Geoffroy qui a épousé Laura l’été dernier, ne pourra venir également.\r</div><div>    Il travaille dans la consultance financière.\r</div><div>    *Guerric (Coordinateur chez SITA) et son amie Élodie vont essayer de se joindre à nous en juillet.\r</div><div>    *Loic qui ne pourra venir, a terminé ses études de Marketing.\r</div><div>    *Laurie est kinésithérapeute depuis septembre, mariée à Mehdi (Diplômé de Sciences Po) depuis l’été dernier aussi.\r</div><div>    Nous vivons entre Bruxelles principalement et Uzès où nous profitons du climat gardois quelques semaines par an.\r</div><div>    Pour ma part, je suis actif dans l’immobilier à Bruxelles.\r</div><div>    Ma compagne, Lilou est « Credit Risk Analyst Midcorp » chez ING.\r</div><div>    Nous nous réjouissons de vous retrouver nombreux cet été.\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(25, 1, '<div><b>été 2015\r</b></div><div><i>Charles (1955) de Brier il y a 3 mois\r</i></div><div>hello!\r</div><div>quelle joie de se retrouver plusieurs années après, sur un lieu rempli de merveilleux souvenirs...j''ai hâte d''y être !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(26, 1, '<div><b>COUCOU\r</b></div><div><i>Béatrice de Brier il y a 3 mois\r</i></div><div>Charles (fils ainé de Ghislain et Christiane) et Béatrice. Nous sommes installés à l''Isle sur la Sorgue depuis juillet 2000. Nous avons quatre enfants :\r</div><div>    Anne Sophie et Matthieu ; installés à Lille\r</div><div>    Gaetan et Marie-Laure : installés à Lambersart banlieue de Lille\r</div><div>    Gratiane vit à Marseille\r</div><div>    Henrik installé à Avignon\r</div><div>    Nous serons ravis de vous retrouver en Dordogne au cours de l''été prochain département que nous connaissons bien puisque nous y retournons chaque été.\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(27, 1, '<div><b>merci\r</b></div><div><i>Christian de Brier il y a 3 mois\r</i></div><div>Merci surtout à Antoinette, Claire (et Hervé discret mais très présent), Alain et Anne-Sophie qui déploient tant d''énergie pour préparer...\r</div><div>Christian\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(28, 1, '<div><b>Chantal d''Everlange\r</b></div><div><i>Chantal d''Everlange il y a 3 mois\r</i></div><div>Bonjour à tous, un petit mot pour vous dire toute la joie de vous retrouver lors de cette belle fête de famille que vous avez eu la bonne idée d''organiser, et merci tout d''abord à Christian et Blandine de nous accueillir au petit Roc! Pour les petits cousins qui me ne me connaissent pas, je vais essayer de me présenter : je suis tout d''abord l''aînée de tous les cousins (cela me fout un coup!!!) fille de Renée et Jean-Marie (qui elle même était l''aînée de bon papa et bonne maman). Je vis depuis mon mariage avec Jacques (d''Everlange) dans le midi de la France à Uzès dans le Gard après avoir vécu à Nîmes lorsque Jacques travaillait . J''ai trois enfants, Amaury qui sera certainement là (2 enfants Quentin 16 ans et Alphonse 14 ans). Anne-Sophie qui vit à San Francisco (2 enfants Joy 9 ans et Alexandre 7 ans ) qui seront là en principe et Tanguy (Léopold 5ans et Thalésie 3ans) je ne sais encore si ils seront là , je les vois très bientôt pour les vacances de février , j''en saurai plus!! Je suis à Verbier pour le moment dès mon retour j''envoie ma contribution à Antoinette . Je reprends contact avec vous et vous embrasse tous..... Chantal\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(29, 1, '<div><b>Christian et Blandine\r</b></div><div><i>Christian de Brier il y a 3 mois\r</i></div><div>Bonjour\r</div><div>Christian, fils de Ghislain de Brier (et Christiane), marié avec Blandine. Nous avons 2 filles Elvire (elle aura 16 ans et Adrienne 13 ans et demi).\r</div><div>Je vis à Paris, suis médecin (médecin légiste, expert scènes de crimes, et médecin urgentiste - généraliste) et Blandine, journaliste, est actuellement co-gérante de sa propriété familiale à Saint-Emilion où elle doit se rendre fréquemment (Château Figeac - propriété achetée avec la dot de son arrière grand-mère belge, Henriette de Chèvremont, originaire de Herstal à côté de Liège... Nos grands-parents étaient de Liège).\r</div><div>Nous avons repris le Petit Roc après le décès de mon père Ghislain. La maison est encore en travaux, non finie (pas de vraie cuisine, pas d''électricité partout...), mais nous serons heureux d''y accueillir tout le monde. Nombreux sont nos cousins qui y sont venus enfants, les petits enfants de Edouard et Gabrielle. C''était une fête pour nous de voir passer tous ces cousins. Et ce sera une nouvelle joie de voir tout le monde débarquer avec une ou deux nouvelles générations !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(30, 1, '<div><b>La Cousinade\r</b></div><div><i>Dominique De Clerck il y a 3 mois\r</i></div><div>Bonjour a tous ,\r</div><div>Nous sommes Yves et Dominique De Clerck-de Brier. Je suis le fille de Robert (Bob), fils d''Edouard et de Gaby. Yves est pédiatre/oncologue à Los Angeles, je suis infirmière pédiatrique dans le même hôpital. Nous avons cing fils Fabrice (Écologiste à Montpellier) son épouse Rachelle géologue à Montpellier ; Sébastien (prof de français et italien en Californie) son épouse Tania (prof d''espagnol) ; Matthieu (MD en Californie) son épouse Britt dermatologue ; Thomas (photographe en Californie) et Damien (MSF à New York), son épouse Meagan (artiste).\r</div><div>    Fabrice, Sebastien, Matthieu et Damien sont mariés et ont des enfants :\r</div><div>    Fabrice et Rachelle : Camden et Chloe.\r</div><div>    Sebastien et Tania : Naomi, Yves et Adrienne\r</div><div>    Matthieu et Britt : Lily et Mason\r</div><div>    Damien et Meagan : bébé en route pour le mois d''aout.\r</div><div>Je crois que nous viendrons tous à part les jeunes maries qui seront presque prêts a accueillir leur premier. Nous nous réjouissons de faire plus ample connaissance avec tout le monde et en attendant j''aime beaucoup vous découvrir petit a petit cela me permet d''avoir une longueur d''avance sur le weekend et de retenir un peu plus !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(31, 1, '<div><b>Bonjour!\r</b></div><div><i>Fabrice DeClerck il y a 3 mois\r</i></div><div>Nous nous réjouissons de faire vos connaissances - Fabrice et Rachelle DeClerck - fils aine de Dominique deBrier (fille de Robert deBrier, fils d''Edouard) avec nos petits Camden et Chloe DeClerck (expatries en France via Belgique, Canada, Los Angeles, Liège, Los Angeles, New York, Kenya, Costa Rica, et maintenant avec des racines a Montpellier !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(32, 1, '<div><b>amélioration du site\r</b></div><div><i>Anne-Sophie de Brier il y a 3 mois\r</i></div><div>merci à tous pour vos visites ! Le site étant en cours d''amélioration, surtout n''hésitez pas à faire des remarques\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(33, 1, '<div><b>de Bruxelles\r</b></div><div><i>Bruno de Becker il y a 3 mois\r</i></div><div>Merci Anne-Sophie pour cette belle idée de site!\r</div><div>Merci aussi à Christian et Blandine et tous les autres...\r</div><div>Me réjouis de vous retrouver nombreux en juillet.\r</div><div>Bruno (fils de Mithy, fille d''Edouard)\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(34, 1, '<div><b>anne-sophie de brier il y a 3 mois\r</b></div><div><i>Bonjour Bruno,\r</i></div><div>Je fais quelques tests, pour savoir si cela pose pb ou non de s''inscrire sur le site en utilisant ses coordonnées perso (et tu es le seul à avoir tenté l''aventure !) : as-tu reçu des mails du site Zankyou depuis ton inscription ?\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(35, 1, '<div><b>C''est parti !\r</b></div><div><i>nous de brier il y a 3 mois\r</i></div><div>Je suis impatient !!! Thierry\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(36, 1, '<div><b>Super\r</b></div><div><i>nous de brier il y a 3 mois\r</i></div><div>Merci Anne-Sophie ! Cela manquait à l''organisation de ce jour qui, je l''espère, restera inoubliable.   Ch de B\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(37, 1, '<div><b>MERCI !\r</b></div><div><i>nous debrier il y a 3 mois\r</i></div><div>Merci à Anne-Sophie de nous avoir ouvert ce site, faisons le vivre à fond !\r</div><div></div>', 0, '2015-04-30 22:00:00', 2, '2015-05-25', '0000-00-00'),
(39, 1, '<div><b>Jérôme van der Bruggen</b></div>\r\n<div>Eugénie et Jérôme van der Bruggen (petit-fils de Renée). Quelle joie de prendre des nouvelles de vous tous en parcourant les photos et en lisant les messages. Merci Claire, Anne-Sophie, Alain et Antoinette. Eugénie et moi ne pourrons malheureusement pas venir car il nous est impossible de déplacer tout le monde à cette date (nous avons 5 enfants dont quelques petits) mais serons de tout cœur avec vous. Papa (Emmanuel van der Bruggen) nous représentera.</div>', 0, '2015-05-01 18:12:10', 2, '2015-05-25', '0000-00-00');

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE IF NOT EXISTS `pays` (
  `num` int(4) NOT NULL AUTO_INCREMENT,
  `nom` varchar(80) NOT NULL,
  `drapeau` varchar(250) NOT NULL,
  `creation` date NOT NULL,
  `modification` date NOT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `pays`
--

INSERT INTO `pays` (`num`, `nom`, `drapeau`, `creation`, `modification`) VALUES
(1, 'France', '', '2015-05-24', '0000-00-00'),
(2, 'Belgique', '', '2015-05-24', '0000-00-00'),
(3, 'Italie', '', '2015-05-24', '0000-00-00'),
(4, 'Etats-Unis', '', '2015-05-24', '0000-00-00'),
(5, 'Canada', '', '2015-05-31', '0000-00-00');

-- --------------------------------------------------------

--
-- Structure de la table `personne`
--

CREATE TABLE IF NOT EXISTS `personne` (
  `num` int(4) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `mail` varchar(250) NOT NULL,
  `date_naissance` date NOT NULL,
  `lieu_naissance` varchar(250) NOT NULL,
  `adresse` varchar(250) NOT NULL,
  `ville` varchar(250) NOT NULL,
  `pays` tinyint(1) NOT NULL,
  `newsletter` tinyint(1) NOT NULL,
  `motdepasse` varchar(50) NOT NULL,
  `admin` enum('0','1') NOT NULL,
  `creation` date NOT NULL,
  `modification` date NOT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=84 ;

--
-- Contenu de la table `personne`
--

INSERT INTO `personne` (`num`, `nom`, `prenom`, `mail`, `date_naissance`, `lieu_naissance`, `adresse`, `ville`, `pays`, `newsletter`, `motdepasse`, `admin`, `creation`, `modification`) VALUES
(1, 'de Brier', 'Anne-Sophie', 'asdebrier@gmail.com', '1981-09-25', 'Bergerac', '14 rue Emile Desmet', 'Lille', 1, 1, '5dfe3a35dfd0979a8850110d8d8bb53d', '1', '2015-05-24', '2015-05-30'),
(2, 'inconnu', 'auteur', '', '0000-00-00', '', '', '', 0, 0, '', '', '2015-05-25', '0000-00-00'),
(3, 'de Brier', 'Gaetan', 'gaetandebrier@gmail.com', '1982-10-21', 'Bergerac', '', '', 1, 1, '4ff2ce4bf6c248ba5da484556f7781fd', '1', '2015-05-25', '0000-00-00'),
(4, 'Duclos', 'Matthieu', 'm@steppe.fr', '0000-00-00', '', '', '', 0, 1, '109cf79f60f04e5380a5d8c00ff486d4', '', '2015-05-31', '0000-00-00'),
(5, 'Bioul – d''Everlange', 'Chantal', 'c.deverlange@orange.fr', '0000-00-00', '', '', '', 0, 1, 'c2447a59b384c152b790c1fd32a6236f', '0', '2015-05-31', '0000-00-00'),
(6, 'd''Everlange', 'Amaury', 'Amaury.deverlange@gmail.com', '0000-00-00', '', '', '', 0, 1, '433e8a3ab4604fcecdf21fd256f60cfa', '0', '2015-05-31', '0000-00-00'),
(7, 'd''Everlange – Denève', 'Anne-Sophie', 'deverlange@yahoo.com', '0000-00-00', '', '', '', 0, 1, 'a33df4c0eb458c344f8ff94cce8c3e3b', '0', '2015-05-31', '0000-00-00'),
(8, 'd''Everlange', 'Tanguy', 'tanguydeverlange@gmail.com ', '0000-00-00', '', '', '', 0, 1, 'bf693e5ec8517b8c486f89d296b83823', '0', '2015-05-31', '0000-00-00'),
(9, 'van der Bruggen', 'Emmanuel', 'manuvdbruggen@gmail.com', '0000-00-00', '', '', '', 0, 1, '5ff7ca568760a1bf9e8d01d0a3f0748d', '0', '2015-05-31', '0000-00-00'),
(10, 'van der Bruggen', 'Jérôme', 'jerome.vanderbruggen@petercam.be', '0000-00-00', '', '', '', 0, 1, '58e7ab36b316c0efa401c8c343295d4f', '0', '2015-05-31', '0000-00-00'),
(11, 'van der Bruggen', 'Gaétan', 'gaetan.vanderbruggen@gmail.com', '0000-00-00', '', '', '', 0, 1, '8f9c003db458db22d08db804e587c183', '0', '2015-05-31', '0000-00-00'),
(12, 'van der Bruggen', 'Matthieu', 'mvdb@me.com', '0000-00-00', '', '', '', 0, 1, '109cf79f60f04e5380a5d8c00ff486d4', '0', '2015-05-31', '0000-00-00'),
(13, 'Bioul', 'Philippe', 'ph.bioul@telenet.be', '0000-00-00', '', '', '', 0, 1, 'f7f861681aecb18f4c96fa62eabb43ee', '0', '2015-05-31', '0000-00-00'),
(14, 'Bioul – Bégault', 'Bénédicte', 'benebegault@hotmail.com', '0000-00-00', '', '', '', 0, 1, '86cd9cdd8582726fc301928b764a236f', '0', '2015-05-31', '0000-00-00'),
(15, 'de Brier – De Clerck', 'Dominique ', 'ddeclerck@me.com', '0000-00-00', '', '', '', 0, 1, '7487431d74ac2d17a9d63123672a4bdf', '0', '2015-05-31', '0000-00-00'),
(16, 'De Clerck', 'Yves (Albert)', 'yves.deckerck@cell.ucl.ac.be', '0000-00-00', '', '', '', 0, 1, 'bb66dec1fc7bf8fa54a7d47d4ac49449', '0', '2015-05-31', '0000-00-00'),
(17, 'De Clerck', 'Fabrice', 'fadeclerck@mac.com', '0000-00-00', '', '', '', 0, 1, 'a36c7021a0c846bfec9c2ad50580b1fb', '0', '2015-05-31', '0000-00-00'),
(18, 'Rounsaville - De Clerck', 'Rachelle', 'rivergecko@mac.com', '0000-00-00', '', '', '', 0, 1, 'bc45efddc288388f8b6096d065ddc436', '0', '2015-05-31', '0000-00-00'),
(19, 'De Clerck', 'Sébastien', 'tania_sebastien@hotmail.com', '0000-00-00', '', '', '', 0, 1, 'f25fc0df3406ff89f172dc7c70794835', '0', '2015-05-31', '0000-00-00'),
(20, 'De Clerck', 'Matthieu', 'matthieu_declerck@hotmail.com', '0000-00-00', '', '', '', 0, 1, '109cf79f60f04e5380a5d8c00ff486d4', '0', '2015-05-31', '0000-00-00'),
(21, 'Kaufman - De Clerck', 'Britt', 'brittneykaufman@hotmail.com', '0000-00-00', '', '', '', 0, 1, 'efc78f280453936f30bcf95a93fec2e8', '0', '2015-05-31', '0000-00-00'),
(22, 'De Clerck', 'Thomas', 'thomasdeclerck@me.com', '0000-00-00', '', '', '', 0, 1, '2042101ac1f6e7741bfe43f3672e6d7c', '0', '2015-05-31', '0000-00-00'),
(23, 'De Clerck', 'Damien', 'damien.declerck@gmail.com', '0000-00-00', '', '', '', 0, 1, '86ed8f9ff7cd264dd2080ff10ead0320', '0', '2015-05-31', '0000-00-00'),
(24, 'de Brier – Leroy', 'Anne', 'anne.debrier@hotmail.fr', '0000-00-00', '', '', '', 0, 1, '19fdf51d7001bd6430bc30fcaaa570c5', '0', '2015-05-31', '0000-00-00'),
(25, 'Leroy', 'Dominique ', 'dom6176@gmail.com', '0000-00-00', '', '', '', 0, 1, '7487431d74ac2d17a9d63123672a4bdf', '0', '2015-05-31', '0000-00-00'),
(26, 'Leroy', 'Claude', 'Claude.Leroy@ibz.fgov.be', '0000-00-00', '', '', '', 0, 1, '892ea6abc9dfd41e8af50ff55705e9f4', '0', '2015-05-31', '0000-00-00'),
(27, 'de Brier', 'Jean-François', 'jifdebrier54@yahoo.fr', '0000-00-00', '', '', '', 0, 1, '4f42775c609f2e7182ac6d9f05a67bd6', '0', '2015-05-31', '0000-00-00'),
(28, 'de Maupeou – de Brier', 'Antoinette', 'familledebrier@yahoo.fr', '0000-00-00', '', '', '', 0, 1, '5fad747662b3bb9a2feaa4f95d760071', '0', '2015-05-31', '0000-00-00'),
(29, 'de Brier', 'Maxime', 'maximedebrier@yahoo.fr', '0000-00-00', '', '', '', 0, 1, '29fa6fea3fb6a0b220cafa56634e860c', '0', '2015-05-31', '0000-00-00'),
(30, 'Louviaux', 'Mélanie', 'melalouviaux@yahoo.fr', '0000-00-00', '', '', '', 0, 1, 'def1b0de75043eedc9c10f287c813548', '0', '2015-05-31', '0000-00-00'),
(31, 'de Brier', 'Guillaume', 'guillaumedebrier@yahoo.fr', '0000-00-00', '', '', '', 0, 1, 'e657bb4805a678895d4ff7594763157b', '0', '2015-05-31', '0000-00-00'),
(32, 'Doyle', 'Kate', 'kate.etta.doyle@gmail.com', '0000-00-00', '', '', '', 0, 1, 'a6cb3dfcedc2356766917ede95a12a23', '0', '2015-05-31', '0000-00-00'),
(33, 'de Brier', 'Charlotte', 'charlottedebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, '7647b2d875a94093cbc99f6f2cbfda77', '0', '2015-05-31', '0000-00-00'),
(34, 'Gallois', 'Damien', 'lamidambe@hotmail.com', '0000-00-00', '', '', '', 0, 1, '86ed8f9ff7cd264dd2080ff10ead0320', '0', '2015-05-31', '0000-00-00'),
(35, 'de Brier – Crespel', 'Claire', 'claire.debrier@ichec.be', '0000-00-00', '', '', '', 0, 1, '2e442d9bae67dbe9b4e4eb0ce93c0028', '0', '2015-05-31', '0000-00-00'),
(36, 'Crespel', 'Hervé', 'rv.crespel@skynet.be', '0000-00-00', '', '', '', 0, 1, '47a644942a987c51fb470cb034da19e2', '0', '2015-05-31', '0000-00-00'),
(37, 'Crespel', 'Quentin ', 'quentin.crespel@live.be', '0000-00-00', '', '', '', 0, 1, '4728a0aed949837a13189c640a6944b3', '0', '2015-05-31', '0000-00-00'),
(38, 'de Brier – Russel', 'Myriam', 'P3 MRUSSELL11@AOL.COM', '0000-00-00', '', '', '', 0, 1, '3c16959c333088df959bf1feef45bc57', '0', '2015-05-31', '0000-00-00'),
(39, 'de Brier', 'Charles (1955)', 'charles2brier@gmail.com', '0000-00-00', '', '', '', 0, 1, 'b3e74795e1cae2cae63f9e7b58a4cc61', '0', '2015-05-31', '0000-00-00'),
(40, 'Rokvam – de Brier', 'Béatrice', 'beatricedebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, '60688cb3abb034b7317c7aed4bf55f9e', '0', '2015-05-31', '0000-00-00'),
(41, 'Torris - de Brier', 'Marie-Laure', 'mldebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, '6c1d157fdcec75487a39429319504135', '0', '2015-05-31', '0000-00-00'),
(42, 'de Brier', 'Gratiane', 'gdebrier@yahoo.fr', '0000-00-00', '', '', '', 0, 1, 'ba626ccb799867c3f0fabc05d657235e', '0', '2015-05-31', '0000-00-00'),
(43, 'de Brier', 'Henrik', 'h.debrier@outlook.fr', '0000-00-00', '', '', '', 0, 1, '704ca1d7a836fc9de20e812201fb28c4', '0', '2015-05-31', '0000-00-00'),
(44, 'de Brier', 'Thierry', 'thierrydebrier@neuf.fr', '0000-00-00', '', '', '', 0, 1, 'ede121586bc3caee66f4cee899f73585', '0', '2015-05-31', '0000-00-00'),
(45, 'de Brier', 'Christine', 'christinedebrier@neuf.fr', '0000-00-00', '', '', '', 0, 1, 'b23d4c8084990d65b1904efa034881d3', '0', '2015-05-31', '0000-00-00'),
(46, 'De Brier – Cassagne', 'Florence', 'flodebrier@hotmail.com', '0000-00-00', '', '', '', 0, 1, 'bbf5e1be3178100ef6a81c2e4ba0304e', '0', '2015-05-31', '0000-00-00'),
(47, 'Cassagne', 'Florent', 'florentcassagne@hotmail.com', '0000-00-00', '', '', '', 0, 1, '6de346fcfd5d365185f5273fc40a420d', '0', '2015-05-31', '0000-00-00'),
(48, 'de Brier', 'Amélie ', 'adebrier@hotmail.fr', '0000-00-00', '', '', '', 0, 1, 'ca0876d269499bd108395608677ae979', '0', '2015-05-31', '0000-00-00'),
(49, 'de Brier', 'Élise', 'debrier.e@gmail.com', '0000-00-00', '', '', '', 0, 1, 'a7ef444cc8c4b5155fdc537cdcca132f', '0', '2015-05-31', '0000-00-00'),
(50, 'de Brier', 'Christian', 'christiandebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, 'db6017bd1f27118d44083a172a82409f', '0', '2015-05-31', '0000-00-00'),
(51, 'de Brier', 'Blandine', 'blandinedebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, '595b566992a2f0b968f91e76be17e1ab', '0', '2015-05-31', '0000-00-00'),
(52, 'de Brier', 'Marie Christine', 'mariedebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, 'f40bb144f2b25dfb1cf94e6071b30880', '0', '2015-05-31', '0000-00-00'),
(53, 'Felix', 'Tristan', 'trist1@hotmail.fr', '0000-00-00', '', '', '', 0, 1, 'ab76c54cd22d18630bcb8c4db80d4891', '0', '2015-05-31', '0000-00-00'),
(54, 'Dachsbeck', 'Philippe', 'philippe@dachsbeck.com', '0000-00-00', '', '', '', 0, 1, 'f7f861681aecb18f4c96fa62eabb43ee', '0', '2015-05-31', '0000-00-00'),
(55, 'Voos – Dachsbeck', 'Caroline', 'caroline@dachsbeck.com', '0000-00-00', '', '', '', 0, 1, '80d4d410d6b330bc2015e461e6b6b78d', '0', '2015-05-31', '0000-00-00'),
(56, 'Dachsbeck', 'Alix', 'alix@dachsbeck.com', '0000-00-00', '', '', '', 0, 1, '8d230b81f13b07e2df210f7351f1f97c', '0', '2015-05-31', '0000-00-00'),
(57, 'de Becker', 'Alain', 'adb300@skynet.be', '0000-00-00', '', '', '', 0, 1, '163f0dda0338e504f0a2ffc8abac45a2', '0', '2015-05-31', '0000-00-00'),
(58, 'de Becker', 'Laurence', 'laurence.hofmandb@skynet.be', '0000-00-00', '', '', '', 0, 1, '9bf95b99f5b1b6c9a2293cea0865db53', '0', '2015-05-31', '0000-00-00'),
(59, 'de Becker', 'Felixe', 'felixedebecker@gmail.com', '0000-00-00', '', '', '', 0, 1, 'bcc307e77bedce1fa3176a95b861a10f', '0', '2015-05-31', '0000-00-00'),
(60, 'de Becker', 'Alexandre', 'alexandredebecker@hotmail.com', '0000-00-00', '', '', '', 0, 1, '06a05b13819f4afad991cc2143732b66', '0', '2015-05-31', '0000-00-00'),
(61, 'de Becker', 'Blandine', 'blandinedebecker@gmail.com', '0000-00-00', '', '', '', 0, 1, '595b566992a2f0b968f91e76be17e1ab', '0', '2015-05-31', '0000-00-00'),
(62, 'de Becker', 'Bruno', 'bdb300@hotmail.com', '0000-00-00', '', '', '', 0, 1, '9b2b78033ecf0401a2feab5b4ba7462e', '0', '2015-05-31', '0000-00-00'),
(63, 'Augarde', 'Liliane', 'liliane.augarde@gmail.com', '0000-00-00', '', '', '', 0, 1, '493540c3de6642c5e1faf02388cc08cd', '0', '2015-05-31', '0000-00-00'),
(64, 'de Becker', 'Quentin', 'quentin.debecker@gmail.com', '0000-00-00', '', '', '', 0, 1, 'e232baabf13fa4b5812c837c7cfb9026', '0', '2015-05-31', '0000-00-00'),
(65, 'Cornejo', 'Cristina', 'negritacornejo@hotmail.com', '0000-00-00', '', '', '', 0, 1, '7fff1e89740665f84662c9e492ec691c', '0', '2015-05-31', '0000-00-00'),
(66, 'de Becker', 'Geoffroy', 'geoffroy.debecker@gmail.com', '0000-00-00', '', '', '', 0, 1, 'df4c52e2398a59fb609acc77b325d996', '0', '2015-05-31', '0000-00-00'),
(67, 'Nibelle – de Becker', 'Laura', 'lauranibelle@hotmail.com', '0000-00-00', '', '', '', 0, 1, '37905b9b4fdb8fa311b30448254d51fe', '0', '2015-05-31', '0000-00-00'),
(68, 'de Becker', 'Guerric', 'guerric.debecker@gmail.com', '0000-00-00', '', '', '', 0, 1, 'd4918bc9ea7fef1751d8a0facab689f9', '0', '2015-05-31', '0000-00-00'),
(69, 'Cerfontaine', 'Elodie ', 'elodie.cerfontaine@gmail.com', '0000-00-00', '', '', '', 0, 1, 'b55c15504f23ba557c1567895efa364f', '0', '2015-05-31', '0000-00-00'),
(70, 'Massaux - El Kholti', 'Laurie ', 'kkuet1989@hotmail.com', '0000-00-00', '', '', '', 0, 1, 'b19b1d03db158e258b0a6ab1120612fd', '0', '2015-05-31', '0000-00-00'),
(71, 'El Kholti', 'Mehdi', 'mehdi17400@gmail.com', '0000-00-00', '', '', '', 0, 1, '9aecc87bae97f8e70bdfe92cf72be916', '0', '2015-05-31', '0000-00-00'),
(72, 'van Langedijk', 'Loïc', 'lopez_vl90@hotmail.com', '0000-00-00', '', '', '', 0, 1, 'a08f9a88c5b6ccb98780b6dfcca1b73f', '0', '2015-05-31', '0000-00-00'),
(73, 'de Becker', 'Brigitte', 'adelaidedebecker@hotmail.com', '0000-00-00', '', '', '', 0, 1, '74e6b44146ab714e66019c3609e67456', '0', '2015-05-31', '0000-00-00'),
(74, 'de Becker - Clerici Bagozzi', 'Rose', 'rdanethan@hotmail.com', '0000-00-00', '', '', '', 0, 1, '0df4dccc4aac3f6f36e00ef2a6a4bfac', '0', '2015-05-31', '0000-00-00'),
(75, 'd''Anethan', 'Justin', 'justindanethan@icloud.com', '0000-00-00', '', '', '', 0, 1, '06475174d922e7dcbb3ed34c0236dbdf', '0', '2015-05-31', '0000-00-00'),
(76, 'de Becker', 'Erard', 'erard.de.becker@skynet.be', '0000-00-00', '', '', '', 0, 1, '20d8245d2aa93ab604a65435f373079d', '0', '2015-05-31', '0000-00-00'),
(77, 'de Becker', 'Conrad', 'conrad.korkoro@gmail.com', '0000-00-00', '', '', '', 0, 1, '8442dbf8110557212e11922c19c352bc', '0', '2015-05-31', '0000-00-00'),
(78, 'de Becker', 'Blanche', 'blanche.de.becker@hotmail.fr', '0000-00-00', '', '', '', 0, 1, 'e6e4acf75cc2807f360438b4b306f5f4', '0', '2015-05-31', '0000-00-00'),
(79, 'de Becker', 'Aymar', 'aymard888@hotmail.com', '0000-00-00', '', '', '', 0, 1, 'af09bad6efd13165ebf5ab59a7eb8abb', '0', '2015-05-31', '0000-00-00'),
(80, 'de Brier', 'Pascale', 'pascaledebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, '4cf4c21e98d1e2ec4e61dac94b6cdc07', '0', '2015-05-31', '0000-00-00'),
(81, 'de Brier', 'Charles (1982)', 'charlesdebrier@gmail.com', '0000-00-00', '', '', '', 0, 1, 'c08f255794923b90545660e098851760', '0', '2015-05-31', '0000-00-00'),
(82, 'de Halleux ', 'Stéphanie', 'Stephanieetcharles@gmail.com', '0000-00-00', '', '', '', 0, 1, 'a7ec3ade506a1745257be9ab5e746497', '0', '2015-05-31', '0000-00-00'),
(83, 'Coupland', 'Michelle', 'michellehairconnections@gmail.com', '0000-00-00', '', '', '', 0, 1, 'ee17dc479d8eb9848d89de4ae67b526d', '0', '2015-05-31', '0000-00-00');

-- --------------------------------------------------------

--
-- Structure de la table `personne_temp`
--

CREATE TABLE IF NOT EXISTS `personne_temp` (
  `num` int(4) NOT NULL AUTO_INCREMENT,
  `nom` varchar(250) NOT NULL,
  `prenom` varchar(250) NOT NULL,
  `mail` varchar(250) NOT NULL,
  `position` text NOT NULL,
  `creation` date NOT NULL,
  `modification` date NOT NULL,
  PRIMARY KEY (`num`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

--
-- Contenu de la table `personne_temp`
--

INSERT INTO `personne_temp` (`num`, `nom`, `prenom`, `mail`, `position`, `creation`, `modification`) VALUES
(4, 'de brier', 'charles 1955', 'charles2brier@gmail.com', 'fils de Ghislain', '2015-05-31', '0000-00-00');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
