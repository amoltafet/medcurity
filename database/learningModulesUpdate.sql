-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hipaagames
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `learningmodules`
--

DROP TABLE IF EXISTS `learningmodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learningmodules` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DirID` int NOT NULL DEFAULT '0',
  `Title` varchar(2048) NOT NULL DEFAULT 'Learning Module Title',
  `Subtitle` varchar(2048) NOT NULL DEFAULT 'Module Subtitle',
  `Description` varchar(2048) NOT NULL DEFAULT 'Learning Module Description',
  `Banner` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'banner-default.png',
  `timecutoff` float NOT NULL,
  `timebonuscutoff` float NOT NULL,
  `badgecutoff` float NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learningmodules`
--

LOCK TABLES `learningmodules` WRITE;
/*!40000 ALTER TABLE `learningmodules` DISABLE KEYS */;
INSERT INTO `learningmodules` VALUES (1,1,'Privacy','Your health information deserves the utmost privacy.','A major goal of the Privacy Rule is to assure that individuals’ health information is properly protected while allowing the flow of health information needed to provide and promote high quality health care and to protect the public\'s health and well-being. The Rule strikes a balance that permits important uses of information, while protecting the privacy of people who seek care and healing. Given that the health care marketplace is diverse, the Rule is designed to be flexible and comprehensive to cover the variety of uses and disclosures that need to be addressed.','banner-privacy.png',45,80,90),(2,2,'Cybersecurity','HIPAA helps protect sensitive patient health information.','In order to best protect a patient\'s personal health records, the HIPAA Security Rule specifies that covered entities must maintain protection for ePHI and ensure that protection can defend the organization from any kind of physical, administrative, or technical breach. This can be accomplished through an effective cybersecurity strategy, but to avoid complications or breaches of confidential data, it is important to consider the following best practices\r\n\r\nFor most, this includes encryption of all patient data while in transit or at rest including on all laptops and devices, ensuring all remote connections are secure, using firewalls, limiting network access, having disaster recovery and business continuity plans, and ensuring you have current backups in various locations. One of the most important ways to protect against cybercrime is to provide continual education to your workforce including phishing simulations. A culture of compliance can be your best line of defense.','banner-security.png',45,80,90),(3,3,'Administrative','Administrative Safeguards lay the foundation for compliance with the technical and physical safeguards.','These safeguards need to be reasonable and appropriate for your organization.\r\nForemost, you want to have policies and procedures that are in line with the HIPAA regulations, that reflect your practices, and then have evidence that you are doing what the policies and procedures direct. Your policies will cover managing the protection of ePHI and the conduct of your workforce concerning the protection of that information.\r\nAdministrative safeguard policies include security management processes with assigned responsibilities, security awareness and training, security incident procedures, business associate management, and contingency plans.','banner-administrative.png',45,80,90),(4,4,'Technical','Technical Safeguards are the technology, policies and procedures and practices, that protect ePHI and control access to it. ','The Security Rule is tech neutral and there are no specific requirements for types of technology to implement leaving flexibility for the organization. The Rule allows a covered entity to use any security measures that allows it reasonably and appropriately to implement HIPAA. \nTechnical safeguard standards include: access to ePHI with unique user identifiers, automatic logoffs, and data encryption. Audit controls include monitoring activities pertaining to ePHI within the information systems. the integrity standard requires policies and procedures for protecting the data from being altered or destroyed in an unauthorized manner. Authentication requires the verification of the identity of the entity or individual seeking access to the protected data such as multi-factor authentication. ','banner-technical.png',45,80,90),(5,5,'Physical','Physical safeguards are as important as digital safeguards.','Physical safeguards are the “physical measures put in place to protect electronic information systems and related buildings and equipment, from natural and environmental hazards, and unauthorized intrusion.”  The standards are another line of defense for protecting ePHI. Physical safeguard standards include facility access controls such as key management and alarm monitoring systems, workstation use and security addressing items such as locking devices with automatic screen locks, and device and media controls would address managing and disposing of end-of-life devices.','banner-physical.png',45,80,90),(6,6,'Fun','Take a break and have some fun!','It\'s nice to occasionally take a fun break. Why not test your trivia knowledge with our fun trivia module?','banner-fun.png',45,80,90),(30,0,'Safer Assessment','A universally required addition to having an SRA','This module provides health care practitioners with a practical way of adding to their overall risk assessment','',45,80,90);
/*!40000 ALTER TABLE `learningmodules` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-21 16:24:13
