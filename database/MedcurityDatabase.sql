CREATE DATABASE IF NOT EXISTS `Medcurity`;
USE `Medcurity`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: medcurity
-- ------------------------------------------------------
-- Server version	8.0.30

--
-- DROP TABLE statements
--
DROP TABLE IF EXISTS `AffiliatedUsers`;
DROP TABLE IF EXISTS `AssignedLearningModules`;
DROP TABLE IF EXISTS `Companies`;
DROP TABLE IF EXISTS `CompanyAdmins`;
DROP TABLE IF EXISTS `CompanyLearningModules`;
DROP TABLE IF EXISTS `CompletedModules`;
DROP TABLE IF EXISTS `EarnedBadges`;
DROP TABLE IF EXISTS `LearningModulesDirectory`;
DROP TABLE IF EXISTS `MatchingAnswers`;
DROP TABLE IF EXISTS `Notifications`;
DROP TABLE IF EXISTS `Questions`;
DROP TABLE IF EXISTS `UserActivity`;
DROP TABLE IF EXISTS `UserPoints`;
DROP TABLE IF EXISTS `WebsiteAdmins`;
DROP TABLE IF EXISTS `LearningModules`;
DROP TABLE IF EXISTS `Badges`;
DROP TABLE IF EXISTS `Users`;

--
-- Table structure and data for table `Users`
--
CREATE TABLE `Users` (
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
) ENGINE=InnoDB AUTO_INCREMENT=271 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (264,1,'employee1','user','employee1@gmail.com','$2b$10$LfYs0lf4DZfZ4fkgzN7hmOtALn.Hg0J4JSf7rza7krzgMd8L9LdjS',1,NULL,'giraffe.png','2022-10-01 11:59:31'),(265,1,'employer1','user','employer1@gmail.com','$2b$10$Aew86dUdLHTwtXN/u2RpHePBm8NLTGp8/syqfAayj39xR0sz/smNy',1,NULL,NULL,'2022-10-01 12:34:23'),(266,0,'admin1','user','admin1@gmail.com','$2b$10$k7D.46e4226vBHXzKp5x.OwJOCItCJfA18bwbDYgNC9IicblziH/q',1,NULL,NULL,'2022-10-01 12:34:56'),(267,0,'employee2','user','employee2@gmail.com','$2b$10$.95cMvTWV0SaKG/cfH55ru2NSHpA9vJ7DbhSnz0.Gw4PsWQvyndHK',1,NULL,NULL,'2022-10-01 15:55:49'),(268,0,'employee3','user','employee3@gmail.com','$2b$10$1qbqpvSFqaybDU.I/P5XG.e3Fl1jt4WypVxdXL8M2y/p1kW.WH0i6',1,NULL,NULL,'2022-10-01 15:56:00'),(269,1,'demoAccount','user','demoAccount@gmail.com','$2b$10$VMB2.LgtWnChmkNYJzJ5Mu0Bujyi2qW1TvNgW6Budf54w7r7QYf3e',1,NULL,'koala.jpg','2022-10-19 08:42:22'),(270,0,'employee6','user','employee6@gmail.com','$2b$10$JyTNE8VqZHcMdd2TUoIS4ubB.xQqtszUj4ktyHWacS4A/efdPVKJm',1,NULL,NULL,'2023-02-07 08:45:07');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `AffiliatedUsers`
--
CREATE TABLE `AffiliatedUsers` (
  `UserID` int NOT NULL,
  `CompanyID` int NOT NULL,
  `DateJoined` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `Affiliatedusers` WRITE;
/*!40000 ALTER TABLE `Affiliatedusers` DISABLE KEYS */;
INSERT INTO `AffiliatedUsers` VALUES (264,1,'2022-10-01 11:59:31'),(267,1,'2022-10-01 15:55:49'),(268,1,'2022-10-01 15:56:00'),(269,1,'2022-10-19 10:15:21');
/*!40000 ALTER TABLE `AffiliatedUsers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `AssignedLearningModules`
--
CREATE TABLE `AssignedLearningModules` (
  `LearningModID` int NOT NULL,
  `UserID` int NOT NULL,
  `DueDate` datetime DEFAULT NULL,
  PRIMARY KEY (`LearningModID`,`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `AssignedLearningModules` WRITE;
/*!40000 ALTER TABLE `AssignedLearningModules` DISABLE KEYS */;
/*!40000 ALTER TABLE `AssignedLearningModules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `Badges`
--
CREATE TABLE `Badges` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `icon` varchar(1024) NOT NULL,
  `moduleID` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `Badges` WRITE;
/*!40000 ALTER TABLE `Badges` DISABLE KEYS */;
INSERT INTO `Badges` VALUES (1,'Privacy Badge','This badge is awarded for completing the Privacy Module.','privacy-badge.png',1),(2,'Cybersecurity Badge','This badge is awarded for completing the Cybersecurity Module.','cybersecurity-badge.png',2),(3,'Administrative Badge','This badge is awarded for completing the Administrative Module.','administrative-badge.png',3),(4,'Technical Badge','This badge is awarded for completing the Technical Module.','technical-badge.png',4),(5,'Physical Badge','This badge is awarded for completing the Physical Module.','physical-badge.png',5),(6,'Fun Badge','This badge is awarded for completing the Fun Module.','fun-badge.png',6),(7,'Safer Assessment Badge','This badge is awarded for completing the Safer Assessment Module.','safer-assessment-badge.png',30),(60,'Sprinter Badge','This badge is awarded for completing a module below the time limit with above 80% question accuracy.','sprinter-badge.png',NULL);
/*!40000 ALTER TABLE `Badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and date for table `Companies`
--
CREATE TABLE `Companies` (
  `companyid` mediumint NOT NULL AUTO_INCREMENT,
  `name` char(255) NOT NULL DEFAULT 'COMPANY NAME',
  `type` enum('Inc.','Ltd.','Co.','NA') NOT NULL DEFAULT 'NA',
  `description` varchar(2048) DEFAULT NULL,
  `datejoined` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`companyid`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `Companies` WRITE;
/*!40000 ALTER TABLE `Companies` DISABLE KEYS */;
INSERT INTO `Companies` VALUES (0,'Default','NA',NULL,'2022-04-07 23:16:09'),(1,'Company1','Inc.','Fake company used to showcase app','2022-10-01 19:43:15');
/*!40000 ALTER TABLE `Companies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `CompanyAdmins`
--
CREATE TABLE `CompanyAdmins` (
  `UserID` int NOT NULL,
  `CompanyID` int NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `companyadmins` WRITE;
/*!40000 ALTER TABLE `CompanyAdmins` DISABLE KEYS */;
INSERT INTO `CompanyAdmins` VALUES (265,1),(269,1);
/*!40000 ALTER TABLE `CompanyAdmins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `CompanyLearningModules`
--
CREATE TABLE `CompanyLearningModules` (
  `LearningModID` int NOT NULL DEFAULT '0',
  `CompanyID` int NOT NULL DEFAULT '0',
  `DueDate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`LearningModID`,`CompanyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `CompanyLearningModules` WRITE;
/*!40000 ALTER TABLE `CompanyLearningModules` DISABLE KEYS */;
INSERT INTO `CompanyLearningModules` VALUES (1,1,'2022-12-09 23:59:00'),(3,1,'2022-12-09 23:59:00'),(4,1,'2023-02-16 23:59:00'),(6,1,'2022-12-09 23:59:00');
/*!40000 ALTER TABLE `CompanyLearningModules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `CompletedModules`
--
CREATE TABLE `CompletedModules` (
  `UserID` int NOT NULL,
  `LearningModID` int NOT NULL,
  `DateCompleted` datetime DEFAULT NULL,
  `Points` int NOT NULL,
  `Percentage` double NOT NULL,
  PRIMARY KEY (`UserID`,`LearningModID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `CompletedModules` WRITE;
/*!40000 ALTER TABLE `CompletedModules` DISABLE KEYS */;
INSERT INTO `CompletedModules` VALUES (264,6,'2022-11-21 09:13:36',700,0.8333333333333334),(269,6,'2022-12-06 18:11:48',600,0.8);
/*!40000 ALTER TABLE `CompletedModules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `EarnedBadges`
--
CREATE TABLE `EarnedBadges` (
  `userID` mediumint NOT NULL,
  `badgeID` mediumint NOT NULL,
  `timeEarned` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`userID`,`badgeID`),
  KEY `badgeID` (`badgeID`),
  CONSTRAINT `EarnedBadges_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `Users` (`userid`) ON DELETE CASCADE,
  CONSTRAINT `EarnedBadges_ibfk_2` FOREIGN KEY (`badgeID`) REFERENCES `Badges` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `EarnedBadges` WRITE;
/*!40000 ALTER TABLE `EarnedBadges` DISABLE KEYS */;
INSERT INTO `EarnedBadges` VALUES (264,1,'2022-11-06 15:23:35'),(264,5,'2022-11-08 14:43:27'),(264,6,'2023-02-05 22:45:13'),(264,7,'2023-01-26 17:58:28'),(264,60,'2023-02-05 22:45:13');
/*!40000 ALTER TABLE `EarnedBadges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `LearningModules`
--
CREATE TABLE `LearningModules` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `DirID` int NOT NULL DEFAULT '0',
  `Title` varchar(2048) NOT NULL DEFAULT 'Learning Module Title',
  `Subtitle` varchar(2048) NOT NULL DEFAULT 'Module Subtitle',
  `Description` varchar(2048) NOT NULL DEFAULT 'Learning Module Description',
  `Banner` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'banner-default.png',
  `Img_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `LearningModules` WRITE;
/*!40000 ALTER TABLE `LearningModules` DISABLE KEYS */;
INSERT INTO `LearningModules` VALUES (1,1,'Privacy','Your health information deserves the utmost privacy.','A major goal of the Privacy Rule is to assure that individuals’ health information is properly protected while allowing the flow of health information needed to provide and promote high quality health care and to protect the public\'s health and well-being. The Rule strikes a balance that permits important uses of information, while protecting the privacy of people who seek care and healing. Given that the health care marketplace is diverse, the Rule is designed to be flexible and comprehensive to cover the variety of uses and disclosures that need to be addressed.','banner-privacy.png','https://static01.nyt.com/images/2020/12/23/business/23Techfix-illo/23Techfix-illo-mediumSquareAt3X.jpg'),(2,2,'Cybersecurity','HIPAA helps protect sensitive patient health information.','In order to best protect a patient\'s personal health records, the HIPAA Security Rule specifies that covered entities must maintain protection for ePHI and ensure that protection can defend the organization from any kind of physical, administrative, or technical breach. This can be accomplished through an effective cybersecurity strategy, but to avoid complications or breaches of confidential data, it is important to consider the following best practices\r\n\r\nFor most, this includes encryption of all patient data while in transit or at rest including on all laptops and devices, ensuring all remote connections are secure, using firewalls, limiting network access, having disaster recovery and business continuity plans, and ensuring you have current backups in various locations. One of the most important ways to protect against cybercrime is to provide continual education to your workforce including phishing simulations. A culture of compliance can be your best line of defense.','banner-security.png','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa4jbMSamiYncVKEhOzJQQmFDcvcqWbXfv7w&usqp=CAU'),(3,3,'Administrative','Administrative Safeguards lay the foundation for compliance with the technical and physical safeguards.','These safeguards need to be reasonable and appropriate for your organization.\r\nForemost, you want to have policies and procedures that are in line with the HIPAA regulations, that reflect your practices, and then have evidence that you are doing what the policies and procedures direct. Your policies will cover managing the protection of ePHI and the conduct of your workforce concerning the protection of that information.\r\nAdministrative safeguard policies include security management processes with assigned responsibilities, security awareness and training, security incident procedures, business associate management, and contingency plans.','banner-administrative.png','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ86WeadcHiViS3HMZneg8KCZ-mMLVP8Z7oPA&usqp=CAU'),(4,4,'Technical','Technical Safeguards are the technology, policies and procedures and practices, that protect ePHI and control access to it. ','The Security Rule is tech neutral and there are no specific requirements for types of technology to implement leaving flexibility for the organization. The Rule allows a covered entity to use any security measures that allows it reasonably and appropriately to implement HIPAA. \nTechnical safeguard standards include: access to ePHI with unique user identifiers, automatic logoffs, and data encryption. Audit controls include monitoring activities pertaining to ePHI within the information systems. the integrity standard requires policies and procedures for protecting the data from being altered or destroyed in an unauthorized manner. Authentication requires the verification of the identity of the entity or individual seeking access to the protected data such as multi-factor authentication. ','banner-technical.png','https://thehill.com/wp-content/uploads/sites/2/2022/04/eyescan_technology_cyber_istock_0412.jpg?w=1280'),(5,5,'Physical','Physical safeguards are as important as digital safeguards.','Physical safeguards are the “physical measures put in place to protect electronic information systems and related buildings and equipment, from natural and environmental hazards, and unauthorized intrusion.”  The standards are another line of defense for protecting ePHI. Physical safeguard standards include facility access controls such as key management and alarm monitoring systems, workstation use and security addressing items such as locking devices with automatic screen locks, and device and media controls would address managing and disposing of end-of-life devices.','banner-physical.png','https://www.fit.edu/coes.jpg'),(6,6,'Fun','Take a break and have some fun!','It\'s nice to occasionally take a fun break. Why not test your trivia knowledge with our fun trivia module?','banner-fun.png','https://merriam-webster.com/assets/mw/images/article/art-wap-article-main/surfing-dog-photo-is-funner-or-funnest-a-real-word-5670-6d512231d0a52079b0c9fbf474f9a6c9@1x.jpg'),(30,0,'Safer Assessment','A universally required addition to having an SRA','This module provides health care practitioners with a practical way of adding to their overall risk assessment','','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVuhgeY3KCaOFN34zOrfSo6XtOd1gMZtmjjQ&usqp=CAU');
/*!40000 ALTER TABLE `LearningModules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `LearningModulesDirectory`
--
CREATE TABLE `LearningModulesDirectory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(2048) NOT NULL DEFAULT 'Module Title',
  `Description` varchar(2048) NOT NULL DEFAULT 'Module Description',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `LearningModulesDirectory` WRITE;
/*!40000 ALTER TABLE `LearningModulesDirectory` DISABLE KEYS */;
INSERT INTO `LearningModulesDirectory` VALUES (1,'Privacy','A description about Privacy.'),(2,'Cybersecurity','A description about Cybersecurity.'),(3,'Administrative','Module Description'),(4,'Technical','Module Description'),(5,'Physical','Module Description'),(6,'Fun','Module Description');
/*!40000 ALTER TABLE `LearningModulesDirectory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `MatchingAnswers`
--
CREATE TABLE `MatchingAnswers` (
  `matchingquestionid` int NOT NULL,
  `m1` varchar(2048) DEFAULT 'Matching Answer 1',
  `m2` varchar(2048) DEFAULT 'Matching Answer 2',
  `m3` varchar(2048) DEFAULT 'Matching Answer 3',
  `m4` varchar(2048) DEFAULT 'Matching Answer 4',
  `module` int DEFAULT NULL,
  PRIMARY KEY (`matchingquestionid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `matchinganswers` WRITE;
/*!40000 ALTER TABLE `MatchingAnswers` DISABLE KEYS */;
INSERT INTO `MatchingAnswers` VALUES (59,'3','49','16','22',6);
/*!40000 ALTER TABLE `MatchingAnswers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `Notifications`
--
CREATE TABLE `Notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` mediumint NOT NULL,
  `message` varchar(300) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  `timesent` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  CONSTRAINT `Notifications_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `Notifications` WRITE;
/*!40000 ALTER TABLE `Notifications` DISABLE KEYS */;
INSERT INTO `Notifications` VALUES (3,264,'HE SAYS HI','message',1,'2023-01-18 15:33:00'),(4,264,'You earned the Fun Badge!','badge',1,'2023-02-05 22:45:14'),(5,264,'Welcome New User!','welcome',1,'2023-02-01 12:57:00'),(6,264,'Module Added!','assignment',1,'2023-02-01 15:33:00'),(12,264,'You earned the Sprinter Badge!','badge',1,'2023-02-05 22:45:14'),(13,270,'Welcome to Medcurity!','welcome',1,'2023-02-07 08:45:07'),(14,268,'Welcome to Medcurity!','welcome',1,'2023-02-07 08:48:08');
/*!40000 ALTER TABLE `Notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `Questions`
--
CREATE TABLE `Questions` (
  `questionid` int NOT NULL AUTO_INCREMENT,
  `question` varchar(2048) NOT NULL DEFAULT 'Question Text',
  `solution` varchar(2048) NOT NULL DEFAULT 'Answer 1',
  `a2` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Answer 2',
  `a3` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Answer 3',
  `a4` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Answer 4',
  `type` enum('mc','tf','fill','match') NOT NULL DEFAULT 'mc',
  `module` int DEFAULT '0',
  PRIMARY KEY (`questionid`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `Questions` WRITE;
/*!40000 ALTER TABLE `Questions` DISABLE KEYS */;
INSERT INTO `Questions` VALUES (1,'How often is HIPAA training recommended for workforce members?','2 & 3','When the workforce member requests it.','Upon entry into the organization.','Periodically, on an ongoing basis.','mc',3),(2,'What is the definition of ePHI?','Electronic Protected Health Information','Emergency Patient Health Information','Emergency Personal Help Information','Electronic Personal Health Information','mc',3),(3,'You?re onboarding a new Business Associate which includes getting the Business Associate Agreement signed and setting up the BA?s user access to the facility and electronic systems. The BA is scheduled to begin work on Monday. Unfortunately, the authorized signer for the BAA is on vacation until the following week. What is the appropriate way to handle this onboarding process to decrease the likelihood of a potential HIPAA violation?','Inform the BA they will not be able to begin work until the signed BAA has been returned.','Set up the BA?s facility and user access and provide the credentials to the BA in case the BAA isn?t signed by Monday.','Let the BA use another workforce member?s credentials to gain access to the facility and necessary systems until the BAA is signed.','Seek management approval to bypass the BAA and grant the BA?s facility and user access.','mc',3),(4,'Which government agency is responsible for enforcing HIPAA?','Office of Civil Rights','Department of Justice','Homeland Security','Department of Veteran Affairs','mc',3),(5,'When do two Covered Entities need to have a BAA?','When a Covered Entity provides services other than for Treatment, Payment, or Operations.','For Treatment, Payment, and Operations','When there is a referral','Never','mc',3),(6,'What is PHI?','Protected Health Information','Patient Health Information','Short term for phyllo dough','Personal Health Information','mc',3),(7,'How often should Security Awareness training be provided?','In an ongoing basis','Only Annually','Every Day','After each Breach','mc',3),(8,'How long do you have to report a breach of 500 or more individuals?','60 days','45 days','10 days','90 days','mc',3),(9,'Who do I need to get a BAA with?','Any outside organization that handles my organizations PHI','All outside organizations that my organization works with','Only with my EHR organization','No one','mc',3),(10,'Who has to comply with HIPAA?','All organizations handling PHI in the US and its territories','All organizations in the handling PHI in the US','All organizations in the US and its territories','All organizations globally','mc',3),(11,'This person my be interviewed by the OCR in case of an audit:','All of them','The HIPAA Compliance Officer','The President, CEO, or Administrator','The Facility Access Control Board','mc',3),(12,'The Compliance Officer is responsible for: ','Performing initial and ongoing risk assessments','Implementing security measures to protect the electronic systems','Managing the workforces daily tasks','Creating all company policies','mc',3),(13,'When should a Security Risk Analysis be conducted?','All of these','Annually','When significant organizational or environmental changes occur','When a breach occurs','mc',3),(14,'Which of these is NOT an objective of HIPAA?','To instruct CEs on appropriate medical procedures','To decrease abuse and fraud in healthcare','To make health insurance more portable - allowing people to keep their health insurance if they change jobs','To protect the privacy and security of medical records - keeping patient data safe and confidential','mc',3),(15,'Who is considered to be a BA?','Subcontractors and service providers related to PHI','Landlords and cleaning services with access to buildings','Physicians and workforce members','Law enforcement that you must legally disclose information to during an accident','mc',3),(16,'Who needs to be HIPAA experts?','Privacy and Security Officer','All employees','The CEO','The COO','mc',3),(17,'Enforcement penalties change intensity level based on:','Intent and Understandability of the rules that apply','Level of harm','Position of person who violated HIPAA','Personal Biases','mc',3),(18,'What is THE BEST way to significantly decrease the chances of your organization suffering from a breach?','By completing effective Compliance Officer HIPAA Training and putting an effective HIPAA compliance program in place','Ensuring all HIPAA Compliance guidelines are followed to the letter','Encrypting all laptops','Keeping policies up to date','mc',3),(19,'How do most HIPAA violations occur?','Employee Error','Computers without encryption','No policies and procedures','Lack of BAAs','mc',3),(20,'Who should you report a suspicion of violation of HIPAA?','Your supervisor','The CEO','The Office of Civil Rights','No one','mc',3),(21,'Which is not a challenge healthcare providers face when trying to align HIPAA regulations with patient expectations?','The need to constantly update data protections to facilitate trust among patients.','User-generated content that falls outside the categories of PHI and PII.','A complex patchwork of federal consumer data protections overlaid with individual state laws.','Confusion between personal health information (PHI) and personally identifiable information (PII).','mc',3),(22,'Why is it important for laptops to be encrypted?','If laptops are lost or stolen, it is more difficult to hack into the computer and steal phi','To help you sleep at night','It is federally required','So your coworkers cannot steal your credit card information','mc',4),(23,'Which of the following is both the biggest benefit and drawback of bring your own device?','Portability: Mobile devices give physicians access to data from virtually anywhere with an Internet connection, but they also are easily lost or stolen, thus increasing the chance of data breaches.','Ease: Mobile devices allow for real-time data and sharing, but when it comes to technical and regulatory knowledge, they can cause more problems than they prevent.','Finance: BYOD saves money, as employees have added incentive to take care of their own devices. However, if devices are not properly encrypted, implantation can cost much more in the long run. ','Communication: Mobile devices allow physicians to communicate with each other and patients via text messages and webmail, but can also distract them with personal activities.','mc',4),(24,'Which is a current trend in mobile security?','All of these','Access control lists (ACLs): Role-based logins control which users and which mobile devices can access an application.','Signal range control: Enforces security and privacy by restricting where applications can be accessed from.','Remote wipes and auto-locks: Mobile device storage may need to be remotely wiped clean when the device is switched off, and auto-locking may be automatically implemented in the devices is misplaced or stolen.','mc',4),(25,'Which is not a continuous data protection (CDP) backup solution?','Opt-out solution, wherein the care provider chooses not to adopt a backup solution.','Copying CDP server contents to a tape and shipping the tape off-site.','Disk-to-disk-to-cloud, where the backup server stores backups locally, but also uploads backups to the cloud for safekeeping.','Disk-to-disk-to-disk, where companies create a backup of their backup server, preferably located in a data center off-site.','mc',4),(26,'What are the biggest challenges hospitals, in particular, face in BYOD implementation?','All of these','The diversity of mobile devices and no one-size-fits-all solution.','The realization that policy alone is not enough to ensure data security and implementation of technological security measures is difficult.','The realization that though they do not purchase mobile devices, CIOs and hospitals are responsible for them.','mc',4),(27,'When storing sensitive information on laptops and mobile devices you should: ','Use encryption if you must store or transmit sensitive information. ','Only do it sparingly. ','Only store it on Blackberries or PDAs not laptops. ','Ensure there are backups','mc',4),(28,'How many ways to communicate PHI are there?','3','1','2','5','mc',5),(29,'All HIPAA Documentation must be retained for a minimum of:','6 years','2 years','5 years','12 years','mc',5),(30,'You?re at your workstation with a patient file open on your desk and need to step away for just a few minutes. What is the best way to handle the patient file before leaving your workstation?','Close the file and put it in a locked drawer or some other location where it will be out of sight of passersby.','Close the file and leave it where it is.','Leave the file as it is. You?ll be right back.','Ask your neighbor to be sure your workstation is safe.','mc',5),(31,'Where must the Notice of Privacy Practices be displayed in a hospital/clinic?','The waiting room','Every room the patient goes into','In all hallways','On the entrance door','mc',5),(32,'What forms of PHI are hospitals or clinics required to protect?','All of these','Verbal','Paper','Electronic','mc',5),(33,'Which method of communication is best to use when you share PHI with another person who has the right to know?','Face to face in a room with a closed door with only people who need to know','In an elevator','Leaving a message on an answering machine','Over drinks after work','mc',5),(34,'Which of the following is NOT a best practice for privacy and security?','Documents containing PHI do not need to be shredded','Keeping consumer records and other documents containing PHI out of sight','Keeping fax machines in areas that are not generally acceptable','Keeping medical record rooms locked/secured','mc',5),(35,'You are cleaning up the nurse?s station and find an open recycling bin full of paper. You can easily see names, addresses and phone numbers on the paper. What should you do? ','Show it to your supervisor to determine if the information can be shredded. ','Nothing. You can?t be sure the information has anything to do with patients. ','Ask the nurses who work there what information is on the paper.','Place it in the trash so you can continue cleaning the area. ','mc',5),(36,'You enter a conference room for a meeting and notice that several reports with patient information are on the table. What do you do? ','If you can determine who left the reports, return the reports to them. Otherwise, give the reports to you supervisor. ','Notify a cleaning crew member to come clean the room.','Leave the reports where you found them.','Throw the reports in the trash.','mc',5),(37,'You notice that someone has left a computer terminal used to enter orders while still logged on to the system. You leave it as is, thinking the person will return shortly. Later, a patient looks at what has been entered on the screen. Who is responsible for the breach of privacy?','1 and 2','You. You should have protected the information from being disclosed','The person who left the terminal while still logged on','Neither. This is not a breach','mc',5),(38,'An example of a HIPAA violation and a possible breach of unsecured PHI would be:','All of these','Accessing the computer to get information on a neighbor','Releasing a copy of a record to an unauthorized recipient','Disclosing PHI in a conversation with someone outside of the health department','mc',2),(39,'Which of the following is NOT a characteristic of a strong password?','Words found in the dictionary','At least 8 characters in length','A combination of lower and upper case letters','Use of special characters','mc',2),(40,'Which type of cyberattack is known as \"digital kidnapping\"?','Ransomware','Malware','Phishing','Skimming','mc',2),(41,'Which of the following is NOT a red flag for security fraud?','Downloading a file from a secure email with a known sender','An email with an attachment only saying the words \"Please Open\"','A recording saying documents have been filed incorrectly and could result in jail time','An email notifying you to start your HIPAA training, which you just completed','mc',2),(42,'What is the simplest way to stop brute-force cyberattacks dead in their tracks?','Add a few unique characters to any password or PIN','Add a deadbolt lock to all entryways','Shred all paperwork containing sensitive information','Install encryption on all documents and devices','mc',2),(43,'What is the weakest link in cybersecurity?','Humans','Weak encryption','Short passwords','Thumb drive ports','mc',2),(44,'What is the most accurate definition of a Breach?','Any impermissible access, acquisition, use, or disclosure of PHI; with limited exceptions','Any impermissible access, acquisition, use, or disclosure of PHI; with no exceptions','When someone hacks your computer','When someone who is not supposed to have access accesses a server room','mc',2),(45,'You may access the electronic medical record of a co-worker when: ','You are involved in his/her care and have a job-related need to know','You need to confirm whether his/her medical leave is valid ','You need to know where he or she is in the hospital so you can visit ','You are curious','mc',2),(46,'The Notice of Privacy Practices:','Is offered to the patient during their first visit','Must be given to a patient at every visit','Must be accepted by the patient','None of these options','mc',1),(47,'What is the purpose of the HIPAA Privacy Rule?','To permit important uses of information, while protecting patient privacy.','To protect the integrity, availability, and confidentiality of all ePHI','To outline privacy requirements of the organization','To prepare you for the privacy rule test','mc',1),(48,'What is the purpose of the Minimum Necessary component in the Privacy Rule?','To prevent breaches of PHI by only giving a workforce member access to the minimum amount of PHI needed to complete fulfill their responsibilities.','To inform patients the minimum amount of information they must share in order to receive medical treatment.','This refers to the minimum fine necessary for any healthcare breach.','To make your job more difficult.','mc',1),(49,'What should not be displayed on a patient sign-in sheet?','Reason for Appointment','Patient Name ','Time of Appointment','Physician Name  ','mc',1),(50,'Which of the following is a permitted use of PHI information under HIPAA','All of these','Informal uses open for agreement or objection','Incidental uses and disclosures','Uses and disclosures for the public benefit and interest','mc',1),(51,'Dr. Jones, head of surgery, asks to see Kristi Smith?s chart. Dr. Jones is not Kristi?s physician but Kristi is his wife?s best friend and he wants to see how she is doing. What do you do? ','Ask Dr. Jones for the appropriate written authorization to review Kristi?s chart. ','Give Dr. Jones the chart. ','Tell Dr. Jones that he cannot see the chart since he is not the patient?s physician. ','Tell Dr. Jones you are too busy to get the chart. ','mc',1),(52,'Protected health information that should be kept confidential includes a patient?s: ','All of these','Medical information stored electronically ','Name, address, and social security number ','Diagnosis, procedures received, lab results ','mc',1),(53,'A prominent politician is a patient at the facility where you work. Administration wants you to check his medical record to be sure his surgery was successful. Your job gives you access to everyone?s patient records. What should you do? ','Explain that no one in healthcare should look at patient records unless involved in that patient?s care or has business responsibilities or written authorization from the patient or his or her representative. ','Look at the chart and share only information that is public knowledge. ','Look at his medical records but don?t share any of the information. ','Don?t look at the chart and give them misinformation','mc',1),(54,'It is not appropriate for me to access or use patient protected health information: ','To find out about my friend?s condition after seeing her in the waiting area of a practice.','To perform my job responsibilities. ','When treating a patient or billing for services provided to a patient. ','2 and 3','mc',1),(55,'What are the correct ingredients in a California Burrito?','Carne Asada, Pico de Gallo/Salsa, Cheese, Sour Cream, Guacamole, French Fries','Beans and Cheese','Chicken, Sour cream, Cheese, Rice, Beans, Guacamole','Lettuce, Pico de Gallo/Salsa, Cheese, Sour Cream, Guacamole, Beans, Rice','mc',6),(56,'2 + 2 is ____.','4','null','null','null','fill',6),(57,'What is the first month of the year?','January','February','March','April','mc',6),(58,'____ is the last month of the year.','december','null','null','null','fill',6),(59,'Match the following:','15 / 5','7 x 7','10 + 6','25 - 3','match',6),(60,'What does SAFER stand for?','Safety Assurance Factors for EHR Resilience','Safety Assets For EHR Resilience','Safe Attitudes For Emergency Resilience','Safer Attitiudes for Emerging Revenue','mc',30),(61,'Which of the following is NOT one of the SAFER high priority practices for Safe Health IT?','Do not leave sensitive patient data lying around for someone to see.','Data and application configurations are backed up andhardware systems are redundant','EHR downtime and reactivation policies and procedures are complete, available, and reviewed regularly.','Allergies, problem list entries, and diagnostic test results, including interpretations of those results, such as \"normal\" and \"high,\" are entered/stored using standard, coded data elements in the EHR.','mc',30);
/*!40000 ALTER TABLE `Questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `UseraActivity`
--
CREATE TABLE `UserActivity` (
  `userID` mediumint NOT NULL,
  `moduleID` int NOT NULL,
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  `points` int NOT NULL,
  `percentage` double NOT NULL,
  `time` float NOT NULL,
  KEY `userID` (`userID`),
  KEY `moduleID` (`moduleID`),
  CONSTRAINT `UserActivity_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`userid`) ON DELETE CASCADE,
  CONSTRAINT `UserActivity_ibfk_2` FOREIGN KEY (`moduleID`) REFERENCES `learningmodules` (`ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `UserActivity` WRITE;
/*!40000 ALTER TABLE `UserActivity` DISABLE KEYS */;
INSERT INTO `UserActivity` VALUES (264,6,'2022-11-21 09:46:19',400,0.3333333333333333,10),(265,6,'2022-11-21 19:44:00',600,1,10),(264,6,'2022-12-01 14:15:10',150,0.5,10),(264,6,'2022-12-01 14:16:04',400,1,10),(264,2,'2022-12-01 14:18:56',100,0.125,10),(264,2,'2022-12-01 14:20:23',600,0.75,10),(264,5,'2022-12-01 15:02:46',200,0.2,10),(264,5,'2022-12-01 15:03:22',500,0.5,10),(264,5,'2022-12-01 15:03:45',400,0.4,10),(264,6,'2022-12-05 15:16:37',250,0.6666666666666666,10),(264,5,'2022-12-05 15:32:29',200,0.2,10),(264,6,'2022-12-06 14:31:39',300,1,10),(269,6,'2022-12-06 18:11:48',600,0.8,10),(269,6,'2022-12-07 13:45:58',600,0.8,10),(269,6,'2022-12-07 17:47:51',700,1,10),(264,6,'2023-01-22 22:16:11',-100,0.2,10),(264,6,'2023-01-22 22:16:40',-100,0.2,10),(264,6,'2023-01-22 22:18:45',-100,0.2,10),(264,6,'2023-01-22 22:19:05',50,0.4,10),(264,6,'2023-01-22 22:19:32',50,0.4,10),(264,6,'2023-01-22 22:19:41',50,0.4,10),(264,6,'2023-01-22 22:21:28',50,0.4,10),(264,6,'2023-01-22 22:26:45',50,0.4,10),(264,6,'2023-01-22 22:26:59',-150,0,10),(264,6,'2023-01-22 22:27:31',-150,0,10),(264,6,'2023-01-22 22:32:26',-100,0.2,10),(264,6,'2023-01-22 22:34:24',-100,0.2,10),(264,6,'2023-01-22 22:42:49',-150,0,10),(264,6,'2023-01-22 22:43:51',-150,0,10),(264,6,'2023-01-22 22:44:29',-75,0.2,10),(264,6,'2023-01-22 22:45:20',-75,0.2,10),(264,6,'2023-01-22 22:45:54',-100,0.2,10),(264,6,'2023-01-22 22:51:20',-100,0.2,10),(264,6,'2023-01-22 22:51:44',-175,0,10),(264,6,'2023-01-22 22:52:56',-175,0,10),(264,6,'2023-01-22 23:01:08',-150,0,10),(264,6,'2023-01-22 23:01:33',-150,0,10),(264,6,'2023-01-22 23:01:58',-75,0.2,10),(264,6,'2023-01-22 23:05:33',0,0.4,10),(264,6,'2023-01-22 23:06:37',0,0.4,10),(264,6,'2023-01-22 23:08:44',0,0.4,10),(264,6,'2023-01-22 23:09:42',0,0.4,10),(264,6,'2023-01-22 23:09:53',0,0.4,10),(264,6,'2023-01-22 23:10:02',0,0.4,10),(264,6,'2023-01-22 23:10:58',0,0.4,10),(264,6,'2023-01-22 23:11:05',0,0.4,10),(264,6,'2023-01-22 23:12:11',-100,0.2,10),(264,6,'2023-01-22 23:12:51',-100,0.2,10),(264,6,'2023-01-22 23:13:06',-100,0.2,10),(264,6,'2023-01-22 23:13:40',50,0.4,10),(264,6,'2023-01-22 23:14:20',50,0.4,10),(264,6,'2023-01-24 08:49:25',300,1,18.2),(264,6,'2023-01-24 09:37:27',300,1,18.2),(264,6,'2023-01-24 09:43:30',-50,0.2,8.3),(264,6,'2023-01-24 09:53:09',300,1,18.8),(264,6,'2023-01-24 09:53:25',50,0.2,5.6),(264,6,'2023-01-24 09:53:52',50,0.2,5.6),(264,6,'2023-01-24 09:55:33',50,0.2,0),(264,6,'2023-01-24 10:02:43',50,0.2,327.8),(264,6,'2023-01-24 10:02:58',50,0.2,1.4),(264,6,'2023-01-24 10:03:24',325,0.8,13.7),(264,6,'2023-01-24 10:03:39',325,0.8,13.7),(264,6,'2023-01-24 10:03:48',200,0.6,6.4),(264,6,'2023-01-24 10:05:06',200,0.6,6.4),(264,6,'2023-01-24 10:05:32',200,0.6,26.1),(264,6,'2023-01-24 10:06:20',200,0.6,0),(264,6,'2023-01-24 10:06:33',0,0.2,7.2),(264,6,'2023-01-24 10:06:44',0,0.2,7.2),(264,6,'2023-01-24 10:07:30',0,0.2,0),(264,6,'2023-01-24 10:09:52',0,0.2,0),(264,6,'2023-01-24 10:11:50',0,0.2,118),(264,6,'2023-01-24 10:12:16',300,0.8,14.8),(264,6,'2023-01-24 10:12:56',200,0.8,14.8),(264,6,'2023-01-24 10:13:26',300,0.8,11.6),(264,6,'2023-01-24 18:07:56',100,0.6,166.7),(264,6,'2023-01-24 18:08:21',400,1,14.8),(264,30,'2023-01-26 08:58:55',0,0,15.4),(264,30,'2023-01-26 08:59:29',200,1,10.5),(264,30,'2023-01-26 09:10:49',0,0,16.6),(264,30,'2023-01-26 09:11:07',300,1,7.9),(264,30,'2023-01-26 09:13:30',200,1,10.2),(264,30,'2023-01-26 09:14:08',300,1,3.4),(264,30,'2023-01-26 09:15:35',300,1,4.8),(264,30,'2023-01-26 09:18:03',300,1,8.5),(264,30,'2023-01-26 09:23:32',300,1,6.5),(264,30,'2023-01-26 09:25:38',300,1,4.6),(264,30,'2023-01-26 09:27:33',300,1,7.1),(264,30,'2023-01-26 09:30:12',200,1,10.5),(264,30,'2023-01-26 10:06:38',300,1,6.9),(264,30,'2023-01-26 10:08:40',300,1,4.2),(264,30,'2023-01-26 10:11:21',300,1,4.5),(264,30,'2023-01-26 17:58:28',300,1,5.4),(264,6,'2023-01-31 16:45:22',0,0.4,41.9),(264,6,'2023-01-31 17:57:28',300,1,30.2),(264,6,'2023-01-31 18:10:43',100,0.6,31.3),(264,6,'2023-02-05 21:45:08',400,1,16.9),(264,6,'2023-02-05 21:48:29',300,1,58.2),(264,6,'2023-02-05 21:48:57',300,1,58.2),(264,6,'2023-02-05 21:52:08',400,1,19.4),(264,6,'2023-02-05 21:55:02',400,1,15.6),(264,6,'2023-02-05 22:00:53',400,1,20.1),(264,6,'2023-02-05 22:04:35',400,1,14.1),(264,6,'2023-02-05 22:20:14',400,1,16.5),(264,6,'2023-02-05 22:25:08',400,1,22.2),(264,6,'2023-02-05 22:45:14',400,1,21.9),(264,6,'2023-02-06 21:03:51',100,0.6,43.9),(264,6,'2023-02-06 21:06:16',25,0.2,19.1),(264,6,'2023-02-09 10:20:18',300,1,43.5),(264,6,'2023-02-09 10:20:47',200,0.6,19.5),(264,6,'2023-02-09 18:00:59',300,1,32.1);
/*!40000 ALTER TABLE `UserActivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `UserPoints`
--
CREATE TABLE `UserPoints` (
  `PointsID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `CompanyID` int DEFAULT NULL,
  PRIMARY KEY (`PointsID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `UserPoints` WRITE;
/*!40000 ALTER TABLE `UserPoints` DISABLE KEYS */;
INSERT INTO `UserPoints` VALUES (6,264,1);
/*!40000 ALTER TABLE `UserPoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure and data for table `Websiteadmins`
--
CREATE TABLE `WebsiteAdmins` (
  `UserID` int NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
LOCK TABLES `WebsiteAdmins` WRITE;
/*!40000 ALTER TABLE `WebsiteAdmins` DISABLE KEYS */;
INSERT INTO `WebsiteAdmins` VALUES (266),(269);
/*!40000 ALTER TABLE `WebsiteAdmins` ENABLE KEYS */;
UNLOCK TABLES;

-- Dump completed on 2023-02-13 22:51:28
