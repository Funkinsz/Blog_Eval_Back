-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 03 juin 2023 à 18:45
-- Version du serveur : 10.4.27-MariaDB
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `lesson_article_blog`
--

-- --------------------------------------------------------

--
-- Structure de la table `favorite`
--

CREATE TABLE `favorite` (
  `idFav` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idMovies` int(11) NOT NULL,
  `isFav` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `favorite`
--

INSERT INTO `favorite` (`idFav`, `idUser`, `idMovies`, `isFav`) VALUES
(1, 13, 12, 0),
(2, 13, 11, 0);

-- --------------------------------------------------------

--
-- Structure de la table `movies`
--

CREATE TABLE `movies` (
  `idMovies` int(11) NOT NULL,
  `nameMovies` varchar(250) NOT NULL,
  `dateOfRelease` date NOT NULL,
  `resume` longtext NOT NULL,
  `poster` varchar(250) NOT NULL,
  `duration` int(5) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `movies`
--

INSERT INTO `movies` (`idMovies`, `nameMovies`, `dateOfRelease`, `resume`, `poster`, `duration`, `created_at`) VALUES
(1, 'Un poisson nommé Wanda', '1988-07-07', 'Des voleurs de bijoux, des avocats anglais très comme il faut et un poisson nommé Wanda : tous les ingrédients pour une comédie au quatuor gagnant.', 'https://media.senscritique.com/media/000016146239/source_big/Un_poisson_nomme_Wanda.jpg', 108, '2323-03-31'),
(2, 'Titanic', '1998-01-07', 'Le 10 avril 1912, au port de Southampton en Angleterre, le Titanic, le plus grand paquebot du monde, réputé pour son insubmersibilité, appareille pour son premier voyage. Une traversée inaugurale de l\'Atlantique Nord avec pour destination New York. A son bord, Jack Dawson, un artiste sans le sous, fait la rencontre de Rose, passagère de première classe issue d\'une famille aristocrate de Philadelphie. Bien que venant d\'univers radicalement différents, ils finissent pas tomber amoureux. Quatre jours plus tard, le navire heurte un iceberg.', 'https://media.senscritique.com/media/000019629037/source_big/Titanic.jpg', 194, '2323-03-31'),
(3, 'Seven', '1996-01-31', 'Sur le point de prendre sa retraite, l\'inspecteur William Somerset fait équipe avec le jeune David Mills. Tous deux mènent l\'enquête sur une série de meurtres particulièrement étranges. En effet, un mystérieux serial killer, se faisant appeler John Doe, tue ses victimes selon les sept péchés capitaux.', 'https://media.senscritique.com/media/000012353656/source_big/Seven.jpg', 127, '2323-03-31'),
(4, 'Little big man', '1971-03-31', 'Un centenaire, Jack Crabb, raconte sa vie à un journaliste et, à travers, elle, la conquête de l\'Ouest. Enlevé autrefois par les Cheyennes, il devient très vite un des leurs sous le nom de « Grand Petit Homme ». De retour chez les Blancs, il côtoie des pittoresques personnages mais, écœuré par la civilisation, Jack retourne chez les Indiens jusqu\'à ce que, enrôlé de force dans l\'armée, il assiste impuissant au massacre de sa famille, puis à la défaite de Little Big Horn...', 'https://media.senscritique.com/media/000004818717/source_big/Little_Big_Man.jpg', 139, '2323-03-31'),
(5, 'Rio Bravo', '1959-10-21', 'Un shérif arrête le frère de l\'homme le plus puissant de la région. Il n\'a pour alliés qu\'un adjoint ivrogne, un vieillard boiteux, un gamin, une joueuse de poker et un hôtelier mexicain, et contre lui une armée de tueurs.', 'https://media.senscritique.com/media/000019752511/source_big/Rio_Bravo.jpg', 141, '2323-03-31'),
(6, 'Les Affranchis', '1990-09-12', 'A Brooklyn, dans les années 1950, Henry Hill, né d’un père irlandais et d’une mère sicilienne, a toujours voulu devenir gangster. Il commet à 16 ans ses premiers délits. Arrêté, le gamin des rues gagne le respect du parrain Paul Cicero en refusant de livrer ses complices, la règle d’or des affranchis. A sa sortie de prison, Henry se lie d\'amitié avec Jimmy Conway, un truand imprévisible et cruel qui deviendra son mentor, et Tommy De Vito, un gangster dangereux et impulsif.', 'https://media.senscritique.com/media/000008041479/source_big/Les_Affranchis.jpg', 146, '2323-03-31'),
(7, 'Les misérables', '2019-11-20', 'Stéphane, tout juste arrivé de Cherbourg, intègre la Brigade Anti-Criminalité de Montfermeil, dans le 93. Il va faire la rencontre de ses nouveaux coéquipiers, Chris et Gwada, deux «Bacqueux» d’expérience. Il découvre rapidement les tensions entre les différents groupes du quartier.', 'https://media.senscritique.com/media/000019228798/source_big/Les_Miserables.jpg', 104, '2323-03-31'),
(8, 'La mort aux trousses', '1959-10-21', 'Le publiciste Roger Tornhill se retrouve par erreur dans la peau d\'un espion. Pris entre une mystérieuse organisation qui cherche à le supprimer et la police qui le poursuit, Tornhill est dans une situation bien inconfortable. Il fuit à travers les États-Unis et part à la recherche d\'une vérité qui se révèlera très surprenante.', 'https://media.senscritique.com/media/000016132379/source_big/La_Mort_aux_trousses.jpg', 136, '2323-03-31'),
(9, 'Zodiac', '2007-05-17', 'En 1969, un tueur en série sème la terreur à San Francisco. Revendiquant pas moins de trente-sept meurtres, ce mystérieux meurtrier prend un malin plaisir à narguer la police en envoyant des lettres codées à la presse. Les inspecteurs de police David Toschi et William Armstrong, le chroniqueur judiciaire Paul Avery et le jeune dessinateur Robert Graysmith tentent de l\'identifier.', 'https://media.senscritique.com/media/000020099916/source_big/Zodiac.jpg', 157, '2023-04-01'),
(11, 'Parasite', '2019-06-05', 'Toute la famille de Ki-taek est au chômage, et s’intéresse fortement au train de vie de la richissime famille Park. Un jour, leur fils réussit à se faire recommander pour donner des cours particuliers d’anglais chez les Park. C’est le début d’un engrenage incontrôlable, dont personne ne sortira véritablement indemne…', 'https://media.senscritique.com/media/000018573383/source_big/Parasite.jpg', 132, '2023-04-01'),
(12, 'Le bon, la brute et le truand', '1968-03-08', 'Un chasseur de primes rejoint deux hommes dans une alliance précaire. Leur but ? Trouver un coffre rempli de pièces d\'or dans un cimetière isolé.', 'https://media.senscritique.com/media/000008032023/source_big/Le_Bon_la_Brute_et_le_Truand.jpg', 179, '2023-04-01'),
(13, '1917', '2020-03-16', 'Pris dans la tourmente de la Première Guerre Mondiale, Schofield et Blake, deux jeunes soldats britanniques, se voient assigner une mission à proprement parler impossible. Porteurs d’un message qui pourrait empêcher une attaque dévastatrice et la mort de centaines de soldats, dont le frère de Blake, ils se lancent dans une véritable course contre la montre, derrière les lignes ennemies.', 'https://media.senscritique.com/media/000019142368/source_big/1917.jpg', 119, '2023-04-01'),
(15, 'West Side Story', '2021-12-08', 'Variation de Roméo et Juliette de William Shakespeare. Dans le West Side, bas quartier de New York, deux bandes de jeunes s’affrontent, les Sharks de Bernardo et les Jets de Riff. Un ex des Jets, Tony, s’éprend de Maria, la soeur de Bernardo.', 'https://media.senscritique.com/media/000020328070/source_big/West_Side_Story.png', 156, '2023-04-01'),
(16, 'Interstellar', '2014-11-05', 'Alors que la vie sur Terre touche à sa fin, un groupe d’explorateurs s’attelle à la mission la plus importante de l’histoire de l’humanité : franchir les limites de notre galaxie pour savoir si l’homme peut vivre sur une autre planète…', 'https://media.senscritique.com/media/000018762465/source_big/Interstellar.jpg', 169, '2023-04-01'),
(19, 'Gladiator', '2000-06-20', 'En 180 après Jésus Christ, le général romain Maximus est le plus fidèle soutien de l\'empereur Marc Aurèle. Jaloux du prestige de Maximus, le fils de Marc Aurèle, Commode, s\'arroge brutalement le pouvoir, puis ordonne l\'arrestation du général et son exécution. Maximus échappe à ses assassins mais ne peut empêcher le massacre de sa famille. Capturé par un marchand d\'esclaves, il devient gladiateur et prépare sa vengeance.', 'https://media.senscritique.com/media/000012334489/source_big/Gladiator.jpg', 155, '2023-04-01'),
(21, 'Into the wild', '2008-01-09', 'Christopher a 22 ans et une soif d\'absolu et de liberté sans limites. Il plaque tout du jour au lendemain pour partir à l\'aventure.', 'https://media.senscritique.com/media/000019629038/source_big/Into_the_Wild.jpg', 148, '2023-04-01'),
(22, 'Prisoners', '2013-10-09', 'Un père apprend que sa fille a été kidnappée avec celle de son meilleur ami. Il se met alors à suspecter une personne qu\'il va traquer...', 'https://media.senscritique.com/media/000005479390/source_big/Prisoners.jpg', 153, '2023-04-01'),
(23, 'Eternal sunshine of the spotless mind', '2004-10-06', 'L\'idylle entre Clementine et Joel a pris fin, en raison de leurs caractères trop différents et de la routine. Pour apaiser ses souffrances, Clementine a recours à Lacuna, un procédé révolutionnaire qui efface certains souvenirs. Désespéré, Joel décide de suivre le même processus. Une nuit, deux techniciens s\'y emploient. Mais quand le passé défile dans sa tête, Joel mesure à quel point il aime toujours Clementine.', 'https://media.senscritique.com/media/000012223508/source_big/Eternal_Sunshine_of_the_Spotless_Mind.jpg', 108, '2023-04-01'),
(24, 'Le chant du loup', '2019-02-20', 'Un jeune homme a le don rare de reconnaître chaque son qu’il entend. A bord d’un sous-marin nucléaire français, tout repose sur lui, l’Oreille d’Or. Réputé infaillible, il commet pourtant une erreur qui met l’équipage en danger de mort. Il veut retrouver la confiance de ses camarades mais sa quête les entraîne dans une situation encore plus dramatique. Dans le monde de la dissuasion nucléaire et de la désinformation, ils se retrouvent tous pris au piège d’un engrenage incontrôlable.', 'https://media.senscritique.com/media/000018537250/source_big/Le_Chant_du_loup.jpg', 115, '2023-04-01'),
(25, 'Inception', '2010-07-21', 'Dom Cobb est un voleur expérimenté, le meilleur dans l\'art dangereux de l\'extraction : spécialité qui consiste à voler les secrets les plus intimes enfouis au plus profond du subconscient durant une phase de rêve. Très recherché pour ses talents dans l’univers trouble de l’espionnage industriel, Cobb est aussi devenu un fugitif traqué dans le monde entier. Une ultime mission pourrait lui permettre de retrouver sa vie passée, accomplir une « inception ».', 'https://media.senscritique.com/media/000004710747/source_big/Inception.jpg', 148, '2023-04-02'),
(26, '127 heures', '2011-02-23', 'Seul et sans prévenir personne, Aaron part en randonnée dans les gorges désertiques de l\'Utah. Mais il se trouve coincé sous un rocher et doit alors s\'échapper.', 'https://media.senscritique.com/media/000006536742/source_big/127_Heures.jpg', 94, '2023-04-02');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `idUser` int(11) NOT NULL,
  `pseudo` varchar(255) NOT NULL,
  `pswd` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `pseudo`, `pswd`) VALUES
(13, 'Funkins', '$2b$09$N1vc/8mC66NQH1ZzF0risuSw/QbbxysNv5juMMr0VQD2zfAcqMbmu');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `favorite`
--
ALTER TABLE `favorite`
  ADD PRIMARY KEY (`idFav`),
  ADD KEY `idUser_FK` (`idUser`),
  ADD KEY `idMovies` (`idMovies`);

--
-- Index pour la table `movies`
--
ALTER TABLE `movies`
  ADD PRIMARY KEY (`idMovies`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUser`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `favorite`
--
ALTER TABLE `favorite`
  MODIFY `idFav` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `movies`
--
ALTER TABLE `movies`
  MODIFY `idMovies` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `favorite`
--
ALTER TABLE `favorite`
  ADD CONSTRAINT `idMovies` FOREIGN KEY (`idMovies`) REFERENCES `movies` (`idMovies`),
  ADD CONSTRAINT `idUser_FK` FOREIGN KEY (`idUser`) REFERENCES `user` (`idUser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
