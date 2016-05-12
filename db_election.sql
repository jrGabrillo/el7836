-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2016 at 02:13 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `db_election`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_access`
--

CREATE TABLE IF NOT EXISTS `tbl_access` (
  `access_id` varchar(50) NOT NULL,
  `student_id` varchar(20) NOT NULL,
  `access_passcode` varchar(8) NOT NULL,
  `election_id` varchar(50) NOT NULL,
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_candidate`
--

CREATE TABLE IF NOT EXISTS `tbl_candidate` (
  `candidate_id` varchar(50) NOT NULL,
  `candidate_student_id` varchar(50) NOT NULL,
  `candidate_position` varchar(50) NOT NULL,
  `candidate_purpose` varchar(500) NOT NULL,
  `candidate_achievement` varchar(500) NOT NULL,
  `candidate_politicalparty` varchar(50) NOT NULL,
  `election_id` varchar(50) NOT NULL,
  `votes` int(10) NOT NULL,
  PRIMARY KEY (`candidate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_candidate`
--

INSERT INTO `tbl_candidate` (`candidate_id`, `candidate_student_id`, `candidate_position`, `candidate_purpose`, `candidate_achievement`, `candidate_politicalparty`, `election_id`, `votes`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', 'Aaaa', 'Grade 10 Representative', 'yyy', 'yyy', 'yyyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', '13-LN-131313', 'Grade 10 Representative', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('1574bddb75c78a6fd2251d61e2993b5146201319', '12ln00875', 'Grade 9 Representative', 'yyy', 'yyy', 'yyyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('17ba0791499db908433b80f37c5fbc89b870084b', '15-LN-0000', 'Grade 12 Representative', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('1b6453892473a467d07372d45eb05abc2031647a', '11-LN-0002', 'Auditor', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('356a192b7913b04c54574d18c28d46e6395428ab', '11-LN-0004', 'Vice President', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('472b07b9fcf2c2451e8781e944bf5f77cd8457c8', '0998876676', 'Grade 7 Representative', 'xxxx', 'xxxxx', 'xxxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('77de68daecd823babbb58edb1c8e14d7106e83bb', '11-LN-0001', 'Treasurer', 'xxxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'qqqq', 'President', 'yyy', 'yyy', 'yyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('902ba3cda1883801594b6e1b452790cc53948fda', '111', 'Grade 8 Representative', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'Xxx', 'Grade 7 Representative', 'sss', 'ssss', 'sss', '356a192b7913b04c54574d18c28d46e6395428ab', 0),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'cccc', 'Grade 11 Representative', 'yyy', 'yyy', 'yyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', '11-LN-00083', 'Auditor', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', '11-qwerty-1223', 'Grade 11 Representative', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Xxx', 'Grade 11 Representative', 'yyy', 'yyy', 'yyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', '15-LN-00304', 'President', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', '15-LN-00021', 'Vice President', 'yyy', 'yyy', 'yyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('c1dfd96eea8cc2b62785275bca38ac261256e278', '11-LN-0083', 'PIO', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'eeeee', 'Secretary', 'xx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('f1abd670358e036c31296e66b3b66c382ac00812', 'ssssss', 'Peace Officer', 'yyy', 'yyy', 'yyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', '1113334454566', 'Secretary', 'yyy', 'yyy', 'yyy', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', '11-LN-0003', 'Grade 9 Representative', 'xxx', 'xxx', 'xxx', 'b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_election`
--

CREATE TABLE IF NOT EXISTS `tbl_election` (
  `election_id` varchar(50) NOT NULL,
  `election_title` varchar(100) NOT NULL,
  `election_date` varchar(50) NOT NULL,
  `election_details` varchar(250) NOT NULL,
  `status` varchar(1) NOT NULL,
  PRIMARY KEY (`election_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_election`
--

INSERT INTO `tbl_election` (`election_id`, `election_title`, `election_date`, `election_details`, `status`) VALUES
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Sample Election', '05-07-2016 00:00:00', '[22,0]', '1');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_events`
--

CREATE TABLE IF NOT EXISTS `tbl_events` (
  `id` varchar(50) NOT NULL,
  `events` varchar(2000) NOT NULL,
  `status` varchar(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_events`
--

INSERT INTO `tbl_events` (`id`, `events`, `status`) VALUES
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', '{"organize-election":[{"title":"1. New Election","start":"05-12-2016 00:00:00","end":"05-12-2016 00:00:00","className":"bg-purple","media":"","description":"Start new poll. This will initiate the election","allDay":false}],"candidate_nomination":[{"title":"2. Candidates Nomination","start":"05-12-2016 00:00:00","end":"05-12-2016 00:00:00","className":"bg-blue","media":"","description":"Nominate eligible candidates","allDay":false}],"voter_validation":[{"title":"3. Validate Voters","start":"05-12-2016 00:00:00","end":"05-12-2016 00:00:00","className":"bg-green","media":"","description":"Validate active voters","allDay":false}],"grant_access":[{"title":"4. Grant Access","start":"05-12-2016 00:00:00","end":"05-12-2016 00:00:00","className":"bg-orange","media":"","description":"Validated voters will gain access to vote","allDay":false}],"election_day":[{"title":"5. Election Day","start":"05-12-2016 06:00:00","end":"05-13-2016 00:00:00","className":"bg-red","media":"","description":"Validated voters can vote candidates","allDay":false}]}', '0');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE IF NOT EXISTS `tbl_user` (
  `user_id` varchar(50) NOT NULL,
  `user_name` varchar(250) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_level` int(2) NOT NULL,
  `user_picture` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`user_id`, `user_name`, `user_password`, `user_email`, `user_level`, `user_picture`) VALUES
('1', 'admin', '01b307acba4f54f55aafc33bb06bbbf6ca803e9a', 'rufo.gabrillo@gmail.com', 1, '862075acf96b35f4166faea449b69d6e40f18385-1452445843.png');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_voter`
--

CREATE TABLE IF NOT EXISTS `tbl_voter` (
  `voter_id` varchar(50) NOT NULL,
  `voter_fname` varchar(50) NOT NULL,
  `voter_mname` varchar(50) NOT NULL,
  `voter_gname` varchar(50) NOT NULL,
  `voter_dob` varchar(50) NOT NULL,
  `voter_gender` varchar(10) NOT NULL,
  `voter_education` int(1) NOT NULL,
  `voter_student_id` varchar(50) NOT NULL,
  `voter_section` varchar(10) NOT NULL,
  `voter_yearlevel` varchar(50) NOT NULL,
  `voter_status` int(1) NOT NULL,
  `voter_image` varchar(250) NOT NULL,
  `date` varchar(20) NOT NULL,
  `vote_status` int(1) NOT NULL,
  PRIMARY KEY (`voter_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_voter`
--

INSERT INTO `tbl_voter` (`voter_id`, `voter_fname`, `voter_mname`, `voter_gname`, `voter_dob`, `voter_gender`, `voter_education`, `voter_student_id`, `voter_section`, `voter_yearlevel`, `voter_status`, `voter_image`, `date`, `vote_status`) VALUES
('0716d9708d321ffb6a00818614779e779925365c', 'Xxx', 'Xxx', 'Xxx', 'January-1-2006', 'Male', 2, 'Xxx', 'Goku', 'Grade 8', 0, 'af35b494002389c0bb343f962d40e8e53ed2af28-1457072334.png', '2016-05-12 19:28:29', 0),
('0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'Pascual', 'Gabrillo', 'Piolo', 'January-1-2006', 'Male', 2, '15-LN-0000', 'ssss', 'Grade 4', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('1574bddb75c78a6fd2251d61e2993b5146201319', 'Qqq', 'Qqqq', 'Qqqq', 'January-1-2006', 'Male', 2, 'qqqq', 'qqqqq', 'Grade 4', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('17ba0791499db908433b80f37c5fbc89b870084b', 'Ssss', 'Ssss', 'Ssss', 'January-1-2006', 'Male', 2, 'ssssss', 'ssss', 'Second Year', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('1b6453892473a467d07372d45eb05abc2031647a', 'Eeeee', 'Eeeee', 'Eeeee', 'January-1-2006', 'Male', 2, 'eeeee', 'eeeee ', 'Grade 4', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('356a192b7913b04c54574d18c28d46e6395428ab', 'Gabrillo', 'Narcisi', 'Rufo', 'January-1-2006', 'Male', 2, '111', '111s', 'First Year', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('4d134bc072212ace2df385dae143139da74ec0ef', 'Bean', 'Bean', 'Bean', 'January-1-2006', 'Male', 2, '1234567890', 'Malago', 'Grade 8', 0, 'd92cb0e6290b7bc3604729cfe3f6f91265e31378-1462114021.jpg', '2016-05-12 19:28:29', 0),
('77de68daecd823babbb58edb1c8e14d7106e83bb', 'Gabrillo', 'Narcisi', 'Rufo', 'January-1-2006', 'Male', 2, '11-LN-00083', 'Sampaguita', 'First Year', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('7b52009b64fd0a2a49e6d8a939753077792b0554', 'Gabrillo', 'Narcisi', 'Rufo', 'January-1-2006', 'Male', 2, '11-LN-0002', 'A', 'Grade 5', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('902ba3cda1883801594b6e1b452790cc53948fda', 'Norte', 'Jefferson', 'Yujico ', 'January-1-2006', 'Male', 2, '11-qwerty-1223', 'coc', 'Grade 8', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('91032ad7bbcb6cf72875e8e8207dcfba80173f7c', 'Cabling', 'Nikki', 'Nikki', 'January-1-2006', 'Female', 2, '0998876676', 'Mabulas', 'Grade 8', 0, '7c4fe28d8949a7a36c5a1f30e8ce507f9d97c5de-1462112057.jpg', '2016-05-12 19:28:29', 0),
('9e6a55b6b4563e652a23be9d623ca5055c356940', 'Soriano', 'Jose', 'Kenneth', 'January-1-2006', 'Male', 2, '1113334454566', 'rfrffffff', 'Grade 4', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('ac3478d69a3c81fa62e60f5c3696165a4e5e6ac4', 'Gabrillo', 'Narcisi', 'Rufo', 'January-1-2006', 'Male', 2, '11-LN-0001', 'xxx', 'First Year', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('b1d5781111d84f7b3fe45a0852e59758cd7a87e5', 'Www', 'Aaa', 'Aaa', 'January-1-2006', 'Male', 2, 'Aaaa', 'Masanting', 'Grade 8', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('b3f0c7f6bb763af1be91d9e74eabfeb199dc1f1f', 'Tobias', 'Manlapaz', 'Micaella May', 'January-1-2006', 'Female', 2, '12ln00875', 'Amber', 'Grade 4', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('b6589fc6ab0dc82cf12099d1c2d40ab994e8410c', 'Manlapas', 'Tobias', 'Micaella', 'January-1-2006', 'Female', 2, '13-LN-131313', 'Cattleya', 'Senior High', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('bd307a3ec329e10a2cff8fb87480823da114f8f4', 'Manlapas', 'Tobias', 'Micaella', 'January-1-2006', 'Female', 2, '11-LN-0003', 'Macapuno', 'Junior High', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('c1dfd96eea8cc2b62785275bca38ac261256e278', 'Gabrillo', 'Narcisi', 'Rufo', 'January-1-2006', 'Male', 2, '11-LN-0083', 'Mabolo', 'Grade 8', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('da4b9237bacccdf19c0760cab7aec4a8359010b0', 'Caboteja', 'Meneses', 'Roldan', 'January-1-2006', 'Male', 2, '15-LN-00304', 'matulungin', 'Senior High', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('f1abd670358e036c31296e66b3b66c382ac00812', 'Xx', 'Xxx', 'Xxx', 'January-1-2006', 'Male', 2, 'cccc', 'Makaraw', 'Grade 8', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('fa35e192121eabf3dabf9f5ea6abdbcbc107ac3b', 'Carranza', 'Cruz', 'Baden Dawrin', 'January-1-2006', 'Female', 2, '11-LN-0004', 'Buko', 'Junior  High', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0),
('fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'Reid', 'Gabrillo', 'James', 'January-1-2006', 'Male', 2, '15-LN-00021', 'talaba', 'Grade 8', 0, 'profile avatar.jpg', '2016-05-12 19:28:29', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
