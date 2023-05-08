-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: dstruong
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `giaovien`
--

DROP TABLE IF EXISTS `giaovien`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giaovien` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `route` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giaovien`
--

LOCK TABLES `giaovien` WRITE;
/*!40000 ALTER TABLE `giaovien` DISABLE KEYS */;
INSERT INTO `giaovien` VALUES (1,'Khang nguyen','ngkhanwe@gmail.com','khangnn','khangnnn1234',NULL),(2,NULL,'shtikhang@gmail.com','khang','$2b$10$cz5/eoFUX6jE8E1hB.ebTezAnEQtUQZdIwMli7TqstwtZG23p1m66','teeacher'),(3,NULL,'khangnn@gmail.com','Nguyenkhang','$2b$10$4YrZrkLE3Pkcb05EUaF/5es/cHvZYLeR.x0IIE9TXvFrbQOeFT9rS',NULL),(4,NULL,'Caotrungnnn@gmail.com','CaoTrung','$2b$10$vBZUvvYquyyf7i8FJxyL/.RPmMzE/gt8hRl3pK/wuNxHPPjQIfat.','admin'),(5,NULL,'khangnnn@gmail.com','nguyenkhang123','$2b$10$OhCxMWEDUK2A.SWiVQS96uyALgT3Gm9C2D0PJWkb26H82ldgHPhK2',NULL),(6,NULL,'','','$2b$10$Z9zAQZjJ23xXv.uTEwVpzeLDfpehvAtQeCS/9sI2Yf.q6WGxnlws6',NULL),(7,'Cao Trung','caotrung123@gmail.com','caotrung123','$2b$10$EytIcMhNg8zJCyvOnPyGW.zI9ZLByBEz/q4LHYZzRjb/BIyxQ22Ui','admin'),(8,'Nguyên Khang','nguyenkhang999@gmail.com','nguyenkhangteach','$2b$10$V8Y2YErropz6WpOkPf1slu8IFFcJlFk87xvl0XZ.Q.AN4Xr6grsda','teacher');
/*!40000 ALTER TABLE `giaovien` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-08  8:08:15
