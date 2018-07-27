-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 27-Jul-2018 às 21:00
-- Versão do servidor: 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `muron`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `chats_mensagens`
--

CREATE TABLE `chats_mensagens` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_usuario_para` int(11) NOT NULL,
  `texto` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `chats_mensagens`
--

INSERT INTO `chats_mensagens` (`id`, `id_usuario`, `id_usuario_para`, `texto`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(2, 1, 10, 'eae', 0, '2018-04-02 19:33:32', '2018-04-02 19:33:32'),
(3, 10, 1, 'olaaa', 0, '2018-04-02 19:33:32', '2018-04-02 19:33:32'),
(4, 1, 10, 'Pode pa ?', 0, '2018-04-02 19:37:17', '2018-04-02 19:37:17'),
(5, 1, 10, 'ee', 0, '2018-04-02 19:42:14', '2018-04-02 19:42:14'),
(6, 1, 10, 'q', 0, '2018-04-02 19:54:58', '2018-04-02 19:54:58'),
(7, 1, 10, 'bla bla bla', 0, '2018-04-02 19:56:03', '2018-04-02 19:56:03'),
(8, 1, 10, 'dqwdqwdqw', 0, '2018-04-02 19:56:15', '2018-04-02 19:56:15'),
(9, 1, 10, 'fwefwefew', 0, '2018-04-02 19:56:17', '2018-04-02 19:56:17'),
(10, 1, 10, 'f', 0, '2018-04-02 19:58:06', '2018-04-02 19:58:06'),
(11, 15, 1, 'Oi', 0, '2018-04-12 21:11:30', '2018-04-12 21:11:30'),
(12, 15, 1, 'Você não me responde', 0, '2018-04-12 22:15:36', '2018-04-12 22:15:36'),
(13, 15, 1, 'Para de me ignorar', 0, '2018-04-12 22:15:51', '2018-04-12 22:15:51'),
(14, 15, 1, 'Teste', 0, '2018-04-12 22:24:59', '2018-04-12 22:24:59'),
(15, 19, 15, 'Oi', 0, '2018-04-12 22:30:18', '2018-04-12 22:30:18'),
(16, 15, 19, 'Como vai', 0, '2018-04-12 22:36:39', '2018-04-12 22:36:39'),
(17, 1, 15, 'gregerger', 0, '2018-05-14 18:16:43', '2018-05-14 18:16:43'),
(18, 1, 27, 'zx', 0, '2018-06-18 15:24:34', '2018-06-18 15:24:34'),
(19, 31, 39, 'kojo', 0, '2018-07-10 21:30:59', '2018-07-10 21:30:59');

-- --------------------------------------------------------

--
-- Estrutura da tabela `chats_mensagens_bkp`
--

CREATE TABLE `chats_mensagens_bkp` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_usuario_para` int(11) NOT NULL,
  `texto` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `chats_mensagens_bkp`
--

INSERT INTO `chats_mensagens_bkp` (`id`, `id_usuario`, `id_usuario_para`, `texto`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(2, 1, 10, 'eae', 0, '2018-04-02 19:33:32', '2018-04-02 19:33:32'),
(3, 10, 1, 'olaaa', 0, '2018-04-02 19:33:32', '2018-04-02 19:33:32'),
(4, 1, 10, 'Pode pa ?', 0, '2018-04-02 19:37:17', '2018-04-02 19:37:17'),
(5, 1, 10, 'ee', 0, '2018-04-02 19:42:14', '2018-04-02 19:42:14'),
(6, 1, 10, 'q', 0, '2018-04-02 19:54:58', '2018-04-02 19:54:58'),
(7, 1, 10, 'bla bla bla', 0, '2018-04-02 19:56:03', '2018-04-02 19:56:03'),
(8, 1, 10, 'dqwdqwdqw', 0, '2018-04-02 19:56:15', '2018-04-02 19:56:15'),
(9, 1, 10, 'fwefwefew', 0, '2018-04-02 19:56:17', '2018-04-02 19:56:17'),
(10, 1, 10, 'f', 0, '2018-04-02 19:58:06', '2018-04-02 19:58:06'),
(11, 1, 8, 'Ola', 0, '2018-04-10 18:19:02', '2018-04-10 18:19:02'),
(12, 1, 9, 'Oi', 0, '2018-04-10 18:38:40', '2018-04-10 18:38:40'),
(13, 1, 10, 'Eae', 0, '2018-04-10 19:09:13', '2018-04-10 19:09:13'),
(14, 1, 8, 'Oi', 0, '2018-04-10 20:53:16', '2018-04-10 20:53:16'),
(15, 1, 8, 'Ola', 0, '2018-04-10 20:56:17', '2018-04-10 20:56:17'),
(16, 1, 9, 'Ola', 0, '2018-04-10 20:56:28', '2018-04-10 20:56:28'),
(17, 1, 10, 'Ola', 0, '2018-04-10 20:56:34', '2018-04-10 20:56:34'),
(18, 1, 9, 'Oooooiiiii', 0, '2018-04-10 20:56:45', '2018-04-10 20:56:45'),
(19, 1, 9, 'Testeeeee', 0, '2018-04-10 20:56:51', '2018-04-10 20:56:51'),
(20, 1, 8, 'Ooöoii', 0, '2018-04-10 20:57:02', '2018-04-10 20:57:02');

-- --------------------------------------------------------

--
-- Estrutura da tabela `faculdades`
--

CREATE TABLE `faculdades` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `nome_contato` varchar(200) DEFAULT NULL,
  `descricao` text,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `faculdades`
--

INSERT INTO `faculdades` (`id`, `nome`, `nome_contato`, `descricao`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(1, 'Bla', 'blla', 'bla', 0, '2018-07-13 18:11:13', '2018-07-13 18:19:23'),
(2, 'tt3', 'tt3', 'tt3', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(3, 'Faculdade 1', 'Contato', '', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(4, 'test123', 'test123', 'test123', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(5, 'teste123', 'teste123', 'teste123', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(6, 'Upis', 'Teste', 'Xxxx', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(7, 'faculdade1', 'Teste', 'Teste para o cadastro de faculdade senha 12345', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(8, '23213', '312321', '123213213', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(9, '312321', 'Renato', '', 0, '2018-07-13 18:11:13', '2018-07-13 18:11:13'),
(10, 'Unisinos', 'Camila', NULL, 0, '2018-07-13 19:03:09', '2018-07-13 19:03:09'),
(11, 'uniritter', 'Afonso', 'Universidade da Uniritter', 1, '2018-07-13 19:47:58', '2018-07-13 21:40:55'),
(12, 'faculdade33', 'Helenir', 'Faculdade33', 1, '2018-07-13 21:33:43', '2018-07-13 21:40:52'),
(13, 'faculdade34', 'Sandro', 'Faculdade34', 1, '2018-07-13 21:36:03', '2018-07-13 21:40:49'),
(14, 'faculdade35', 'Pedro', 'faculdade35', 0, '2018-07-13 21:40:08', '2018-07-13 21:40:08');

-- --------------------------------------------------------

--
-- Estrutura da tabela `faculdades_relacoes_aluno`
--

CREATE TABLE `faculdades_relacoes_aluno` (
  `id` int(11) NOT NULL,
  `id_faculdade` int(11) NOT NULL,
  `id_aluno` int(11) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `faculdades_relacoes_aluno`
--

INSERT INTO `faculdades_relacoes_aluno` (`id`, `id_faculdade`, `id_aluno`, `deletado`, `data_cadastro`) VALUES
(1, 1, 37, 0, '2018-04-09 21:36:27'),
(2, 3, 15, 0, '2018-04-09 21:38:59'),
(3, 3, 19, 0, '2018-04-09 21:43:19'),
(4, 3, 32, 0, '2018-04-09 21:43:31'),
(5, 3, 33, 0, '2018-04-09 21:44:11'),
(6, 3, 35, 0, '2018-04-09 21:44:19'),
(7, 3, 39, 0, '2018-04-09 22:57:15'),
(8, 3, 43, 0, '2018-04-09 22:58:23'),
(9, 4, 22, 0, '2018-04-09 23:00:02'),
(10, 4, 27, 0, '2018-06-15 23:35:26'),
(11, 5, 1, 0, '2018-07-04 17:00:46'),
(12, 6, 34, 0, '2018-07-09 21:02:15'),
(13, 6, 40, 0, '2018-07-09 21:29:35'),
(14, 8, 10, 0, '2018-07-10 21:16:49'),
(15, 9, 13, 1, '2018-07-10 21:16:51'),
(16, 31, 0, 1, '2018-07-10 21:16:53'),
(17, 31, 0, 1, '2018-07-10 21:16:54'),
(18, 31, 0, 1, '2018-07-12 21:45:46'),
(19, 31, 0, 1, '2018-07-13 18:56:39'),
(20, 10, 44, 0, '2018-07-16 21:55:11'),
(21, 10, 55, 0, '2018-07-17 12:22:38'),
(22, 9, 56, 0, '2018-07-17 12:33:13'),
(23, 3, 10, 0, '2018-07-25 21:10:35'),
(24, 3, 57, 1, '2018-07-26 17:29:24'),
(25, 3, 57, 1, '2018-07-27 12:12:06'),
(26, 3, 57, 0, '2018-07-27 12:12:23');

-- --------------------------------------------------------

--
-- Estrutura da tabela `faculdades_relacoes_bkp`
--

CREATE TABLE `faculdades_relacoes_bkp` (
  `id` int(11) NOT NULL,
  `id_faculdade` int(11) NOT NULL,
  `nome` varchar(250) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `faculdades_relacoes_bkp`
--

INSERT INTO `faculdades_relacoes_bkp` (`id`, `id_faculdade`, `nome`, `deletado`, `data_cadastro`) VALUES
(1, 12, 'test', 1, '2018-04-09 21:36:27'),
(2, 12, 'teste', 0, '2018-04-09 21:38:59'),
(3, 12, 'dw', 1, '2018-04-09 21:43:19'),
(4, 12, 'ddd', 0, '2018-04-09 21:43:31'),
(5, 12, 'f', 1, '2018-04-09 21:44:11'),
(6, 12, 'f', 0, '2018-04-09 21:44:19'),
(7, 12, 'd', 1, '2018-04-09 22:57:15'),
(8, 12, 'a', 1, '2018-04-09 22:58:23'),
(9, 12, 'asd', 1, '2018-04-09 23:00:02');

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupos`
--

CREATE TABLE `grupos` (
  `id` int(11) NOT NULL,
  `id_lider` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `grupos`
--

INSERT INTO `grupos` (`id`, `id_lider`, `nome`, `descricao`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(1, 1, 'teste', 'teste', 0, '2018-04-12 17:48:55', '2018-04-12 17:48:55'),
(2, 1, 'asd', 'asd', 1, '2018-04-12 19:14:36', '2018-06-15 07:48:45'),
(3, 19, 'Testadores', 'Pessoas que batem a testa na mesa', 0, '2018-04-12 22:34:33', '2018-04-12 22:34:33'),
(4, 1, 'Curso', 'Alunos da sala', 0, '2018-04-13 14:38:28', '2018-04-13 14:38:28'),
(5, 20, 'Curso', 'Teste', 0, '2018-04-17 04:12:00', '2018-04-17 04:12:00'),
(6, 1, 'Bleber', 'Bleber', 0, '2018-06-15 07:50:40', '2018-06-15 07:50:40'),
(7, 1, 'TesteLista', '', 1, '2018-06-15 23:56:23', '2018-07-18 13:30:53'),
(8, 1, 'Teste', 'aaaaaaaaaaaa', 0, '2018-07-09 21:41:28', '2018-07-09 21:41:28'),
(9, 31, 'asdasd', '123123', 0, '2018-07-10 21:16:03', '2018-07-10 21:16:03'),
(10, 31, '23123123123', '12312312321312', 0, '2018-07-10 21:22:28', '2018-07-10 21:22:28'),
(11, 31, 'Ola Cleber', 'Olá marilene', 0, '2018-07-10 21:24:54', '2018-07-10 21:24:54'),
(12, 31, 'asdsad', 'qweqwe', 0, '2018-07-10 21:31:12', '2018-07-10 21:31:12'),
(13, 1, 'criando', '', 0, '2018-07-11 21:39:06', '2018-07-11 21:39:06'),
(14, 1, 'Nova Lista', NULL, 0, '2018-07-12 12:00:07', '2018-07-12 12:00:07'),
(15, 1, '', NULL, 0, '2018-07-12 12:01:35', '2018-07-12 12:01:35'),
(16, 1, 'a', NULL, 0, '2018-07-12 13:02:17', '2018-07-12 13:02:17'),
(17, 40, 'cintialista', NULL, 0, '2018-07-12 18:20:16', '2018-07-12 18:20:16'),
(18, 18, 'festa', NULL, 1, '2018-07-16 12:36:27', '2018-07-16 12:37:17');

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupos_bkp`
--

CREATE TABLE `grupos_bkp` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `deletado` tinyint(4) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupos_usuarios`
--

CREATE TABLE `grupos_usuarios` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `grupos_usuarios`
--

INSERT INTO `grupos_usuarios` (`id`, `id_usuario`, `id_grupo`, `deletado`, `data_cadastro`) VALUES
(1, 1, 1, 1, '2018-04-12 17:48:55'),
(2, 1, 2, 1, '2018-04-12 19:14:36'),
(3, 13, 2, 1, '2018-04-12 19:46:11'),
(4, 13, 2, 1, '2018-04-12 19:46:31'),
(5, 13, 2, 0, '2018-04-12 19:49:25'),
(6, 19, 3, 0, '2018-04-12 22:34:33'),
(7, 15, 3, 0, '2018-04-12 22:35:32'),
(8, 1, 4, 1, '2018-04-13 14:38:28'),
(9, 1, 4, 1, '2018-04-13 14:39:54'),
(10, 20, 5, 0, '2018-04-17 04:12:00'),
(11, 1, 2, 0, '2018-06-15 07:39:19'),
(12, 1, 6, 0, '2018-06-15 07:50:40'),
(13, 29, 6, 1, '2018-06-15 08:12:44'),
(14, 29, 6, 1, '2018-06-15 08:16:57'),
(15, 1, 6, 0, '2018-06-15 23:53:38'),
(16, 15, 6, 0, '2018-06-15 23:53:52'),
(17, 30, 6, 0, '2018-06-15 23:54:12'),
(18, 1, 7, 0, '2018-06-15 23:56:23'),
(19, 1, 7, 0, '2018-06-15 23:56:32'),
(20, 11, 7, 0, '2018-06-15 23:56:40'),
(21, 30, 7, 0, '2018-06-15 23:56:54'),
(22, 1, 8, 0, '2018-07-09 21:41:28'),
(23, 31, 9, 0, '2018-07-10 21:16:03'),
(24, 31, 10, 0, '2018-07-10 21:22:28'),
(25, 31, 11, 0, '2018-07-10 21:24:54'),
(26, 1, 11, 0, '2018-07-10 21:25:42'),
(27, 1, 11, 1, '2018-07-10 21:25:52'),
(28, 1, 11, 1, '2018-07-10 21:25:54'),
(29, 1, 11, 1, '2018-07-10 21:25:55'),
(30, 1, 11, 1, '2018-07-10 21:25:55'),
(31, 31, 12, 0, '2018-07-10 21:31:12'),
(32, 1, 13, 0, '2018-07-11 21:39:06'),
(33, 1, 14, 0, '2018-07-12 12:00:07'),
(34, 1, 15, 0, '2018-07-12 12:01:35'),
(35, 1, 16, 0, '2018-07-12 13:02:17'),
(36, 1, 16, 0, '2018-07-12 13:08:53'),
(37, 1, 16, 0, '2018-07-12 13:08:57'),
(38, 1, 16, 0, '2018-07-12 13:15:07'),
(39, 33, 14, 0, '2018-07-12 13:52:11'),
(40, 40, 14, 0, '2018-07-12 13:54:50'),
(41, 26, 14, 0, '2018-07-12 13:56:27'),
(42, 33, 8, 1, '2018-07-12 13:58:16'),
(43, 40, 8, 1, '2018-07-12 14:00:29'),
(44, 40, 8, 1, '2018-07-12 14:00:50'),
(45, 13, 8, 1, '2018-07-12 14:02:07'),
(46, 23, 8, 1, '2018-07-12 14:02:25'),
(47, 20, 8, 1, '2018-07-12 14:02:35'),
(48, 33, 8, 0, '2018-07-12 14:02:52'),
(49, 40, 17, 0, '2018-07-12 18:20:16'),
(50, 33, 17, 0, '2018-07-12 18:20:29'),
(51, 18, 18, 0, '2018-07-16 12:36:27'),
(52, 1, 18, 0, '2018-07-16 12:36:41');

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupos_usuarios_bkp`
--

CREATE TABLE `grupos_usuarios_bkp` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_grupo` int(11) NOT NULL,
  `deletado` int(11) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens`
--

CREATE TABLE `postagens` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_grupo` int(11) DEFAULT '0',
  `id_contato` int(11) NOT NULL DEFAULT '0',
  `id_faculdade` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `tipo` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0 = geral, 1 = grupo, 2 =contato',
  `descricao` text,
  `imagem` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `postagens`
--

INSERT INTO `postagens` (`id`, `id_usuario`, `id_categoria`, `id_grupo`, `id_contato`, `id_faculdade`, `id_tipo`, `tipo`, `descricao`, `imagem`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(2, 10, 4, 0, 0, 8, 1, 0, ' ', '19_03_2018_15_40_33_518_dia internacional da mulher 3.jpg', 1, '2018-03-19 21:40:34', '2018-07-17 20:52:11'),
(3, 10, 2, 0, 0, 8, 1, 0, 'Testando 123 Bla Bla', '21_03_2018_16_07_22_30_wtf.jpg', 0, '2018-03-21 22:07:30', '2018-07-17 20:52:14'),
(4, 10, 4, 0, 0, 8, 1, 0, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed commodo massa, quis lacinia est. Vivamus egestas convallis tellus, et commodo odio rhoncus lacinia. Integer efficitur mattis facilisis. Maecenas nec eros tellus. Sed sit amet scelerisque ligula. Morbi suscipit ex sagittis metus porta, vel sollicitudin sem congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam a hendrerit est, at porttitor tellus. Donec vel tincidunt felis, a molestie metus. Duis at bibendum leo. Duis at ex sit amet mi molestie efficitur vel ac purus. Aliquam sit amet felis leo. Pellentesque lobortis euismod lectus, ac sodales mauris consequat a. Aliquam aliquet neque vel quam volutpat mattis.', '21_03_2018_19_30_36_456_wtf2.jpg', 0, '2018-03-22 01:30:56', '2018-07-17 20:52:16'),
(5, 11, 2, 0, 0, 0, 3, 0, 'teste', '09_04_2018_13_51_49_807_cadastro.jpg', 0, '2018-04-09 19:51:52', '2018-07-17 20:39:50'),
(6, 12, 3, 1, 0, 1, 2, 0, 'teste', '09_04_2018_15_38_37_661_Camada 1 (1).png', 0, '2018-04-09 21:38:39', '2018-07-17 20:52:40'),
(7, 12, 3, 1, 0, 1, 2, 0, 'teste', '09_04_2018_15_38_37_661_Camada 1 (1).png', 0, '2018-04-09 21:38:44', '2018-07-17 20:52:42'),
(8, 1, 2, 0, 0, 5, 1, 0, 'fewfwe', '09_04_2018_17_37_35_932_canva-photo-editor.png', 0, '2018-04-09 23:37:39', '2018-07-17 20:51:51'),
(9, 1, 4, 0, 8, 5, 1, 2, 'fewfwfwe', '12_04_2018_09_22_57_945_123.jpg', 0, '2018-04-12 15:23:00', '2018-07-17 20:51:54'),
(10, 15, 4, 0, 0, 3, 1, 0, 'Baby baby do biruleibe', '12_04_2018_19_13_32_85_images.jpeg', 1, '2018-04-12 22:14:10', '2018-07-27 12:35:50'),
(11, 18, 4, 0, 0, 0, 3, 0, 'Vaga para trabalho', '12_04_2018_19_14_53_722_enhanced-buzz-17140-1421685799-11.jpg', 1, '2018-04-12 22:15:10', '2018-07-27 12:41:25'),
(12, 1, 4, 0, 0, 5, 1, 0, 'Interesse público', '12_04_2018_19_20_40_78_IMG-20180412-WA0006.jpg', 1, '2018-04-12 22:21:07', '2018-07-27 12:35:02'),
(13, 21, 2, 0, 0, 0, 3, 2, 'Cinema', '17_04_2018_00_56_12_520_IMG-20180406-WA0012.jpg', 1, '2018-04-17 03:56:30', '2018-07-27 12:41:39'),
(14, 21, 2, 0, 0, 0, 3, 0, 'Cinema', '17_04_2018_00_57_08_625_IMG-20180406-WA0012.jpg', 1, '2018-04-17 03:57:17', '2018-07-27 12:41:46'),
(15, 1, 1, 0, 15, 5, 1, 2, 'Garçom', '17_04_2018_01_20_39_996_enhanced-buzz-17140-1421685799-11.jpg', 1, '2018-04-17 04:20:50', '2018-07-27 12:34:39'),
(16, 22, 2, 0, 0, 4, 1, 2, '', '17_04_2018_01_43_07_387_IMG-20180330-WA0019.jpg', 1, '2018-04-17 04:43:13', '2018-07-27 12:41:55'),
(17, 24, 4, 0, 0, 0, 3, 0, 'fwefwe', '17_04_2018_12_03_41_947_123.jpg', 0, '2018-04-17 18:03:43', '2018-07-17 20:50:31'),
(18, 29, 4, 0, 0, 0, 3, 0, 'teste', '15_06_2018_02_39_57_649_1 (1).jpeg', 0, '2018-06-15 05:40:11', '2018-07-17 20:50:44'),
(19, 1, 4, 0, 0, 5, 1, 0, 'teste', '15_06_2018_03_57_28_701_1 (1).jpeg', 1, '2018-06-15 06:57:33', '2018-07-17 20:52:00'),
(20, 1, 4, 0, 0, 5, 1, 0, 'Teste amor', '04_07_2018_14_06_37_193_love facebook.png', 0, '2018-07-04 17:06:42', '2018-07-17 20:52:02'),
(21, 33, 1, 8, 0, 3, 1, 1, 'belo rio', '12_07_2018_15_35_55_62_bloubergstrand.jpg', 0, '2018-07-12 18:36:03', '2018-07-17 20:54:03'),
(22, 1, 4, 8, 0, 5, 1, 1, 'Somente para você felipe', '18_07_2018_10_42_13_570_fofinho.jpg', 0, '2018-07-18 13:42:21', '2018-07-18 13:42:21'),
(23, 33, 2, 0, 0, 3, 1, 0, 'Para a Universidade Apis Visualizar', '18_07_2018_18_25_37_400_caesgatos.jpg', 0, '2018-07-18 21:25:51', '2018-07-18 21:25:51'),
(24, 33, 2, 0, 0, 3, 1, 0, 'Para a Universidade Apis Visualizar 2', '18_07_2018_18_25_37_400_caesgatos.jpg', 0, '2018-07-18 21:25:51', '2018-07-25 18:37:19'),
(25, 33, 1, 0, 0, 3, 1, 0, 'Para a Universidade Apis Visualizar 2', '18_07_2018_18_25_37_400_caesgatos.jpg', 0, '2018-07-16 16:49:28', '2018-07-25 18:37:21'),
(26, 40, 2, 0, 0, 6, 1, 0, 'Outro teste da apis em projetos', '20_07_2018_16_10_21_39_download.jpg', 0, '2018-07-20 19:10:29', '2018-07-20 19:10:29'),
(27, 33, 2, 0, 0, 3, 1, 0, 'Teste de um aluno de verdade para apis poder ver', '20_07_2018_16_11_10_675_download (1).jpg', 0, '2018-07-20 19:11:27', '2018-07-20 19:11:27'),
(28, 30, 3, 0, 0, 6, 2, 0, 'Teste da faculdade para a cintia', '20_07_2018_16_10_21_39_download.jpg', 0, '2018-07-20 19:10:29', '2018-07-27 19:16:25'),
(29, 20, 3, 0, 0, 3, 2, 0, 'Teste que a cintia não pode ver', '20_07_2018_16_10_21_39_download.jpg', 0, '2018-07-20 19:10:29', '2018-07-27 19:16:29'),
(30, 20, 3, 0, 0, 3, 2, 0, 'POSTAGEM DA FACULDADE APIS', '25_07_2018_16_16_35_257_raca-cachorro-latido-forte.jpg', 0, '2018-07-25 19:16:46', '2018-07-25 19:16:46');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_bkp`
--

CREATE TABLE `postagens_bkp` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_grupo` int(11) DEFAULT '0',
  `contato` varchar(150) DEFAULT NULL,
  `descricao` text,
  `imagem` varchar(150) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `postagens_bkp`
--

INSERT INTO `postagens_bkp` (`id`, `id_usuario`, `id_categoria`, `id_grupo`, `contato`, `descricao`, `imagem`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(2, 10, 4, 0, 'teste', ' ', '19_03_2018_15_40_33_518_dia internacional da mulher 3.jpg', 1, '2018-03-19 21:40:34', '2018-04-03 16:16:44'),
(3, 10, 2, 0, 'teste 2', 'Testando 123 Bla Bla', '21_03_2018_16_07_22_30_wtf.jpg', 0, '2018-03-21 22:07:30', '2018-04-03 16:28:45'),
(4, 10, 4, 0, 'Testando 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed commodo massa, quis lacinia est. Vivamus egestas convallis tellus, et commodo odio rhoncus lacinia. Integer efficitur mattis facilisis. Maecenas nec eros tellus. Sed sit amet scelerisque ligula. Morbi suscipit ex sagittis metus porta, vel sollicitudin sem congue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam a hendrerit est, at porttitor tellus. Donec vel tincidunt felis, a molestie metus. Duis at bibendum leo. Duis at ex sit amet mi molestie efficitur vel ac purus. Aliquam sit amet felis leo. Pellentesque lobortis euismod lectus, ac sodales mauris consequat a. Aliquam aliquet neque vel quam volutpat mattis.', '21_03_2018_19_30_36_456_wtf2.jpg', 0, '2018-03-22 01:30:56', '2018-04-03 16:16:49'),
(5, 11, 2, 0, 'teste', 'teste', '09_04_2018_13_51_49_807_cadastro.jpg', 1, '2018-04-09 19:51:52', '2018-04-10 16:56:32'),
(6, 12, 3, 1, 'teste', 'teste', '09_04_2018_15_38_37_661_Camada 1 (1).png', 0, '2018-04-09 21:38:39', '2018-04-09 21:38:39'),
(7, 12, 3, 1, 'teste', 'teste', '09_04_2018_15_38_37_661_Camada 1 (1).png', 0, '2018-04-09 21:38:44', '2018-04-09 21:38:44'),
(8, 1, 2, 0, 'teste', 'fewfwe', '09_04_2018_17_37_35_932_canva-photo-editor.png', 0, '2018-04-09 23:37:39', '2018-04-09 23:37:39');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_categorias`
--

CREATE TABLE `postagens_categorias` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `postagens_categorias`
--

INSERT INTO `postagens_categorias` (`id`, `nome`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Estágios', 'Lorum', 0, '2018-03-19 16:20:02'),
(2, 'Projetos', 'Lorum', 0, '2018-03-19 16:20:02'),
(3, 'Faculdade', 'Lorum', 0, '2018-03-19 16:20:27'),
(4, 'Divulgação', 'Lorum', 0, '2018-03-19 16:20:27');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_categorias_bkp`
--

CREATE TABLE `postagens_categorias_bkp` (
  `id` int(11) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `descricao` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `postagens_categorias_bkp`
--

INSERT INTO `postagens_categorias_bkp` (`id`, `nome`, `descricao`, `deletado`, `data_cadastro`) VALUES
(1, 'Estágios', 'Lorum', 0, '2018-03-19 16:20:02'),
(2, 'Projetos', 'Lorum', 0, '2018-03-19 16:20:02'),
(3, 'Faculdades', 'Lorum', 0, '2018-03-19 16:20:27'),
(4, 'Divulgação', 'Lorum', 0, '2018-03-19 16:20:27');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_categorias_view`
--

CREATE TABLE `postagens_categorias_view` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `qtd_acesso` int(11) NOT NULL,
  `data_acesso` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `data_cadastro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `postagens_categorias_view`
--

INSERT INTO `postagens_categorias_view` (`id`, `id_usuario`, `id_categoria`, `qtd_acesso`, `data_acesso`, `data_cadastro`) VALUES
(16, 1, 4, 18, '2018-07-18 11:19:35', '2018-06-15 03:59:25'),
(15, 1, 3, 0, '2018-06-15 03:55:33', '2018-06-15 03:59:25'),
(14, 1, 2, 12, '2018-07-18 11:19:24', '2018-06-15 03:59:25'),
(13, 1, 1, 9, '2018-07-18 11:19:26', '2018-06-15 03:59:25'),
(17, 30, 1, 0, '2018-06-15 23:19:53', '2018-06-15 23:19:53'),
(18, 30, 2, 0, '2018-06-15 23:19:53', '2018-06-15 23:19:53'),
(19, 30, 3, 0, '2018-06-15 23:19:53', '2018-06-15 23:19:53'),
(20, 30, 4, 0, '2018-06-15 23:19:53', '2018-06-15 23:19:53'),
(21, 31, 1, 2, '2018-07-10 18:29:05', '2018-07-04 17:00:48'),
(22, 31, 2, 2, '2018-07-10 18:29:07', '2018-07-04 17:00:48'),
(23, 31, 3, 0, '2018-07-04 17:00:48', '2018-07-04 17:00:48'),
(24, 31, 4, 4, '2018-07-10 18:29:16', '2018-07-04 17:00:48'),
(25, 32, 1, 0, '2018-07-05 15:44:29', '2018-07-05 15:44:29'),
(26, 32, 2, 0, '2018-07-05 15:44:29', '2018-07-05 15:44:29'),
(27, 32, 3, 0, '2018-07-05 15:44:29', '2018-07-05 15:44:29'),
(28, 32, 4, 0, '2018-07-05 15:44:29', '2018-07-05 15:44:29'),
(29, 34, 1, 0, '2018-07-05 15:48:37', '2018-07-05 15:48:37'),
(30, 34, 2, 0, '2018-07-05 15:48:37', '2018-07-05 15:48:37'),
(31, 34, 3, 0, '2018-07-05 15:48:37', '2018-07-05 15:48:37'),
(32, 34, 4, 0, '2018-07-05 15:48:37', '2018-07-05 15:48:37'),
(33, 35, 1, 0, '2018-07-05 16:32:55', '2018-07-05 16:32:55'),
(34, 35, 2, 0, '2018-07-05 16:32:55', '2018-07-05 16:32:55'),
(35, 35, 3, 0, '2018-07-05 16:32:55', '2018-07-05 16:32:55'),
(36, 35, 4, 0, '2018-07-05 16:32:55', '2018-07-05 16:32:55'),
(37, 18, 1, 0, '2018-07-11 18:49:22', '2018-07-11 18:49:22'),
(38, 18, 2, 0, '2018-07-11 18:49:22', '2018-07-11 18:49:22'),
(39, 18, 3, 0, '2018-07-11 18:49:22', '2018-07-11 18:49:22'),
(40, 18, 4, 0, '2018-07-11 18:49:22', '2018-07-11 18:49:22'),
(41, 40, 1, 3, '2018-07-27 17:53:52', '2018-07-12 15:20:02'),
(42, 40, 2, 5, '2018-07-18 11:00:44', '2018-07-12 15:20:02'),
(43, 40, 3, 3, '2018-07-27 17:57:53', '2018-07-12 15:20:02'),
(44, 40, 4, 6, '2018-07-27 17:53:50', '2018-07-12 15:20:02'),
(45, 33, 1, 1, '2018-07-27 11:30:30', '2018-07-12 15:20:49'),
(46, 33, 2, 2, '2018-07-27 11:30:46', '2018-07-12 15:20:49'),
(47, 33, 3, 0, '2018-07-12 15:20:49', '2018-07-12 15:20:49'),
(48, 33, 4, 2, '2018-07-27 11:30:26', '2018-07-12 15:20:49'),
(49, 43, 1, 0, '2018-07-16 13:36:57', '2018-07-16 13:36:57'),
(50, 43, 2, 0, '2018-07-16 13:36:57', '2018-07-16 13:36:57'),
(51, 43, 3, 0, '2018-07-16 13:36:57', '2018-07-16 13:36:57'),
(52, 43, 4, 0, '2018-07-16 13:36:57', '2018-07-16 13:36:57'),
(53, 20, 1, 2, '2018-07-20 16:09:27', '2018-07-16 13:49:26'),
(54, 20, 2, 4, '2018-07-20 16:09:29', '2018-07-16 13:49:26'),
(55, 20, 3, 0, '2018-07-16 13:49:26', '2018-07-16 13:49:26'),
(56, 20, 4, 4, '2018-07-20 16:14:35', '2018-07-16 13:49:26'),
(57, 56, 1, 0, '2018-07-17 09:33:50', '2018-07-17 09:33:50'),
(58, 56, 2, 0, '2018-07-17 09:33:50', '2018-07-17 09:33:50'),
(59, 56, 3, 0, '2018-07-17 09:33:50', '2018-07-17 09:33:50'),
(60, 56, 4, 0, '2018-07-17 09:33:50', '2018-07-17 09:33:50'),
(61, 46, 1, 0, '2018-07-17 11:50:18', '2018-07-17 11:50:18'),
(62, 46, 2, 0, '2018-07-17 11:50:18', '2018-07-17 11:50:18'),
(63, 46, 3, 0, '2018-07-17 11:50:18', '2018-07-17 11:50:18'),
(64, 46, 4, 0, '2018-07-17 11:50:18', '2018-07-17 11:50:18'),
(65, 57, 1, 0, '2018-07-26 14:29:27', '2018-07-26 14:29:27'),
(66, 57, 2, 1, '2018-07-26 15:34:42', '2018-07-26 14:29:27'),
(67, 57, 3, 0, '2018-07-26 14:29:27', '2018-07-26 14:29:27'),
(68, 57, 4, 0, '2018-07-26 14:29:27', '2018-07-26 14:29:27');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_comentarios`
--

CREATE TABLE `postagens_comentarios` (
  `id` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `postagens_comentarios`
--

INSERT INTO `postagens_comentarios` (`id`, `id_postagem`, `id_usuario`, `texto`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(1, 2, 1, 'teste', 0, '2018-03-21 23:09:50', '2018-03-22 01:16:04'),
(2, 4, 1, 'teste', 0, '2018-03-28 17:31:39', '2018-03-28 17:31:39'),
(3, 4, 1, 'testando 2', 0, '2018-04-09 23:42:09', '2018-04-09 23:42:09'),
(4, 4, 1, 'aaa', 0, '2018-04-09 23:44:36', '2018-04-09 23:44:36'),
(5, 4, 1, 'teste 123', 0, '2018-04-10 16:29:20', '2018-04-10 16:29:20'),
(6, 10, 15, 'Teste', 0, '2018-04-12 22:19:24', '2018-04-12 22:19:24'),
(7, 11, 15, 'Eu queto', 1, '2018-04-12 22:20:01', '2018-04-12 22:20:06'),
(8, 11, 19, 'Oi', 0, '2018-04-12 22:31:53', '2018-04-12 22:31:53'),
(9, 0, 20, 'Gostei', 0, '2018-04-17 03:59:35', '2018-04-17 03:59:35'),
(10, 0, 20, 'Gostei', 0, '2018-04-17 04:00:18', '2018-04-17 04:00:18'),
(11, 0, 1, 'Gostei', 0, '2018-04-17 04:23:21', '2018-04-17 04:23:21'),
(12, 0, 1, 'oi', 0, '2018-04-17 18:55:09', '2018-04-17 18:55:09'),
(13, 0, 1, 'oi', 0, '2018-04-17 18:55:17', '2018-04-17 18:55:17'),
(14, 0, 1, 'oi', 0, '2018-04-17 18:55:40', '2018-04-17 18:55:40'),
(15, 0, 1, 'oi', 0, '2018-04-17 18:57:02', '2018-04-17 18:57:02'),
(16, 17, 1, 'oi', 0, '2018-04-17 19:01:32', '2018-04-17 19:01:32'),
(17, 17, 1, 'Bleber', 0, '2018-05-14 18:05:40', '2018-05-14 18:05:40');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_comentarios_bkp`
--

CREATE TABLE `postagens_comentarios_bkp` (
  `id` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `texto` text NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `postagens_comentarios_bkp`
--

INSERT INTO `postagens_comentarios_bkp` (`id`, `id_postagem`, `id_usuario`, `texto`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(1, 2, 1, 'teste', 0, '2018-03-21 23:09:50', '2018-03-22 01:16:04'),
(2, 4, 1, 'teste', 0, '2018-03-28 17:31:39', '2018-03-28 17:31:39'),
(3, 4, 1, 'testando 2', 0, '2018-04-09 23:42:09', '2018-04-09 23:42:09'),
(4, 4, 1, 'aaa', 0, '2018-04-09 23:44:36', '2018-04-09 23:44:36'),
(5, 4, 1, 'teste 123', 0, '2018-04-10 16:29:20', '2018-04-10 16:29:20'),
(6, 4, 1, 'Gostei', 0, '2018-04-10 18:21:31', '2018-04-10 18:21:31'),
(7, 8, 1, 'Gostei', 0, '2018-04-10 18:21:51', '2018-04-10 18:21:51'),
(8, 4, 1, 'Gostei teste', 0, '2018-04-10 18:35:37', '2018-04-10 18:35:37');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_gostei`
--

CREATE TABLE `postagens_gostei` (
  `id` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `postagens_gostei`
--

INSERT INTO `postagens_gostei` (`id`, `id_postagem`, `id_usuario`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(10, 7, 1, 0, '2018-04-11 17:19:31', '2018-04-11 17:19:31'),
(9, 2, 1, 0, '2018-03-21 17:17:03', '2018-03-21 23:26:33'),
(8, 4, 1, 0, '2018-03-22 01:35:31', '2018-04-11 21:01:46'),
(11, 10, 15, 0, '2018-04-12 22:15:18', '2018-04-12 22:15:18'),
(12, 11, 15, 0, '2018-04-12 22:19:40', '2018-04-12 22:19:40'),
(13, 12, 19, 0, '2018-04-12 22:31:42', '2018-04-12 22:31:42'),
(14, 12, 20, 0, '2018-04-17 03:58:55', '2018-04-17 03:58:55'),
(15, 11, 20, 0, '2018-04-17 03:59:01', '2018-04-17 03:59:01'),
(16, 17, 1, 0, '2018-04-17 18:57:38', '2018-04-17 18:57:38'),
(17, 8, 1, 0, '2018-06-15 21:06:16', '2018-06-15 21:06:16'),
(18, 20, 31, 0, '2018-07-10 21:22:36', '2018-07-10 21:29:35'),
(19, 18, 31, 0, '2018-07-10 21:29:41', '2018-07-10 21:29:41'),
(20, 16, 31, 0, '2018-07-10 21:29:44', '2018-07-10 21:29:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `postagens_gostei_bkp`
--

CREATE TABLE `postagens_gostei_bkp` (
  `id` int(11) NOT NULL,
  `id_postagem` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `postagens_gostei_bkp`
--

INSERT INTO `postagens_gostei_bkp` (`id`, `id_postagem`, `id_usuario`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(1, 2, 1, 0, '2018-03-21 17:17:03', '2018-03-21 23:26:33'),
(8, 4, 1, 0, '2018-03-22 01:35:31', '2018-04-11 16:46:56'),
(9, 8, 1, 1, '2018-04-10 19:16:12', '2018-04-10 19:16:18');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL DEFAULT '0',
  `id_faculdade` int(11) NOT NULL,
  `hash_login` varchar(150) DEFAULT NULL,
  `hash_social` varchar(250) DEFAULT NULL,
  `tipo_social` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = Null, 1 = Facebook, 2 = Google',
  `senha` varchar(150) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `nome_murer` varchar(150) NOT NULL,
  `nome_contato` varchar(200) DEFAULT NULL,
  `celular` varchar(25) DEFAULT 'Não Definido',
  `descricao` text,
  `nascimento` date DEFAULT NULL,
  `genero` varchar(150) NOT NULL DEFAULT 'Não Declarado',
  `pais` varchar(150) NOT NULL DEFAULT 'Não Definido',
  `uf` varchar(25) NOT NULL DEFAULT 'Não Definido',
  `cidade` varchar(150) NOT NULL DEFAULT 'Não Definido',
  `curso` varchar(250) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = aluno, 2 = ex-aluno, 3 = professor, 4= divulgador',
  `email` varchar(150) NOT NULL,
  `imagem` varchar(250) NOT NULL DEFAULT 'perfil-1.png',
  `tipo` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1= murer, 2= faculdade, 3= divulgador, 4= estagio',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `id_curso`, `id_faculdade`, `hash_login`, `hash_social`, `tipo_social`, `senha`, `nome`, `nome_murer`, `nome_contato`, `celular`, `descricao`, `nascimento`, `genero`, `pais`, `uf`, `cidade`, `curso`, `status`, `email`, `imagem`, `tipo`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(1, 0, 5, 'f9aa06cd2fe9fd78f98c0cb54bc6f9ea', NULL, 0, '745536f0652656dae49565e5fa26152b', 'Admin', 'Muron', NULL, 'Não Definido', NULL, '0000-00-00', 'Não Definido', 'teste', 'Não Definido', 'Não Definido', 't2t2', 0, 'contato@muron.com.br', '14_06_2018_20_57_34_936_perfil-1.png', 1, 0, '2018-03-12 15:11:23', '2018-07-27 14:31:10'),
(8, 0, 2, NULL, NULL, 0, '5914b69e5c80c212d47a8ff4d267cdce', '123', '123', NULL, 'Não Definido', 'Não Definido', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '123@123.com', 'perfil-1.png', 1, 1, '2018-03-28 21:02:47', '2018-07-13 18:39:29'),
(9, 0, 3, 'a7583a99c754544ba4ff19dc1fe31ec6', NULL, 0, 'b692df4163e3a2d35fd731c727f2f0ac', '1', '1', NULL, 'Não Definido', 'Não Definido', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '1@1.com', 'perfil-1.png', 1, 1, '2018-03-28 21:23:06', '2018-07-13 18:40:16'),
(10, 0, 3, 'cfde4c0847631abf1573ffd190d1b974', NULL, 0, 'bd5d0601e308dc66ffab27269ab1617e', 'Leonardo Peixe', 'Leo Peixe', NULL, 'Não Definido', 'Não Definido', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'leonardopeixe42@gmail.com', 'perfil-1.png', 1, 0, '2018-03-28 21:27:01', '2018-07-25 22:04:53'),
(11, 0, 0, '9a5a3050ebadaddf31a681a150dcc483', NULL, 0, 'cf83681c0da0e3c86e8f540bb9f0a67d', 'testeparceiro', 'testeparceiro', NULL, '123123', 'testeparceiro', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'testeparceiro@teste.com', 'perfil-1.png', 3, 0, '2018-04-09 19:30:53', '2018-06-14 23:40:32'),
(12, 0, 1, 'fc27783fa4436ad975a227d64060ac1b', NULL, 0, '388c99f6f492681e6f2bc0db08b68836', 'Bla', 'bla', NULL, '123321', 'bla', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'bla@bla.com.br', 'perfil-1.png', 2, 0, '2018-04-09 20:30:07', '2018-07-13 18:29:43'),
(13, 0, 9, '4e3c762822f21c8da50d3e97cd24ffdc', NULL, 0, 'd96856e705c9e6e05c8e1f7882450fdb', 'leon', 'leon', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'leon', 2, 'leon@leon.com', 'perfil-1.png', 1, 0, '2018-04-11 20:27:33', '2018-07-13 18:37:46'),
(14, 0, 2, 'dac7b4944a93ad3fb0c7c65cd3c23325', NULL, 0, '7e342563a2d3acf4bfa8f7a9dc41b2ec', 'tt3', 'tt3', 'tt3', '123125412512', 'tt3', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'tt3@gg.com', 'perfil-1.png', 2, 0, '2018-04-11 20:39:53', '2018-07-13 18:29:49'),
(15, 0, 3, 'a52d6cc126749f3e2be742142684301f', NULL, 0, '745536f0652656dae49565e5fa26152b', 'Marcos', 'Teste2', NULL, 'Não Definido', NULL, NULL, 'Lindo', 'Não Definido', 'Sp', 'Não Definido', 'Administração', 1, 'markosss13@gmail.com', 'perfil-1.png', 1, 0, '2018-04-12 20:59:01', '2018-07-13 18:37:35'),
(16, 0, 0, NULL, NULL, 0, '51a45c85811a980a91b1c0171d479442', 'Joaquim', '', '', '', '', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '', 'perfil-1.png', 3, 0, '2018-04-12 21:04:22', '2018-06-14 23:40:32'),
(17, 0, 0, NULL, NULL, 0, '8bbac6c43b91980fa049d2f61e15aeb4', 'Joaquim', 'Jonas', 'Eu', '123455553', 'Corta cabelo ganha su-co!', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'rs@scaabcars.cf', 'perfil-1.png', 3, 0, '2018-04-12 21:05:59', '2018-06-14 23:40:32'),
(18, 0, 0, '9ceb2f14c28b874272e2dbad8b3921c2', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'Divulgador2', 'Divulgador', 'Eu', '9oo99o9999', 'Nnnnnn', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '123@123.com', 'perfil-1.png', 3, 0, '2018-04-12 22:13:41', '2018-07-26 19:25:45'),
(19, 0, 3, 'b9242dbb04b0167725e58d757d6b20e5', NULL, 0, '745536f0652656dae49565e5fa26152b', 'Renato', 'Teste', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Administração', 1, 'markosss13@gmail.com', 'perfil-1.png', 1, 0, '2018-04-12 22:27:50', '2018-07-13 18:37:33'),
(20, 0, 3, '61fccf6f78e4cfea42ef16cf09e0632a', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'Faculdade 1', 'apis', 'Contato', 'Xxxxxxx', '', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '123@123.com', 'perfil-1.png', 2, 0, '2018-04-17 01:35:39', '2018-07-27 20:18:08'),
(21, 0, 0, '2ecc35062d00ed0a64125db661dce0af', NULL, 0, '5914b69e5c80c212d47a8ff4d267cdce', 'Divulgador 3', 'Divulgador 3', 'Divulgador', 'Xxxxxxx', 'Xxxxc', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '123@123.com', 'perfil-1.png', 3, 0, '2018-04-17 03:51:21', '2018-06-14 23:40:32'),
(22, 0, 4, '59fc1c7c9e2699dce1b22389d2b32c12', NULL, 0, '5914b69e5c80c212d47a8ff4d267cdce', 'Teste3', 'Teste3', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Teste', 0, '123@123.com', 'perfil-1.png', 1, 0, '2018-04-17 04:35:49', '2018-07-13 18:38:09'),
(23, 0, 4, 'fb114ed6aa218d5013d6b1f892eec1d8', NULL, 0, 'ccf25b46b499772699b4c16e033af2e5', 'test123', 'test123', 'test123', '12312312312', 'test123', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'teste123@123.com', 'perfil-1.png', 2, 0, '2018-04-17 17:56:08', '2018-07-13 18:30:05'),
(24, 0, 0, 'e4f89b3a7abfc21467fc5755a8689714', NULL, 0, '1171e77cc69524fe49353db37ae123a7', 'ttt', 'ttt', 'ttt', '12312312', 'ttt', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'ttt@ttt.com', 'perfil-1.png', 3, 0, '2018-04-17 18:02:15', '2018-06-15 02:00:09'),
(25, 0, 5, 'beb3d7bfe8e9325a2f2e13f6aa7aa626', NULL, 0, '8543e786afcdd5cf3073a1527e6f2447', 'teste123', 'teste123', 'teste123', '19859474989', 'teste123', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'teste123@123.com', 'perfil-1.png', 2, 0, '2018-05-14 18:30:33', '2018-07-13 18:31:37'),
(26, 0, 0, 'e5afe741734828f59d9592b2407a1673', NULL, 0, '2628fc54009756a43a24f027994b7ce5', 'div123', 'div123', 'div123', '4324234234', 'div123', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'div123@div.com', 'perfil-1.png', 3, 0, '2018-05-14 18:34:52', '2018-06-14 23:40:32'),
(27, 0, 4, '1e4fe7f3ef8059b82829cb86b1803b9e', NULL, 0, 'ede85bd7eafd47412894f1685e3f692c', 'tete', 'tete', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'tete', 1, 'tete@tete.com', '14_06_2018_23_00_50_162_leo.jpg', 1, 0, '2018-06-15 02:00:31', '2018-07-13 18:38:08'),
(28, 0, 0, NULL, NULL, 0, 'c551acb3e7a3c3657a820e659262caa9', 'tt34', 'tt34', 'vfrpgferk ', '12312312312', 'fpoerjpfer fperojfe er', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'tt3@tt.com', 'perfil-1.png', 3, 0, '2018-06-15 03:52:36', '2018-06-15 03:52:36'),
(29, 0, 0, '3a4dcfef077b8e10b86eb6ad3409b2ce', NULL, 0, '11203b4b59703be2307bf8e97c7c9b07', 'fff', 'fff', 'fff', '54354353453', 'fff', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'fff@fff.com', 'perfil-1.png', 3, 0, '2018-06-15 03:55:42', '2018-06-15 05:40:32'),
(30, 0, 6, '8904c7d8efe4b036f764d81e8573700b', NULL, 0, '5914b69e5c80c212d47a8ff4d267cdce', 'Upis', 'Teste15/4', 'Teste', '', 'Xxxx', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '', 'perfil-1.png', 2, 0, '2018-06-15 23:19:39', '2018-07-13 18:31:46'),
(31, 0, 7, '797e3d1b56772652f3acdd77dc8dfe4c', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'faculdade1', 'faculdade1', 'Teste', '519999999', 'Teste para o cadastro de faculdade senha 12345', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'teste@faculdade', '10_07_2018_18_30_25_225_cpers preto.png', 2, 0, '2018-07-04 17:00:46', '2018-07-16 19:00:39'),
(32, 0, 3, '0cdf5f4aa6cbf96dc5992bbdf668c4f9', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'junior', 'junior', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Administração', 1, 'junior@junior', 'perfil-1.png', 1, 0, '2018-07-05 18:44:25', '2018-07-13 18:38:27'),
(33, 0, 3, 'c57852445172db9837189fca2f96a2c4', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'felipe', 'felipe', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Ciência', 1, 'felipe@felipe.com.br', 'perfil-1.png', 1, 0, '2018-07-05 18:47:39', '2018-07-27 16:48:13'),
(34, 0, 6, 'd7e73b52d356f84e910f328d26ef06a9', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'felipe', 'felipinho', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Ciência', 1, 'felipe@felipe.com.br', 'perfil-1.png', 1, 0, '2018-07-05 18:48:35', '2018-07-13 18:37:06'),
(35, 0, 3, 'f3367b0492d0b645fbc3b57645849444', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'bruno', 'bruno', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Administração', 1, 'bruno@bruno.com', 'perfil-1.png', 1, 0, '2018-07-05 19:32:53', '2018-07-13 18:38:23'),
(36, 0, 8, NULL, NULL, 0, '51a45c85811a980a91b1c0171d479442', '23213', '123123', '312321', '3123', '123213213', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, '312321', 'perfil-1.png', 2, 0, '2018-07-09 21:02:15', '2018-07-13 18:31:59'),
(37, 0, 1, NULL, NULL, 0, '154088cdc2f49a19c7baf265242c446e', 'teste', '99999', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', '', 1, 'teste@teste.com.br', 'perfil-1.png', 1, 0, '2018-07-09 21:27:41', '2018-07-13 18:38:32'),
(38, 0, 9, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', '312321', 'faculdade24', 'Renato', '', '', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'markosss13@hotmail.com', 'perfil-1.png', 2, 0, '2018-07-09 21:29:35', '2018-07-13 18:32:05'),
(39, 0, 3, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'Renato', '21', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', '', 0, 'renatinho@faculdade.com', 'perfil-1.png', 1, 0, '2018-07-09 21:33:52', '2018-07-13 18:40:18'),
(40, 0, 6, 'ae71206c061c4b9d81de1bf334ea4b37', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'Cintia', 'cintia', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Jornalismo', 1, 'cintia@gmail.com', 'perfil-1.png', 1, 0, '2018-07-11 21:48:48', '2018-07-27 20:57:51'),
(41, 0, 14, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'faculdade35', 'faculdade35', 'Pedro', '51999999999999', 'faculdade35', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'faculdade35@gmail.com', 'perfil-1.png', 2, 0, '2018-07-13 21:40:08', '2018-07-13 21:40:08'),
(42, 0, 0, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'Divulgador9', 'divulgador9', 'divulgador9', '519999999999', 'divulgador9', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', NULL, 0, 'divulgador9@gmail.com', 'perfil-1.png', 3, 0, '2018-07-13 21:46:56', '2018-07-13 21:46:56'),
(43, 0, 3, 'b4a91e7b137ae757612f32f24eff4bf1', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'mauricio', 'mauricio', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Direito', 1, 'mauricio@gmail.com', 'perfil-1.png', 1, 0, '2018-07-16 16:31:52', '2018-07-16 16:36:57'),
(44, 0, 10, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'janaina', 'janaina', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Contabilidade', 1, 'janaina@janaina.com.br', 'perfil-1.png', 1, 0, '2018-07-16 21:45:36', '2018-07-16 21:45:36'),
(45, 0, 14, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'robervaldo', 'robervaldo', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Educacao Fisica', 1, 'robervaldo@gmail.com', 'perfil-1.png', 1, 0, '2018-07-16 21:56:04', '2018-07-16 21:56:04'),
(46, 0, 1, '48f68b7242c56d2cb7281855fd23779c', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticia', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 0, '2018-07-16 21:57:57', '2018-07-17 14:50:18'),
(47, 0, 1, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticiaa', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 1, '2018-07-16 21:58:46', '2018-07-17 12:24:11'),
(48, 0, 1, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticiab', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 1, '2018-07-16 21:59:35', '2018-07-17 12:24:13'),
(49, 0, 1, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticiac', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 1, '2018-07-16 22:00:19', '2018-07-17 12:24:15'),
(50, 0, 1, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticiad', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 1, '2018-07-16 22:00:44', '2018-07-17 12:24:16'),
(51, 0, 1, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticiae', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 1, '2018-07-16 22:01:22', '2018-07-17 12:24:19'),
(52, 0, 1, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticiaf', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 1, '2018-07-16 22:01:33', '2018-07-17 12:24:20'),
(53, 0, 1, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'leticia', 'leticiag', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Nutricao', 1, 'leticia@gmail.com', 'perfil-1.png', 1, 1, '2018-07-16 22:02:30', '2018-07-17 12:24:22'),
(54, 0, 10, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'julia', 'julia', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Pesquisa', 1, 'julia@julia.com.br', 'perfil-1.png', 1, 1, '2018-07-17 11:47:33', '2018-07-17 12:23:55'),
(55, 0, 10, NULL, NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'julia', 'julia2', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Pesquisa', 1, 'julia@julia.com.br', 'perfil-1.png', 1, 0, '2018-07-17 12:22:38', '2018-07-17 12:22:38'),
(56, 0, 9, '4d06a7b4bcab9168a12ede7960b909bb', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'julia', 'julia28', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Letras', 1, 'julia@julia.com.br', 'perfil-1.png', 1, 0, '2018-07-17 12:33:13', '2018-07-17 12:33:50'),
(57, 0, 3, '608f66d3886cb541f4081ea5a6fd92b1', NULL, 0, '0ef219d1f0829be9f21ee5ce6633dac8', 'Cassia', 'cassia', NULL, 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'Odontologia', 1, 'cassia@gmail.com', 'perfil-1.png', 1, 0, '2018-07-26 17:29:24', '2018-07-26 18:34:34');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_bkp`
--

CREATE TABLE `usuarios_bkp` (
  `id` int(11) NOT NULL,
  `id_faculdade` int(11) DEFAULT '0',
  `id_curso` int(11) NOT NULL DEFAULT '0',
  `hash_login` varchar(150) DEFAULT NULL,
  `hash_social` varchar(250) DEFAULT NULL,
  `tipo_social` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = Null, 1 = Facebook, 2 = Google',
  `senha` varchar(150) NOT NULL,
  `nome` varchar(150) NOT NULL,
  `nome_murer` varchar(150) NOT NULL,
  `celular` varchar(25) DEFAULT 'Não Definido',
  `descricao` text,
  `nascimento` date DEFAULT NULL,
  `genero` varchar(150) NOT NULL DEFAULT 'Não Declarado',
  `pais` varchar(150) NOT NULL DEFAULT 'Não Definido',
  `uf` varchar(25) NOT NULL DEFAULT 'Não Definido',
  `cidade` varchar(150) NOT NULL DEFAULT 'Não Definido',
  `email` varchar(150) NOT NULL,
  `tipo` tinyint(1) NOT NULL DEFAULT '1' COMMENT '1= murer, 2= faculdade, 3= divulgador, 4= estagio',
  `deletado` tinyint(1) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data_atualizado` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios_bkp`
--

INSERT INTO `usuarios_bkp` (`id`, `id_faculdade`, `id_curso`, `hash_login`, `hash_social`, `tipo_social`, `senha`, `nome`, `nome_murer`, `celular`, `descricao`, `nascimento`, `genero`, `pais`, `uf`, `cidade`, `email`, `tipo`, `deletado`, `data_cadastro`, `data_atualizado`) VALUES
(1, 0, 0, 'd1769758b623b9a9a36d40b9cd8190dc', NULL, 0, '745536f0652656dae49565e5fa26152b', 'Admin', 'Muron', 'Não Definido', NULL, '2018-03-06', 'Não Definido', 'Não Definido', 'Não Definido', 'Não Definido', 'contato@muron.com.br', 1, 0, '2018-03-12 15:11:23', '2018-04-12 20:53:12'),
(8, 0, 0, NULL, NULL, 0, '5914b69e5c80c212d47a8ff4d267cdce', '123', '123', 'Não Definido', 'Não Definido', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', '123@123.com', 1, 1, '2018-03-28 21:02:47', '2018-04-03 16:24:29'),
(9, 0, 0, 'a7583a99c754544ba4ff19dc1fe31ec6', NULL, 0, 'b692df4163e3a2d35fd731c727f2f0ac', '1', '1', 'Não Definido', 'Não Definido', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', '1@1.com', 1, 1, '2018-03-28 21:23:06', '2018-04-03 16:28:11'),
(10, 0, 0, 'cfde4c0847631abf1573ffd190d1b974', NULL, 0, 'bd5d0601e308dc66ffab27269ab1617e', 'Leonardo Peixe', 'Leo Peixe', 'Não Definido', 'Não Definido', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'leonardopeixe42@gmail.com', 1, 0, '2018-03-28 21:27:01', '2018-03-28 22:13:15'),
(11, 0, 0, '9a5a3050ebadaddf31a681a150dcc483', NULL, 0, 'cf83681c0da0e3c86e8f540bb9f0a67d', 'testeparceiro', 'testeparceiro', '123123', 'testeparceiro', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'testeparceiro@teste.com', 3, 0, '2018-04-09 19:30:53', '2018-04-09 20:24:31'),
(12, 0, 0, '78589cc39eff474a14888ca7218c5aa9', NULL, 0, '388c99f6f492681e6f2bc0db08b68836', 'Bla', 'bla', '123321', 'bla', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'bla@bla.com.br', 2, 0, '2018-04-09 20:30:07', '2018-04-09 23:20:33'),
(13, 0, 0, '26a414865299d4d7c9622bd12e3f3eac', NULL, 0, '02f844d8cbffe8ea9986b323b2b2ff4e', 'Manoel', 'Manoel', 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'manolo@gmail.com', 1, 0, '2018-04-10 20:39:44', '2018-04-10 20:45:03'),
(14, 0, 0, 'bfd3c3c28f1bb6ca72cdc78642f535e3', NULL, 0, '745536f0652656dae49565e5fa26152b', 'Teste', 'Teste', 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'markosss13@gmail.com', 1, 0, '2018-04-10 20:54:53', '2018-04-10 21:10:55'),
(15, 0, 0, '35e347d338c44cfd1c7c47b140445d78', NULL, 0, '1ee86385733b450584024581ec0ece8f', 'leo123', 'leo123', 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'leo@leo.com', 1, 0, '2018-04-10 21:00:16', '2018-04-10 21:00:18'),
(16, 0, 0, '5ad4aae13d04d8753a0249578bf630fd', NULL, 0, '5914b69e5c80c212d47a8ff4d267cdce', 'Faculdade', 'Faculdade', '999999999', 'Xxxxx', NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', 'teste@123.com', 2, 0, '2018-04-11 16:30:17', '2018-04-11 16:31:21'),
(17, 0, 0, '5ecfd87b81c707941332eb79fe3c197e', NULL, 0, 'ff8fa6c0105877d7492b112b3f78314a', '123', '999', 'Não Definido', NULL, NULL, 'Não Declarado', 'Não Definido', 'Não Definido', 'Não Definido', '123@123.com', 1, 0, '2018-04-11 17:38:04', '2018-04-11 17:38:08');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_contatos`
--

CREATE TABLE `usuarios_contatos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_usuario2` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios_contatos`
--

INSERT INTO `usuarios_contatos` (`id`, `id_usuario`, `id_usuario2`, `deletado`, `data_cadastro`) VALUES
(1, 1, 10, 0, '2018-03-30 00:22:00'),
(2, 10, 1, 0, '2018-03-30 00:22:00'),
(3, 1, 9, 0, '2018-03-30 00:37:22'),
(4, 9, 1, 0, '2018-03-30 00:37:22'),
(5, 1, 8, 0, '2018-03-30 00:38:53'),
(6, 8, 1, 0, '2018-03-30 00:38:53'),
(7, 1, 13, 1, '2018-04-12 20:12:55'),
(8, 13, 1, 1, '2018-04-12 20:12:55'),
(9, 1, 13, 1, '2018-04-12 20:15:09'),
(10, 13, 1, 1, '2018-04-12 20:15:09'),
(11, 15, 1, 0, '2018-04-12 21:11:00'),
(12, 1, 15, 0, '2018-04-12 21:11:00'),
(13, 19, 15, 0, '2018-04-12 22:29:15'),
(14, 15, 19, 0, '2018-04-12 22:29:15'),
(15, 1, 24, 0, '2018-05-14 18:22:18'),
(16, 24, 1, 0, '2018-05-14 18:22:18'),
(17, 27, 1, 0, '2018-06-15 02:01:02'),
(18, 1, 27, 0, '2018-06-15 02:01:02'),
(19, 1, 18, 1, '2018-06-15 21:18:26'),
(20, 18, 1, 1, '2018-06-15 21:18:26'),
(21, 31, 39, 0, '2018-07-10 21:30:45'),
(22, 39, 31, 0, '2018-07-10 21:30:45'),
(23, 20, 33, 1, '2018-07-17 14:42:42'),
(24, 33, 20, 1, '2018-07-17 14:42:42'),
(25, 20, 33, 1, '2018-07-17 14:49:32'),
(26, 33, 20, 1, '2018-07-17 14:49:32'),
(27, 46, 56, 0, '2018-07-17 14:50:23'),
(28, 56, 46, 0, '2018-07-17 14:50:23'),
(29, 40, 57, 0, '2018-07-27 16:48:41'),
(30, 57, 40, 0, '2018-07-27 16:48:41');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios_contatos_bkp`
--

CREATE TABLE `usuarios_contatos_bkp` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_usuario2` int(11) NOT NULL,
  `deletado` tinyint(4) NOT NULL DEFAULT '0',
  `data_cadastro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuarios_contatos_bkp`
--

INSERT INTO `usuarios_contatos_bkp` (`id`, `id_usuario`, `id_usuario2`, `deletado`, `data_cadastro`) VALUES
(1, 1, 10, 0, '2018-03-30 00:22:00'),
(2, 10, 1, 0, '2018-03-30 00:22:00'),
(3, 1, 9, 0, '2018-03-30 00:37:22'),
(4, 9, 1, 0, '2018-03-30 00:37:22'),
(5, 1, 8, 0, '2018-03-30 00:38:53'),
(6, 8, 1, 0, '2018-03-30 00:38:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats_mensagens`
--
ALTER TABLE `chats_mensagens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_usuario_para` (`id_usuario_para`);

--
-- Indexes for table `chats_mensagens_bkp`
--
ALTER TABLE `chats_mensagens_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_usuario_para` (`id_usuario_para`);

--
-- Indexes for table `faculdades`
--
ALTER TABLE `faculdades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculdades_relacoes_aluno`
--
ALTER TABLE `faculdades_relacoes_aluno`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_faculdade` (`id_faculdade`),
  ADD KEY `id_aluno` (`id_aluno`);

--
-- Indexes for table `faculdades_relacoes_bkp`
--
ALTER TABLE `faculdades_relacoes_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_faculdade` (`id_faculdade`);

--
-- Indexes for table `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_lider` (`id_lider`);

--
-- Indexes for table `grupos_bkp`
--
ALTER TABLE `grupos_bkp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grupos_usuarios`
--
ALTER TABLE `grupos_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_grupo` (`id_grupo`);

--
-- Indexes for table `grupos_usuarios_bkp`
--
ALTER TABLE `grupos_usuarios_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_grupo` (`id_grupo`);

--
-- Indexes for table `postagens`
--
ALTER TABLE `postagens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_grupo` (`id_grupo`),
  ADD KEY `id_amigo` (`id_contato`),
  ADD KEY `id_faculdade` (`id_faculdade`),
  ADD KEY `id_tipo` (`id_tipo`);

--
-- Indexes for table `postagens_bkp`
--
ALTER TABLE `postagens_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_grupo` (`id_grupo`);

--
-- Indexes for table `postagens_categorias`
--
ALTER TABLE `postagens_categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `postagens_categorias_bkp`
--
ALTER TABLE `postagens_categorias_bkp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `postagens_categorias_view`
--
ALTER TABLE `postagens_categorias_view`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Indexes for table `postagens_comentarios`
--
ALTER TABLE `postagens_comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_postagem` (`id_postagem`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `postagens_comentarios_bkp`
--
ALTER TABLE `postagens_comentarios_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_postagem` (`id_postagem`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `postagens_gostei`
--
ALTER TABLE `postagens_gostei`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_postagem` (`id_postagem`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `postagens_gostei_bkp`
--
ALTER TABLE `postagens_gostei_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_postagem` (`id_postagem`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_curso` (`id_curso`),
  ADD KEY `id_faculdade` (`id_faculdade`);

--
-- Indexes for table `usuarios_bkp`
--
ALTER TABLE `usuarios_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_faculdade` (`id_faculdade`),
  ADD KEY `id_curso` (`id_curso`);

--
-- Indexes for table `usuarios_contatos`
--
ALTER TABLE `usuarios_contatos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_usuario2` (`id_usuario2`);

--
-- Indexes for table `usuarios_contatos_bkp`
--
ALTER TABLE `usuarios_contatos_bkp`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_usuario2` (`id_usuario2`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats_mensagens`
--
ALTER TABLE `chats_mensagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `chats_mensagens_bkp`
--
ALTER TABLE `chats_mensagens_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `faculdades`
--
ALTER TABLE `faculdades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `faculdades_relacoes_aluno`
--
ALTER TABLE `faculdades_relacoes_aluno`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `faculdades_relacoes_bkp`
--
ALTER TABLE `faculdades_relacoes_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `grupos`
--
ALTER TABLE `grupos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `grupos_bkp`
--
ALTER TABLE `grupos_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `grupos_usuarios`
--
ALTER TABLE `grupos_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;
--
-- AUTO_INCREMENT for table `grupos_usuarios_bkp`
--
ALTER TABLE `grupos_usuarios_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `postagens`
--
ALTER TABLE `postagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `postagens_bkp`
--
ALTER TABLE `postagens_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `postagens_categorias`
--
ALTER TABLE `postagens_categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `postagens_categorias_bkp`
--
ALTER TABLE `postagens_categorias_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `postagens_categorias_view`
--
ALTER TABLE `postagens_categorias_view`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
--
-- AUTO_INCREMENT for table `postagens_comentarios`
--
ALTER TABLE `postagens_comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `postagens_comentarios_bkp`
--
ALTER TABLE `postagens_comentarios_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `postagens_gostei`
--
ALTER TABLE `postagens_gostei`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `postagens_gostei_bkp`
--
ALTER TABLE `postagens_gostei_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
--
-- AUTO_INCREMENT for table `usuarios_bkp`
--
ALTER TABLE `usuarios_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT for table `usuarios_contatos`
--
ALTER TABLE `usuarios_contatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
--
-- AUTO_INCREMENT for table `usuarios_contatos_bkp`
--
ALTER TABLE `usuarios_contatos_bkp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
