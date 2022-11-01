-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: medcurity
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
-- Table structure for table `affiliatedusers`
--

DROP TABLE IF EXISTS `affiliatedusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `affiliatedusers` (
  `UserID` int NOT NULL,
  `CompanyID` int NOT NULL,
  `DateJoined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `affiliatedusers`
--

LOCK TABLES `affiliatedusers` WRITE;
/*!40000 ALTER TABLE `affiliatedusers` DISABLE KEYS */;
INSERT INTO `affiliatedusers` VALUES (264,1,'2022-10-01 11:59:31'),(267,1,'2022-10-01 15:55:49'),(268,1,'2022-10-01 15:56:00'),(269,1,'2022-10-19 10:15:21');
/*!40000 ALTER TABLE `affiliatedusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignedlearningmodules`
--

DROP TABLE IF EXISTS `assignedlearningmodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignedlearningmodules` (
  `LearningModID` int NOT NULL,
  `UserID` int NOT NULL,
  `DueDate` datetime DEFAULT NULL,
  PRIMARY KEY (`LearningModID`,`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignedlearningmodules`
--

LOCK TABLES `assignedlearningmodules` WRITE;
/*!40000 ALTER TABLE `assignedlearningmodules` DISABLE KEYS */;
/*!40000 ALTER TABLE `assignedlearningmodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `icon` varchar(1024) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companies`
--

DROP TABLE IF EXISTS `companies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companies` (
  `companyid` mediumint NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL DEFAULT 'COMPANY NAME',
  `type` enum('Inc.','Ltd.','Co.','NA') NOT NULL DEFAULT 'NA',
  `description` varchar(2048) DEFAULT NULL,
  `datejoined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`companyid`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companies`
--

LOCK TABLES `companies` WRITE;
/*!40000 ALTER TABLE `companies` DISABLE KEYS */;
INSERT INTO `companies` VALUES (0,'Default','NA',NULL,'2022-04-07 23:16:09'),(1,'Company1','Inc.','Fake company used to showcase app','2022-10-01 19:43:15');
/*!40000 ALTER TABLE `companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyadmins`
--

DROP TABLE IF EXISTS `companyadmins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companyadmins` (
  `UserID` int NOT NULL,
  `CompanyID` int NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyadmins`
--

LOCK TABLES `companyadmins` WRITE;
/*!40000 ALTER TABLE `companyadmins` DISABLE KEYS */;
INSERT INTO `companyadmins` VALUES (265,1),(269,1);
/*!40000 ALTER TABLE `companyadmins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companylearningmodules`
--

DROP TABLE IF EXISTS `companylearningmodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `companylearningmodules` (
  `LearningModID` int NOT NULL DEFAULT '0',
  `CompanyID` int NOT NULL DEFAULT '0',
  `DueDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`LearningModID`,`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companylearningmodules`
--

LOCK TABLES `companylearningmodules` WRITE;
/*!40000 ALTER TABLE `companylearningmodules` DISABLE KEYS */;
INSERT INTO `companylearningmodules` VALUES (1,1,'2022-10-25 23:59:00'),(3,1,'2022-10-21 23:59:00');
/*!40000 ALTER TABLE `companylearningmodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `completedmodules`
--

DROP TABLE IF EXISTS `completedmodules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `completedmodules` (
  `UserID` int NOT NULL,
  `LearningModID` int NOT NULL,
  `DateCompleted` datetime DEFAULT NULL,
  `Points` int NOT NULL,
  `Percentage` double NOT NULL,
  PRIMARY KEY (`UserID`,`LearningModID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `completedmodules`
--

LOCK TABLES `completedmodules` WRITE;
/*!40000 ALTER TABLE `completedmodules` DISABLE KEYS */;
/*!40000 ALTER TABLE `completedmodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `earnedbadges`
--

DROP TABLE IF EXISTS `earnedbadges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `earnedbadges` (
  `userID` mediumint NOT NULL,
  `badgeID` mediumint NOT NULL,
  `timeEarned` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`,`badgeID`),
  KEY `badgeID` (`badgeID`),
  CONSTRAINT `earnedbadges_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userid`),
  CONSTRAINT `earnedbadges_ibfk_2` FOREIGN KEY (`badgeID`) REFERENCES `badges` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `earnedbadges`
--

LOCK TABLES `earnedbadges` WRITE;
/*!40000 ALTER TABLE `earnedbadges` DISABLE KEYS */;
/*!40000 ALTER TABLE `earnedbadges` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learningmodules`
--

LOCK TABLES `learningmodules` WRITE;
/*!40000 ALTER TABLE `learningmodules` DISABLE KEYS */;
INSERT INTO `learningmodules` VALUES (1,1,'Privacy','Your health information deserves the utmost privacy.','A major goal of the Privacy Rule is to assure that individuals’ health information is properly protected while allowing the flow of health information needed to provide and promote high quality health care and to protect the public\'s health and well-being. The Rule strikes a balance that permits important uses of information, while protecting the privacy of people who seek care and healing. Given that the health care marketplace is diverse, the Rule is designed to be flexible and comprehensive to cover the variety of uses and disclosures that need to be addressed.','banner-privacy.png'),(2,2,'Cybersecurity','HIPAA helps protect sensitive patient health information.','In order to best protect a patient\'s personal health records, the HIPAA Security Rule specifies that covered entities must maintain protection for ePHI and ensure that protection can defend the organization from any kind of physical, administrative, or technical breach. This can be accomplished through an effective cybersecurity strategy, but to avoid complications or breaches of confidential data, it is important to consider the following best practices\r\n\r\nFor most, this includes encryption of all patient data while in transit or at rest including on all laptops and devices, ensuring all remote connections are secure, using firewalls, limiting network access, having disaster recovery and business continuity plans, and ensuring you have current backups in various locations. One of the most important ways to protect against cybercrime is to provide continual education to your workforce including phishing simulations. A culture of compliance can be your best line of defense.','banner-security.png'),(3,3,'Administrative','Administrative Safeguards lay the foundation for compliance with the technical and physical safeguards.','These safeguards need to be reasonable and appropriate for your organization.\r\nForemost, you want to have policies and procedures that are in line with the HIPAA regulations, that reflect your practices, and then have evidence that you are doing what the policies and procedures direct. Your policies will cover managing the protection of ePHI and the conduct of your workforce concerning the protection of that information.\r\nAdministrative safeguard policies include security management processes with assigned responsibilities, security awareness and training, security incident procedures, business associate management, and contingency plans.','banner-administrative.png'),(4,4,'Technical','Technical Safeguards are the technology, policies and procedures and practices, that protect ePHI and control access to it. ','The Security Rule is tech neutral and there are no specific requirements for types of technology to implement leaving flexibility for the organization. The Rule allows a covered entity to use any security measures that allows it reasonably and appropriately to implement HIPAA. \nTechnical safeguard standards include: access to ePHI with unique user identifiers, automatic logoffs, and data encryption. Audit controls include monitoring activities pertaining to ePHI within the information systems. the integrity standard requires policies and procedures for protecting the data from being altered or destroyed in an unauthorized manner. Authentication requires the verification of the identity of the entity or individual seeking access to the protected data such as multi-factor authentication. ','banner-technical.png'),(5,5,'Physical','Physical safeguards are as important as digital safeguards.','Physical safeguards are the “physical measures put in place to protect electronic information systems and related buildings and equipment, from natural and environmental hazards, and unauthorized intrusion.”  The standards are another line of defense for protecting ePHI. Physical safeguard standards include facility access controls such as key management and alarm monitoring systems, workstation use and security addressing items such as locking devices with automatic screen locks, and device and media controls would address managing and disposing of end-of-life devices.','banner-physical.png'),(6,6,'Fun','Take a break and have some fun!','It\'s nice to occasionally take a fun break. Why not test your trivia knowledge with our fun trivia module?','banner-fun.png'),(30,0,'Safer Assessment','A universally required addition to having an SRA','This module provides health care practitioners with a practical way of adding to their overall risk assessment','');
/*!40000 ALTER TABLE `learningmodules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `learningmodulesdirectory`
--

DROP TABLE IF EXISTS `learningmodulesdirectory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `learningmodulesdirectory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(2048) NOT NULL DEFAULT 'Module Title',
  `Description` varchar(2048) NOT NULL DEFAULT 'Module Description',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `learningmodulesdirectory`
--

LOCK TABLES `learningmodulesdirectory` WRITE;
/*!40000 ALTER TABLE `learningmodulesdirectory` DISABLE KEYS */;
INSERT INTO `learningmodulesdirectory` VALUES (1,'Privacy','A description about Privacy.'),(2,'Cybersecurity','A description about Cybersecurity.'),(3,'Administrative','Module Description'),(4,'Technical','Module Description'),(5,'Physical','Module Description'),(6,'Fun','Module Description');
/*!40000 ALTER TABLE `learningmodulesdirectory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `questionid` int NOT NULL AUTO_INCREMENT,
  `question` varchar(2048) NOT NULL DEFAULT 'Question Text',
  `solution` varchar(2048) NOT NULL DEFAULT 'Answer 1',
  `a2` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Answer 2',
  `a3` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Answer 3',
  `a4` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'Answer 4',
  `type` enum('mc','tf') NOT NULL DEFAULT 'mc',
  `module` int DEFAULT '0',
  PRIMARY KEY (`questionid`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (1,'How often is HIPAA training recommended for workforce members?','2 & 3','When the workforce member requests it.','Upon entry into the organization.','Periodically, on an ongoing basis.','mc',3),(2,'What is the definition of ePHI?','Electronic Protected Health Information','Emergency Patient Health Information','Emergency Personal Help Information','Electronic Personal Health Information','mc',3),(3,'You’re onboarding a new Business Associate which includes getting the Business Associate Agreement signed and setting up the BA’s user access to the facility and electronic systems. The BA is scheduled to begin work on Monday. Unfortunately, the authorized signer for the BAA is on vacation until the following week. What is the appropriate way to handle this onboarding process to decrease the likelihood of a potential HIPAA violation?','Inform the BA they will not be able to begin work until the signed BAA has been returned.','Set up the BA’s facility and user access and provide the credentials to the BA in case the BAA isn’t signed by Monday.','Let the BA use another workforce member’s credentials to gain access to the facility and necessary systems until the BAA is signed.','Seek management approval to bypass the BAA and grant the BA’s facility and user access.','mc',3),(4,'Which government agency is responsible for enforcing HIPAA?','Office of Civil Rights','Department of Justice','Homeland Security','Department of Veteran Affairs','mc',3),(5,'When do two Covered Entities need to have a BAA?','When a Covered Entity provides services other than for Treatment, Payment, or Operations.','For Treatment, Payment, and Operations','When there is a referral','Never','mc',3),(6,'What is PHI?','Protected Health Information','Patient Health Information','Short term for phyllo dough','Personal Health Information','mc',3),(7,'How often should Security Awareness training be provided?','In an ongoing basis','Only Annually','Every Day','After each Breach','mc',3),(8,'How long do you have to report a breach of 500 or more individuals?','60 days','45 days','10 days','90 days','mc',3),(9,'Who do I need to get a BAA with?','Any outside organization that handles my organizations PHI','All outside organizations that my organization works with','Only with my EHR organization','No one','mc',3),(10,'Who has to comply with HIPAA?','All organizations handling PHI in the US and its territories','All organizations in the handling PHI in the US','All organizations in the US and its territories','All organizations globally','mc',3),(11,'This person my be interviewed by the OCR in case of an audit:','All of them','The HIPAA Compliance Officer','The President, CEO, or Administrator','The Facility Access Control Board','mc',3),(12,'The Compliance Officer is responsible for: ','Performing initial and ongoing risk assessments','Implementing security measures to protect the electronic systems','Managing the workforces daily tasks','Creating all company policies','mc',3),(13,'When should a Security Risk Analysis be conducted?','All of these','Annually','When significant organizational or environmental changes occur','When a breach occurs','mc',3),(14,'Which of these is NOT an objective of HIPAA?','To instruct CEs on appropriate medical procedures','To decrease abuse and fraud in healthcare','To make health insurance more portable - allowing people to keep their health insurance if they change jobs','To protect the privacy and security of medical records - keeping patient data safe and confidential','mc',3),(15,'Who is considered to be a BA?','Subcontractors and service providers related to PHI','Landlords and cleaning services with access to buildings','Physicians and workforce members','Law enforcement that you must legally disclose information to during an accident','mc',3),(16,'Who needs to be HIPAA experts?','Privacy and Security Officer','All employees','The CEO','The COO','mc',3),(17,'Enforcement penalties change intensity level based on:','Intent and Understandability of the rules that apply','Level of harm','Position of person who violated HIPAA','Personal Biases','mc',3),(18,'What is THE BEST way to significantly decrease the chances of your organization suffering from a breach?','By completing effective Compliance Officer HIPAA Training and putting an effective HIPAA compliance program in place','Ensuring all HIPAA Compliance guidelines are followed to the letter','Encrypting all laptops','Keeping policies up to date','mc',3),(19,'How do most HIPAA violations occur?','Employee Error','Computers without encryption','No policies and procedures','Lack of BAAs','mc',3),(20,'Who should you report a suspicion of violation of HIPAA?','Your supervisor','The CEO','The Office of Civil Rights','No one','mc',3),(21,'Which is not a challenge healthcare providers face when trying to align HIPAA regulations with patient expectations?','The need to constantly update data protections to facilitate trust among patients.','User-generated content that falls outside the categories of PHI and PII.','A complex patchwork of federal consumer data protections overlaid with individual state laws.','Confusion between personal health information (PHI) and personally identifiable information (PII).','mc',3),(22,'Why is it important for laptops to be encrypted?','If laptops are lost or stolen, it is more difficult to hack into the computer and steal phi','To help you sleep at night','It is federally required','So your coworkers cannot steal your credit card information','mc',4),(23,'Which of the following is both the biggest benefit and drawback of bring your own device?','Portability: Mobile devices give physicians access to data from virtually anywhere with an Internet connection, but they also are easily lost or stolen, thus increasing the chance of data breaches.','Ease: Mobile devices allow for real-time data and sharing, but when it comes to technical and regulatory knowledge, they can cause more problems than they prevent.','Finance: BYOD saves money, as employees have added incentive to take care of their own devices. However, if devices are not properly encrypted, implantation can cost much more in the long run. ','Communication: Mobile devices allow physicians to communicate with each other and patients via text messages and webmail, but can also distract them with personal activities.','mc',4),(24,'Which is a current trend in mobile security?','All of these','Access control lists (ACLs): Role-based logins control which users and which mobile devices can access an application.','Signal range control: Enforces security and privacy by restricting where applications can be accessed from.','Remote wipes and auto-locks: Mobile device storage may need to be remotely wiped clean when the device is switched off, and auto-locking may be automatically implemented in the devices is misplaced or stolen.','mc',4),(25,'Which is not a continuous data protection (CDP) backup solution?','Opt-out solution, wherein the care provider chooses not to adopt a backup solution.','Copying CDP server contents to a tape and shipping the tape off-site.','Disk-to-disk-to-cloud, where the backup server stores backups locally, but also uploads backups to the cloud for safekeeping.','Disk-to-disk-to-disk, where companies create a backup of their backup server, preferably located in a data center off-site.','mc',4),(26,'What are the biggest challenges hospitals, in particular, face in BYOD implementation?','All of these','The diversity of mobile devices and no one-size-fits-all solution.','The realization that policy alone is not enough to ensure data security and implementation of technological security measures is difficult.','The realization that though they do not purchase mobile devices, CIOs and hospitals are responsible for them.','mc',4),(27,'When storing sensitive information on laptops and mobile devices you should: ','Use encryption if you must store or transmit sensitive information. ','Only do it sparingly. ','Only store it on Blackberries or PDAs not laptops. ','Ensure there are backups','mc',4),(28,'How many ways to communicate PHI are there?','3','1','2','5','mc',5),(29,'All HIPAA Documentation must be retained for a minimum of:','6 years','2 years','5 years','12 years','mc',5),(30,'You’re at your workstation with a patient file open on your desk and need to step away for just a few minutes. What is the best way to handle the patient file before leaving your workstation?','Close the file and put it in a locked drawer or some other location where it will be out of sight of passersby.','Close the file and leave it where it is.','Leave the file as it is. You’ll be right back.','Ask your neighbor to be sure your workstation is safe.','mc',5),(31,'Where must the Notice of Privacy Practices be displayed in a hospital/clinic?','The waiting room','Every room the patient goes into','In all hallways','On the entrance door','mc',5),(32,'What forms of PHI are hospitals or clinics required to protect?','All of these','Verbal','Paper','Electronic','mc',5),(33,'Which method of communication is best to use when you share PHI with another person who has the right to know?','Face to face in a room with a closed door with only people who need to know','In an elevator','Leaving a message on an answering machine','Over drinks after work','mc',5),(34,'Which of the following is NOT a best practice for privacy and security?','Documents containing PHI do not need to be shredded','Keeping consumer records and other documents containing PHI out of sight','Keeping fax machines in areas that are not generally acceptable','Keeping medical record rooms locked/secured','mc',5),(35,'You are cleaning up the nurse’s station and find an open recycling bin full of paper. You can easily see names, addresses and phone numbers on the paper. What should you do? ','Show it to your supervisor to determine if the information can be shredded. ','Nothing. You can’t be sure the information has anything to do with patients. ','Ask the nurses who work there what information is on the paper.','Place it in the trash so you can continue cleaning the area. ','mc',5),(36,'You enter a conference room for a meeting and notice that several reports with patient information are on the table. What do you do? ','If you can determine who left the reports, return the reports to them. Otherwise, give the reports to you supervisor. ','Notify a cleaning crew member to come clean the room.','Leave the reports where you found them.','Throw the reports in the trash.','mc',5),(37,'You notice that someone has left a computer terminal used to enter orders while still logged on to the system. You leave it as is, thinking the person will return shortly. Later, a patient looks at what has been entered on the screen. Who is responsible for the breach of privacy?','1 and 2','You. You should have protected the information from being disclosed','The person who left the terminal while still logged on','Neither. This is not a breach','mc',5),(38,'An example of a HIPAA violation and a possible breach of unsecured PHI would be:','All of these','Accessing the computer to get information on a neighbor','Releasing a copy of a record to an unauthorized recipient','Disclosing PHI in a conversation with someone outside of the health department','mc',2),(39,'Which of the following is NOT a characteristic of a strong password?','Words found in the dictionary','At least 8 characters in length','A combination of lower and upper case letters','Use of special characters','mc',2),(40,'Which type of cyberattack is known as \"digital kidnapping\"?','Ransomware','Malware','Phishing','Skimming','mc',2),(41,'Which of the following is NOT a red flag for security fraud?','Downloading a file from a secure email with a known sender','An email with an attachment only saying the words \"Please Open\"','A recording saying documents have been filed incorrectly and could result in jail time','An email notifying you to start your HIPAA training, which you just completed','mc',2),(42,'What is the simplest way to stop brute-force cyberattacks dead in their tracks?','Add a few unique characters to any password or PIN','Add a deadbolt lock to all entryways','Shred all paperwork containing sensitive information','Install encryption on all documents and devices','mc',2),(43,'What is the weakest link in cybersecurity?','Humans','Weak encryption','Short passwords','Thumb drive ports','mc',2),(44,'What is the most accurate definition of a Breach?','Any impermissible access, acquisition, use, or disclosure of PHI; with limited exceptions','Any impermissible access, acquisition, use, or disclosure of PHI; with no exceptions','When someone hacks your computer','When someone who is not supposed to have access accesses a server room','mc',2),(45,'You may access the electronic medical record of a co-worker when: ','You are involved in his/her care and have a job-related need to know','You need to confirm whether his/her medical leave is valid ','You need to know where he or she is in the hospital so you can visit ','You are curious','mc',2),(46,'The Notice of Privacy Practices:','Is offered to the patient during their first visit','Must be given to a patient at every visit','Must be accepted by the patient','None of these options','mc',1),(47,'What is the purpose of the HIPAA Privacy Rule?','To permit important uses of information, while protecting patient privacy.','To protect the integrity, availability, and confidentiality of all ePHI','To outline privacy requirements of the organization','To prepare you for the privacy rule test','mc',1),(48,'What is the purpose of the Minimum Necessary component in the Privacy Rule?','To prevent breaches of PHI by only giving a workforce member access to the minimum amount of PHI needed to complete fulfill their responsibilities.','To inform patients the minimum amount of information they must share in order to receive medical treatment.','This refers to the minimum fine necessary for any healthcare breach.','To make your job more difficult.','mc',1),(49,'What should not be displayed on a patient sign-in sheet?','Reason for Appointment','Patient Name ','Time of Appointment','Physician Name  ','mc',1),(50,'Which of the following is a permitted use of PHI information under HIPAA','All of these','Informal uses open for agreement or objection','Incidental uses and disclosures','Uses and disclosures for the public benefit and interest','mc',1),(51,'Dr. Jones, head of surgery, asks to see Kristi Smith’s chart. Dr. Jones is not Kristi’s physician but Kristi is his wife’s best friend and he wants to see how she is doing. What do you do? ','Ask Dr. Jones for the appropriate written authorization to review Kristi’s chart. ','Give Dr. Jones the chart. ','Tell Dr. Jones that he cannot see the chart since he is not the patient’s physician. ','Tell Dr. Jones you are too busy to get the chart. ','mc',1),(52,'Protected health information that should be kept confidential includes a patient’s: ','All of these','Medical information stored electronically ','Name, address, and social security number ','Diagnosis, procedures received, lab results ','mc',1),(53,'A prominent politician is a patient at the facility where you work. Administration wants you to check his medical record to be sure his surgery was successful. Your job gives you access to everyone’s patient records. What should you do? ','Explain that no one in healthcare should look at patient records unless involved in that patient’s care or has business responsibilities or written authorization from the patient or his or her representative. ','Look at the chart and share only information that is public knowledge. ','Look at his medical records but don’t share any of the information. ','Don’t look at the chart and give them misinformation','mc',1),(54,'It is not appropriate for me to access or use patient protected health information: ','To find out about my friend’s condition after seeing her in the waiting area of a practice.','To perform my job responsibilities. ','When treating a patient or billing for services provided to a patient. ','2 and 3','mc',1),(55,'What are the correct ingredients in a California Burrito?','Carne Asada, Pico de Gallo/Salsa, Cheese, Sour Cream, Guacamole, French Fries','Beans and Cheese','Chicken, Sour cream, Cheese, Rice, Beans, Guacamole','Lettuce, Pico de Gallo/Salsa, Cheese, Sour Cream, Guacamole, Beans, Rice','mc',6),(56,'Which rock band singer also was the drummer in the grunge rock band Nirvana?','Dave Grohl from the Foo Fighters','Billy Joel Armstrong from Green Day','Mark Hoppus from Blink 182','Tom Delonge from Angels and Airwaves','mc',6),(57,'Which of these countries is not included in the United Kingdom?','Republic of Ireland','Wales','Scotland','England','mc',6),(58,'Which of these balls are not used in the game of quidditch?','Nargle','Quaffle','Golden Snitch','Bludger','mc',6),(59,'How many miles long is the Grand Canyon?','277 miles','234 miles','311 miles','434 miles','mc',6),(60,'What river runs through London?','River Thames','River Jordan','River Thames','River Westminster','mc',6),(61,'What does PEMDAS stand for?','Parentheses, Exponents, Multiply, Divide, Add, Subtract','Please Excuse My Dear Aunt Sally','Protein, Energy, Mass, Dairy, All Grains, Sweets','Pretend Energy Makes Distance Always Shorter','mc',6),(62,'Jimi Hendrix only had 1 top 40 hit. What was it?','All Along the Watchtower','Purple Haze','Voodoo Child','Hey Joe','mc',6),(63,'Which classical composer was deaf?','Beethoven','Mozart','Bach','Debussy','mc',6),(70,'Why do we not go past this module?','It might lead to us wiping a real module','werwerwer','werwerwe','ewrewrw','mc',7),(84,'What is the proper way to secure a facility?','Have a secure key card locking system','What is 1 way to help develop a firm grasp of your organizations cyber risks?','','','mc',23),(92,'','','','','','mc',31),(95,'','','','','','mc',31),(100,'Who is the main protagonist from the game series .hack//GU?','Haseo','Kite','Atoli','Shino','mc',31),(105,'e','e','e','e','e','mc',46),(106,'','','','','','mc',46),(107,'ewoeowelskd','mndsfndj','mewnewmn','wql;wqlwelk','eejdjfjwnb','mc',45),(108,'wiwqiwq','sdjksdk','weoov','zxcxzc','sadasda','mc',45),(109,'asdad','sadassd','asdas','dasd','asdasd','mc',31),(110,'','','','','','mc',31),(111,'Wqeqwesa','bvnbvn','rtrettyrr','cvxzsdd','uyiuitr','mc',30),(114,'hkhy','tyutyu','tert','erter','ertr','mc',30),(116,'e','e','e','e','e','mc',-1),(121,'','','','','','mc',-1),(122,'','','','','','mc',-1),(124,'rewrwe','wer','we','rwer','rwerw','mc',-1),(126,'dsfs','f','rewrew','ds','fwrewrwer','mc',-1),(127,'ewre','wsf','fds','fsd','fsdf','mc',-1),(129,'werew','rewrew','rewr','ewrew','rweewr','mc',-1),(130,'ewrew','f','ddg','fdg','fdgfdgd','mc',-1),(131,'ewrew','sdfsd','rew','dfew','f','mc',-1),(132,'wer','wrwe','ree','rewrew','rer','mc',-1),(133,'wewq','s','sdsda','dasqw','eqwe','mc',-1),(134,'wqe','w','esa','dsa','sada','mc',-1);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpoints`
--

DROP TABLE IF EXISTS `userpoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userpoints` (
  `PointsID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `CompanyID` int DEFAULT NULL,
  PRIMARY KEY (`PointsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpoints`
--

LOCK TABLES `userpoints` WRITE;
/*!40000 ALTER TABLE `userpoints` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` mediumint NOT NULL AUTO_INCREMENT,
  `companyid` mediumint NOT NULL DEFAULT '0',
  `username` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'hipaauser',
  `type` enum('user','employee','employer') NOT NULL DEFAULT 'user',
  `email` char(255) NOT NULL,
  `password` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `personal` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `profilepicture` varchar(1024) DEFAULT NULL,
  `datejoined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=270 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (264,1,'employee1','user','employee1@gmail.com','$2b$10$LfYs0lf4DZfZ4fkgzN7hmOtALn.Hg0J4JSf7rza7krzgMd8L9LdjS',1,NULL,'giraffe.png','2022-10-01 11:59:31'),(265,1,'employer1','user','employer1@gmail.com','$2b$10$Aew86dUdLHTwtXN/u2RpHePBm8NLTGp8/syqfAayj39xR0sz/smNy',1,NULL,NULL,'2022-10-01 12:34:23'),(266,0,'admin1','user','admin1@gmail.com','$2b$10$k7D.46e4226vBHXzKp5x.OwJOCItCJfA18bwbDYgNC9IicblziH/q',1,NULL,NULL,'2022-10-01 12:34:56'),(267,0,'employee2','user','employee2@gmail.com','$2b$10$.95cMvTWV0SaKG/cfH55ru2NSHpA9vJ7DbhSnz0.Gw4PsWQvyndHK',1,NULL,NULL,'2022-10-01 15:55:49'),(268,0,'employee3','user','employee3@gmail.com',NULL,0,NULL,NULL,'2022-10-01 15:56:00'),(269,1,'demoAccount','user','demoAccount@gmail.com','$2b$10$VMB2.LgtWnChmkNYJzJ5Mu0Bujyi2qW1TvNgW6Budf54w7r7QYf3e',1,NULL,NULL,'2022-10-19 08:42:22');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `websiteadmins`
--

DROP TABLE IF EXISTS `websiteadmins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `websiteadmins` (
  `UserID` int NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `websiteadmins`
--

LOCK TABLES `websiteadmins` WRITE;
/*!40000 ALTER TABLE `websiteadmins` DISABLE KEYS */;
INSERT INTO `websiteadmins` VALUES (266),(269);
/*!40000 ALTER TABLE `websiteadmins` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-01 13:48:11
