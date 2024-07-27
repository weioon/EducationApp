-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2024 at 09:07 AM
-- Server version: 9.0.1
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mb_edu_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int NOT NULL,
  `course_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `course_code` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `instructor` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `schedule` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_name`, `course_code`, `instructor`, `schedule`) VALUES
(1, 'Introduction to Programming', 'CS101', 'Dr. John Doe', 'Mon 10:00-12:00'),
(2, 'Data Structures', 'CS102', 'Dr. Jane Smith', 'Tue 14:00-16:00'),
(3, 'Database Systems', 'CS103', 'Dr. Emily Johnson', 'Wed 09:00-11:00'),
(4, 'Operating Systems', 'CS104', 'Dr. Michael Brown', 'Thu 13:00-15:00'),
(5, 'Computer Networks', 'CS105', 'Dr. William Davis', 'Fri 11:00-13:00'),
(6, 'Software Engineering', 'CS106', 'Dr. Linda Wilson', 'Mon 14:00-16:00'),
(7, 'Artificial Intelligence', 'CS107', 'Dr. Barbara Martinez', 'Tue 10:00-12:00'),
(8, 'Machine Learning', 'CS108', 'Dr. James Anderson', 'Wed 14:00-16:00'),
(9, 'Cyber Security', 'CS109', 'Dr. Patricia Thomas', 'Thu 09:00-11:00'),
(10, 'Cloud Computing', 'CS110', 'Dr. Robert Jackson', 'Fri 14:00-16:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` text,
  `security_answer` varchar(255) DEFAULT NULL,
  `time_registered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `student_id`, `password`, `phone_number`, `address`, `security_answer`, `time_registered`) VALUES
(14, 'namefk', 'a@b.com', '123', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', '0123456789', '1234', '1234', '2024-07-26 01:26:47'),
(15, '1', '1', '1', '1', '1', '1', '1', '2024-07-26 08:40:49'),
(16, '1', '1', '1', '123', '1', '1', '1', '2024-07-26 20:33:01'),
(17, '22', '22', '22', '12c6fc06c99a462375eeb3f43dfd832b08ca9e17', '22', '22', '22', '2024-07-26 20:35:41');

-- --------------------------------------------------------

--
-- Table structure for table `user_courses`
--

CREATE TABLE `user_courses` (
  `ucid` int NOT NULL,
  `id` int NOT NULL,
  `name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `schedule` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_courses`
--

INSERT INTO `user_courses` (`ucid`, `id`, `name`, `schedule`, `created_at`) VALUES
(4, 14, 'Data Structures', 'Tue 14:00-16:00', '2024-07-26 18:28:02'),
(5, 14, 'Database Systems', 'Wed 09:00-11:00', '2024-07-26 20:21:52'),
(6, 14, 'Computer Networks', 'Fri 11:00-13:00', '2024-07-26 20:21:54');

-- --------------------------------------------------------

--
-- Table structure for table `user_feedback`
--

CREATE TABLE `user_feedback` (
  `feedback_id` int NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `feedback` text NOT NULL,
  `photo` longblob,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_feedback`
--

INSERT INTO `user_feedback` (`feedback_id`, `user_id`, `feedback`, `photo`, `created_at`) VALUES
(1, '14', 'adssd', NULL, '2024-07-26 20:14:57'),
(2, '14', 'hi', '', '2024-07-26 20:15:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_courses`
--
ALTER TABLE `user_courses`
  ADD PRIMARY KEY (`ucid`);

--
-- Indexes for table `user_feedback`
--
ALTER TABLE `user_feedback`
  ADD PRIMARY KEY (`feedback_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_courses`
--
ALTER TABLE `user_courses`
  MODIFY `ucid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_feedback`
--
ALTER TABLE `user_feedback`
  MODIFY `feedback_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
