-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: discussion-posts.cjfyeuyfxdnp.us-east-1.rds.amazonaws.com    Database: discussion_posts
-- ------------------------------------------------------
-- Server version	8.0.28

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `content` text,
  `attachment_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_id` FOREIGN KEY (`post_id`) REFERENCES `discussion_post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,'Swan','It’s due on 15 May 8:30AM. Here is the project specification','https://s3.amazonaws.com/post/project_specification.pdf','2023-05-15 09:30:10'),(2,1,'Htet','I\'m not sure about the exact deadline, but it should be mentioned in the course syllabus.',NULL,'2023-05-16 10:15:00'),(3,2,'Aung','When designing a database, make sure to identify the entities and their relationships first.',NULL,'2023-06-02 09:00:00'),(4,3,'David','Please provide more details about the issue you are facing with your Python code.',NULL,'2023-06-11 08:45:20'),(5,4,'John','For web application development, popular JavaScript frameworks include React, Angular, and Vue.js.',NULL,'2023-06-13 11:20:45'),(6,5,'alice12','Some interesting data science project ideas include sentiment analysis, recommendation systems, and predictive modeling.',NULL,'2023-06-14 15:30:00'),(7,6,'mark34','The random forest algorithm is an ensemble learning method that combines multiple decision trees to make predictions.',NULL,'2023-06-15 10:50:30'),(8,7,'jane567','Recommended resources for learning UX design: \"Don\'t Make Me Think\" by Steve Krug and \"The Design of Everyday Things\" by Don Norman.','https://s3.amazonaws.com/post/ux_resources.pdf','2023-06-17 17:15:10'),(9,8,'Ghorge','Popular frameworks for cross-platform mobile app development include Flutter, React Native, and Xamarin.',NULL,'2023-06-19 12:00:00'),(10,9,'sam789','Some popular data visualization tools are Tableau, Power BI, and D3.js.',NULL,'2023-06-20 09:30:20'),(16,10,'Abhishek','That is because of the loop. Here is the correct code','https://s3.amazonaws.com/post/screenshot1','2023-06-25 00:00:00');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discussion_post`
--

DROP TABLE IF EXISTS `discussion_post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discussion_post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `img_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discussion_post`
--

LOCK TABLES `discussion_post` WRITE;
/*!40000 ALTER TABLE `discussion_post` DISABLE KEYS */;
INSERT INTO `discussion_post` VALUES (1,'swan123','CADV assignment','Does anyone know what the deadline for CADV part 1 assignment is?','https://s3.amazonaws.com/post/image.jpg','2023-05-15 08:30:10'),(2,'john456','Database Design Question','I\'m struggling with designing a relational database. Any tips?','https://s3.amazonaws.com/post/image5.jpg','2023-06-01 12:45:00'),(3,'emma789','Python Programming Help','Looking for assistance in debugging my Python code. Any volunteers?','https://s3.amazonaws.com/post/image2.jpg','2023-06-10 17:22:30'),(4,'user987','JavaScript Framework Comparison','Which JavaScript framework is better suited for building web applications?',NULL,'2023-06-12 09:10:00'),(5,'alice12','Data Science Project Ideas','I\'m looking for interesting project ideas in the field of data science. Any suggestions?','https://s3.amazonaws.com/post/image6.jpg','2023-06-14 14:30:45'),(6,'mark34','Machine Learning Algorithm','Can anyone explain the working principle of the random forest algorithm?','https://s3.amazonaws.com/post/image7.jpg','2023-06-15 10:05:20'),(7,'jane567','UX Design Resources','I need some recommended resources for learning about user experience (UX) design.','https://s3.amazonaws.com/post/image3.jpg','2023-06-17 16:45:00'),(8,'user123','Mobile App Development Frameworks','Which framework would you suggest for developing cross-platform mobile apps?',NULL,'2023-06-19 11:20:10'),(9,'sam789','Data Visualization Tools','What are some popular tools for creating interactive data visualizations?','https://s3.amazonaws.com/post/image4.jpg','2023-06-20 08:15:30'),(10,'david','Cloud Computing Providers','I\'m looking for reliable cloud computing providers. Any recommendations?','https://s3.amazonaws.com/post/image8.jpg','2023-06-21 13:40:15');
/*!40000 ALTER TABLE `discussion_post` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-27  9:39:59
