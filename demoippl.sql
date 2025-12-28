-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for demoippl
-- CREATE DATABASE IF NOT EXISTS `demoippl` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
-- USE `demoippl`;

use railway;

-- Dumping structure for table demoippl.emosi
CREATE TABLE IF NOT EXISTS `emosi` (
  `id_emosi` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `hasil_emosi` enum('happy','sad','neutral','angry') DEFAULT NULL,
  `confidence` double DEFAULT NULL,
  `audio_base64` longtext,
  `waktu_rekam` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_emosi`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table demoippl.emosi: ~41 rows (approximately)
INSERT INTO `emosi` (`id_emosi`, `id_user`, `hasil_emosi`, `confidence`, `audio_base64`, `waktu_rekam`) VALUES
	(1, 1, 'happy', 0.8370243906974792, NULL, '2025-12-27 23:20:19'),
	(2, 1, 'happy', 0.8370243906974792, NULL, '2025-12-27 23:54:11'),
	(3, 2, 'happy', 0.8346949219703674, NULL, '2025-12-28 00:46:16'),
	(4, 2, 'sad', 0.5705963969230652, NULL, '2025-12-28 00:46:52'),
	(5, 2, 'happy', 0.3771245777606964, NULL, '2025-12-28 00:47:14'),
	(6, 2, 'angry', 0.803314745426178, NULL, '2025-12-28 00:47:30'),
	(7, 2, 'sad', 0.6832517385482788, NULL, '2025-12-28 00:47:50'),
	(8, 2, 'neutral', 0.7011473178863525, NULL, '2025-12-28 00:48:07'),
	(9, 2, 'happy', 0.4201016426086426, NULL, '2025-12-28 00:53:41'),
	(10, 2, 'sad', 0.6460821628570557, NULL, '2025-12-28 00:54:03'),
	(11, 2, 'angry', 0.9270505905151367, NULL, '2025-12-28 00:54:11'),
	(12, 2, 'neutral', 0.9923222661018372, NULL, '2025-12-28 00:54:19'),
	(13, 2, 'angry', 0.7880229949951172, NULL, '2025-12-28 00:54:48'),
	(14, 2, 'angry', 0.46254315972328186, NULL, '2025-12-28 00:55:12'),
	(15, 2, 'neutral', 0.7200204730033875, NULL, '2025-12-28 00:55:31'),
	(16, 2, 'neutral', 0.7735685706138611, NULL, '2025-12-28 00:55:43'),
	(17, 2, 'neutral', 0.7735685706138611, NULL, '2025-12-28 00:55:47'),
	(18, 2, 'neutral', 0.9438183307647705, NULL, '2025-12-28 00:55:59'),
	(19, 1, 'happy', 0.837099552154541, NULL, '2025-12-28 00:56:17'),
	(20, 2, 'happy', 0.7745588421821594, NULL, '2025-12-28 00:57:00'),
	(21, 2, 'neutral', 0.9853526949882507, NULL, '2025-12-28 00:57:14'),
	(22, 2, 'angry', 0.8010593056678772, NULL, '2025-12-28 00:58:11'),
	(23, 2, 'neutral', 0.801659882068634, NULL, '2025-12-28 00:58:53'),
	(24, 2, 'neutral', 0.505331814289093, NULL, '2025-12-28 00:59:15'),
	(25, 2, 'neutral', 0.6740851402282715, NULL, '2025-12-28 00:59:48'),
	(26, 2, 'angry', 0.8829023241996765, NULL, '2025-12-28 00:59:58'),
	(27, 2, 'neutral', 0.9672524333000183, NULL, '2025-12-28 01:00:10'),
	(28, 2, 'neutral', 0.584333062171936, NULL, '2025-12-28 01:00:22'),
	(29, 2, 'neutral', 0.6963115930557251, NULL, '2025-12-28 01:00:34'),
	(30, 2, 'happy', 0.9509298801422119, NULL, '2025-12-28 01:00:40'),
	(31, 2, 'happy', 0.5534977912902832, NULL, '2025-12-28 01:00:50'),
	(32, 2, 'neutral', 0.8051301836967468, NULL, '2025-12-28 01:17:47'),
	(33, 2, 'angry', 0.990211009979248, NULL, '2025-12-28 01:17:56'),
	(34, 2, 'happy', 0.786676824092865, NULL, '2025-12-28 01:18:12'),
	(35, 2, 'sad', 0.7367998361587524, NULL, '2025-12-28 01:18:27'),
	(36, 2, 'neutral', 0.9255034923553467, NULL, '2025-12-28 01:18:56'),
	(37, 2, 'angry', 0.7248721718788147, NULL, '2025-12-28 01:19:08'),
	(38, 2, 'happy', 0.7838147282600403, NULL, '2025-12-28 01:19:34'),
	(39, 2, 'happy', 0.5369636416435242, NULL, '2025-12-28 01:19:57'),
	(40, 2, 'happy', 0.6444312930107117, NULL, '2025-12-28 01:20:19'),
	(41, 2, 'sad', 0.963350236415863, NULL, '2025-12-28 01:21:05');

-- Dumping structure for table demoippl.login_log
CREATE TABLE IF NOT EXISTS `login_log` (
  `id_login` int NOT NULL AUTO_INCREMENT,
  `id_user` int DEFAULT NULL,
  `login_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table demoippl.login_log: ~0 rows (approximately)

-- Dumping structure for table demoippl.user
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nama` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table demoippl.user: ~10 rows (approximately)
INSERT INTO `user` (`id_user`, `nama`, `email`, `password`) VALUES
	(1, 'awang', 'awang@email.com', 'awangGanteng'),
	(2, 'madanyah', '11231084@student.itk.ac.id', 'Daniahfahma4_'),
	(3, 'daniah', 'ramadan@gmail.com', '123456'),
	(4, 'awang', 'awang@student.itk.ac.id', 'awangii'),
	(5, 'wangwang', '11231041@student.itk.ac.id', 'wangwang'),
	(6, 'Rahma', 'rahma@gmail.com', '123456'),
	(7, 'Ifan Awang', 'Ifan Awang@gmail.com', '12345'),
	(8, 'Xiao Huang', 'Xiao Huang@gmail.com', '12345'),
	(9, 'Ifan', 'Ifan@gmail.com', 'ifan123'),
	(10, 'daniah', '11231084@student.it.ac.id', 'Daniahfahma4_');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
