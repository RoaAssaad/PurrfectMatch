-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: mywebdb
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `adoption_requests`
--

DROP TABLE IF EXISTS `adoption_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adoption_requests` (
  `Request_ID` int NOT NULL AUTO_INCREMENT,
  `Request_Date` date NOT NULL,
  `Request_Status` enum('Pending','Approved','Denied','Cancelled') NOT NULL,
  `User_ID` int NOT NULL,
  `Cat_ID` int NOT NULL,
  PRIMARY KEY (`Request_ID`),
  KEY `fk_AdoptionRequest_User_idx` (`User_ID`),
  KEY `fk_AdoptionRequest_Cat_idx` (`Cat_ID`),
  CONSTRAINT `fk_AdoptionRequest_Cat` FOREIGN KEY (`Cat_ID`) REFERENCES `cats` (`Cat_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_AdoptionRequest_User` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adoption_requests`
--

LOCK TABLES `adoption_requests` WRITE;
/*!40000 ALTER TABLE `adoption_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `adoption_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cat_shelter`
--

DROP TABLE IF EXISTS `cat_shelter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cat_shelter` (
  `Cat_ID` int NOT NULL,
  `Shelter_ID` int NOT NULL,
  `Date_Arrived` date NOT NULL,
  PRIMARY KEY (`Cat_ID`,`Shelter_ID`),
  KEY `fk_catshelter_cat_idx` (`Cat_ID`),
  KEY `fk_catshelter_shelter_idx` (`Shelter_ID`),
  CONSTRAINT `fk_catshelter_cat` FOREIGN KEY (`Cat_ID`) REFERENCES `cats` (`Cat_ID`) ON DELETE RESTRICT,
  CONSTRAINT `fk_catshelter_shelter` FOREIGN KEY (`Shelter_ID`) REFERENCES `shelters` (`Shelter_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cat_shelter`
--

LOCK TABLES `cat_shelter` WRITE;
/*!40000 ALTER TABLE `cat_shelter` DISABLE KEYS */;
/*!40000 ALTER TABLE `cat_shelter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cats`
--

DROP TABLE IF EXISTS `cats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cats` (
  `Cat_ID` int NOT NULL AUTO_INCREMENT,
  `Cat_Name` varchar(45) NOT NULL,
  `Cat_DOB` date DEFAULT NULL,
  `Cat_Breed` varchar(45) DEFAULT NULL,
  `Cat_Gender` enum('F','M') NOT NULL,
  `Cat_HealthStatus` enum('Healthy','Sick','Injured','Other') DEFAULT NULL,
  `Cat_Description` mediumtext,
  `Cat_Image` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`Cat_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cats`
--

LOCK TABLES `cats` WRITE;
/*!40000 ALTER TABLE `cats` DISABLE KEYS */;
/*!40000 ALTER TABLE `cats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `User_ID` int NOT NULL,
  `Cat_ID` int NOT NULL,
  `Date_Added` date NOT NULL,
  PRIMARY KEY (`User_ID`,`Cat_ID`),
  KEY `fk_Favorites_Cat_idx` (`Cat_ID`),
  CONSTRAINT `fk_Favorites_Cat` FOREIGN KEY (`Cat_ID`) REFERENCES `cats` (`Cat_ID`) ON DELETE CASCADE,
  CONSTRAINT `fk_Favorites_User` FOREIGN KEY (`User_ID`) REFERENCES `users` (`User_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shelters`
--

DROP TABLE IF EXISTS `shelters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelters` (
  `Shelter_ID` int NOT NULL AUTO_INCREMENT,
  `Shelter_Name` varchar(100) NOT NULL,
  `Shelter_Address` varchar(255) NOT NULL,
  `Shelter_ContactInfo` varchar(255) NOT NULL,
  PRIMARY KEY (`Shelter_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelters`
--

LOCK TABLES `shelters` WRITE;
/*!40000 ALTER TABLE `shelters` DISABLE KEYS */;
/*!40000 ALTER TABLE `shelters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `User_ID` int NOT NULL AUTO_INCREMENT,
  `User_Username` varchar(20) NOT NULL,
  `User_Email` varchar(100) NOT NULL,
  `User_Password` varchar(100) NOT NULL,
  `User_DOB` date NOT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_username_UNIQUE` (`User_Username`),
  UNIQUE KEY `User_Email_UNIQUE` (`User_Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-25  2:27:51
