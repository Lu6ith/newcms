-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2+deb7u1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 25 Cze 2015, 13:36
-- Wersja serwera: 5.5.43
-- Wersja PHP: 5.4.41-0+deb7u1

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `directory`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `delegacje`
--

CREATE TABLE IF NOT EXISTS `delegacje` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idem` int(11) NOT NULL,
  `numer` tinytext CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `datadel` date NOT NULL,
  `do` text CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `srtrans` mediumtext CHARACTER SET utf8 COLLATE utf8_polish_ci NOT NULL,
  `nadgodziny` smallint(6) NOT NULL,
  `kilometry` smallint(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_polish_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `dyzury`
--

CREATE TABLE IF NOT EXISTS `dyzury` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idem` int(11) NOT NULL,
  `datapocz` date NOT NULL,
  `datakonc` date NOT NULL,
  `grupa` varchar(50) CHARACTER SET utf8 COLLATE utf8_roman_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=42 ;

--
-- Zrzut danych tabeli `dyzury`
--

INSERT INTO `dyzury` (`id`, `idem`, `datapocz`, `datakonc`, `grupa`) VALUES
(1, 40, '2013-08-01', '2013-08-18', 'telemechanika'),
(3, 39, '2013-08-12', '2013-08-13', 'Å‚Ä…cznoÅ›c'),
(4, 41, '2013-08-01', '2013-08-17', 'Dyster soft.'),
(5, 39, '2013-08-19', '2013-08-20', 'Å‚Ä…cznoÅ›Ä‡'),
(6, 43, '2013-08-12', '2013-08-25', 'informatyka'),
(7, 52, '2013-08-05', '2013-08-16', 'zasilanie'),
(8, 45, '2013-08-05', '2013-08-18', 'klimatyzacja'),
(9, 54, '2013-08-12', '2013-08-21', 'Dyster hard.'),
(10, 0, '0000-00-00', '0000-00-00', ''),
(12, 46, '2012-08-19', '2012-08-31', 'telemechanika'),
(13, 0, '0000-00-00', '0000-00-00', ''),
(15, 50, '2013-08-14', '2013-08-18', 'Å‚Ä…cznoÅ›Ä‡'),
(16, 40, '2013-09-16', '2013-09-30', 'telemechanika'),
(17, 39, '2013-09-16', '2013-09-20', 'Å‚Ä…cznoÅ›Ä‡'),
(18, 41, '2013-09-18', '2013-09-30', 'Dyster software'),
(19, 42, '2013-09-16', '2013-09-30', 'Dyster hardware'),
(20, 55, '2013-09-08', '2013-09-18', 'informatyka'),
(21, 43, '2013-09-19', '2013-09-28', 'informatyka'),
(23, 45, '2013-09-16', '2013-09-22', 'klimatyzacja'),
(24, 56, '2013-09-23', '2013-09-29', 'klimatyzacja'),
(26, 40, '2015-06-01', '2015-06-06', 'telemechanika'),
(29, 49, '2015-06-15', '2015-06-29', 'zasilanie'),
(31, 39, '2015-05-31', '2015-06-01', 'telekomunikacja'),
(32, 46, '2015-06-21', '2015-06-28', 'telemechanika'),
(34, 51, '2015-06-28', '2015-06-29', 'Å‚Ä…cznoÅ›Ä‡'),
(37, 40, '2015-06-30', '2015-06-30', 'telemechanika'),
(41, 40, '2015-06-15', '2015-06-21', 'telemechanika');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `employee`
--

CREATE TABLE IF NOT EXISTS `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(30) COLLATE utf8_polish_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8_polish_ci NOT NULL,
  `managerId` int(11) NOT NULL,
  `title` varchar(45) COLLATE utf8_polish_ci NOT NULL,
  `department` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `officePhone` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `cellPhone` varchar(45) COLLATE utf8_polish_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `city` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `address` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `picture` varchar(250) COLLATE utf8_polish_ci NOT NULL,
  `twitterId` varchar(45) COLLATE utf8_polish_ci DEFAULT NULL,
  `blogURL` varchar(200) COLLATE utf8_polish_ci DEFAULT NULL,
  `tags` varchar(50) COLLATE utf8_polish_ci NOT NULL,
  `uwagi` varchar(250) COLLATE utf8_polish_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=64 ;

--
-- Zrzut danych tabeli `employee`
--

INSERT INTO `employee` (`id`, `firstName`, `lastName`, `managerId`, `title`, `department`, `officePhone`, `cellPhone`, `email`, `city`, `address`, `picture`, `twitterId`, `blogURL`, `tags`, `uwagi`) VALUES
(45, 'Wojciech', 'Biernacki', 0, 'pracownik', 'PSE Centrum', '1739', '669-400-540', 'wojciech.biernacki@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Klimatyzacja', ''),
(46, 'Wojciech', 'Romanowski', 0, 'pracownik', 'PSE Centrum', '1726', '605-852-223', 'wojciech.romanowski@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telemechanika', ''),
(23, 'Grzegorz', 'WÃ³jtowicz', 0, 'pracownik', 'ABB', '(022) 516-44-77', '605-597-822', '', '', '', '', NULL, NULL, 'telemech - SE EÅ‚k', ''),
(24, 'Marek', 'PawÅ‚owski', 0, 'pracownik', 'ABB', '(022) 516-44-75', '601-388-269', '', 'Warszawa', '', '', NULL, NULL, 'telemech - SE EÅ‚k', ''),
(47, 'Dariusz', 'Dresler', 0, 'pracownik', 'PSE Centrum', '1733', '665-661-135', 'dariusz.dresler@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telekomunikacja', ''),
(48, 'Eryk', 'GoÅºdziecki', 0, 'pracownik', 'PSE Centrum', '1722', '665-881-195', 'eryk.gozdziecki@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telekomunikacja', ''),
(44, 'Krzysztof', 'BÅ‚oÅ„ski', 0, 'pracownik', 'PSE Centrum', '1721', '669-100-444', 'krzysztof.blonski@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Zasilanie', ''),
(42, 'MichaÅ‚', 'Ostatek', 0, 'pracownik', 'PSE Centrum', '1749', '669-880-247', 'michal.ostatek@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Informatyka', ''),
(25, 'PrzemysÅ‚aw', 'Liman', 0, 'pracownik', 'AREWA', '(074) 854-86-20', '663-815-901', '', '', '', '', NULL, NULL, 'Farmy W. - Potasznia', ''),
(26, 'Adam', 'Iliaszuk', 0, 'pracownik', 'ELECTRUM', '', '503-196-967', 'ailiaszuk@electrum.pl', '', '', '', NULL, NULL, 'Farmy W. - Piecki, Wronki, Taciewo', ''),
(27, 'Robert', 'Palmowski', 0, 'pracownik', 'ENERTEL', '(041) 361-77-52 w.57', '609-594-874', 'robert.palmowski@enertel.com.pl', '', '', '', NULL, NULL, 'telemech - Harris OstroÅ‚Ä™ka', ''),
(39, 'Jakub', 'Sobiesiak', 0, 'pracownik', 'PSE Centrum', '1732', '669-551-644', 'jakub.sobiesiak@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telekomunikacja', ''),
(40, 'Wojciech', 'Lubicz-ÅapiÅ„ski', 0, 'pracownik', 'PSE Centrum', '1725', '691-993-551', 'wojciech.lubicz-lapinski@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telemechanika', ''),
(41, 'Robert', 'Szopa', 0, 'pracownik', 'PSE Centrum', '1742', '601-838-861', 'robert.szopa@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Dyster', ''),
(28, 'Andrzej', 'Lorkowski', 0, 'pracownik', 'Å»UROMIN', '', '601-423-387', 'mbodzioch@services-ges.com', '', '', '', NULL, NULL, 'Farmy W. - Zuromin', ''),
(29, 'Zbigniew', 'Soroka', 0, '', 'PGE - BiaÅ‚ystok', '', '', '', 'BiaÅ‚ystok', '', '', NULL, NULL, 'ZDR - BiaÅ‚ystok', ''),
(30, 'Andrzej', 'KamiÅ„ski', 0, 'pracownik', 'PGE Dystrybucja', '(22) 512-14-04', '609-433-258', 'Andrzej.Kaminski@zewt.com.pl', '', '', '', NULL, NULL, 'ZDR - Warszawa', ''),
(43, 'PaweÅ‚', 'Filipczak', 0, 'pracownik', 'PSE Centrum', '1748', '693-553-565', 'pawel.filipczak@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Informatyka', ''),
(32, 'Åukasz', 'Sinkiewicz', 0, 'pracownik', 'GAMESA WIND PL', '', '604-483-183', 'lsinkiewicz@gamesacorp.com', '', '', '', NULL, NULL, 'Farmy W. - Piecki, Wronki, Taciewo', ''),
(33, 'WÅ‚odzimierz', 'Grzybowski', 0, 'pracownik', 'Mikronika', '(061) 665-56-00', '605-694-351', '', 'PoznaÅ„', '', '', NULL, NULL, 'Syndis - Mory, Sochaczew, MiÅ‚osna', ''),
(34, 'JarosÅ‚aw', 'KÅ‚os', 0, 'pracownik', 'Mikronika', '(061) 665-56-00', '601-983-798', '', 'PoznaÅ„', '', '', NULL, NULL, 'Syndis - Mory, Sochaczew, MiÅ‚osna', ''),
(35, 'Janusz', 'GrudziÅ„ski', 0, 'pracownik', 'Mikronika', '', '697-034-991', '', 'KrakÃ³w', '', '', NULL, NULL, 'Syndis - JanÃ³w', ''),
(36, 'Zbigniew', 'Sadowski', 0, 'pracownik', 'Elkomtech', '(042) 638-75-09', '603-114-874', '', 'ÅÃ³dÅº', '', '', NULL, NULL, 'Windex - PDE,TRE,PIO,ZGI,MSK', ''),
(49, 'Zbigniew', 'KapuÅ›ciÅ„ski', 0, 'pracownik', 'PSE Centrum', '1738', '601-838-874', 'zbigniew.kapuscinski@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Zasilanie', ''),
(50, 'Mariusz', 'KÅ‚usek', 0, 'pracownik', 'PSE Centrum', '1727', '601-881-690', 'mariusz.klusek@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telekomunikacja', ''),
(51, 'Andrzej', 'KoÅ‚odziejczyk', 0, 'pracownik', 'PSE Centrum', '1720', '695-419-400', 'andrzej.kolodziejczyk@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telekomunikacja', ''),
(52, 'Marek', 'Kusal', 0, 'pracownik', 'PSE Centrum', '1747', '661-553-599', 'marek.kusal@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Zasilanie', ''),
(53, 'Arkadiusz', 'ÅšcisÅ‚owski', 0, 'pracownik', 'PSE Centrum', '1723', '695-419-396', 'arkadiusz.scislowski@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Telekomunikacja', ''),
(54, 'Zbyszek', 'Urbaniak', 0, 'pracownik', 'PSE Centrum', '1744', '601-838-862', 'zbigniew.urbaniak@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Dyster', ''),
(55, 'Hubert', 'Wincenciak', 0, 'pracownik', 'PSE Centrum', '1743', '697-985-302', 'hubert.wincenciak@pse.pl', 'Warszawa', '', '', NULL, NULL, 'PSEC - ZT', ''),
(56, 'Jacek', 'SzczepaÅ„ski', 0, 'pracownik', 'PSE Centrum', '1739', '663-999-805', 'jacek.szczepanski@pse.pl', 'Warszawa', '', '', NULL, NULL, 'TW - Klimatyzacja', ''),
(57, 'Andrzej', 'KamiÅ„ski', 0, 'pracownik', 'Arewa', '', '501-765-258', '', 'Wronki', '', '', NULL, NULL, 'Farmy W. - Wronki', '');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
