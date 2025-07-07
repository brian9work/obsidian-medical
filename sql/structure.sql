-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 06-07-2025 a las 05:07:45
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `obsidian_medical`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultas`
--

DROP TABLE IF EXISTS `consultas`;
CREATE TABLE IF NOT EXISTS `consultas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `id_vital_signs` int NOT NULL,
  `id_treatment` int NOT NULL,
  `id_consultation_date` int NOT NULL,
  `symptoms` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `diagnosis` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `indications` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `studies` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `references` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_consultas_user` (`id_user`),
  KEY `fk_consultas_signos` (`id_vital_signs`),
  KEY `fk_consultas_tratamiento` (`id_treatment`),
  KEY `fk_consultas_fecha_consulta` (`id_consultation_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultationdatemodel`
--

DROP TABLE IF EXISTS `consultationdatemodel`;
CREATE TABLE IF NOT EXISTS `consultationdatemodel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `date` timestamp NOT NULL,
  `reason` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `details` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_fecha_consultas_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expedient`
--

DROP TABLE IF EXISTS `expedient`;
CREATE TABLE IF NOT EXISTS `expedient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_admin` int NOT NULL,
  `id_user` int NOT NULL,
  `url_image` varchar(150) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `name` varchar(50) NOT NULL,
  `lastnamep` varchar(50) NOT NULL,
  `lastnamem` varchar(50) NOT NULL,
  `birthdate` varchar(100) NOT NULL,
  `gender` varchar(15) NOT NULL,
  `historial` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_expediente_admin` (`id_admin`),
  KEY `fk_expediente_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `expedient`
--

INSERT INTO `expedient` (`id`, `id_admin`, `id_user`, `url_image`, `name`, `lastnamep`, `lastnamem`, `birthdate`, `gender`, `historial`, `created_at`, `updated_at`) VALUES
(24, 1, 10, '86333c39-5ea8-425e-a8fc-3f802669b063_WhatsApp Image 2025-07-04 at 7.38.24 PM.jpeg', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-07-05 22:22:58', '2025-07-05 22:22:58'),
(26, 1, 11, 'de460141-7a7b-41cf-ac0d-5e9916621046_Cheese Puff\'s Elevated Terrace Retreat.png', 'Carlos', 'Alberto', 'Cruz', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-07-05 22:24:49', '2025-07-05 22:24:49'),
(27, 2, 12, '44aeabbf-73d6-469f-afb0-24b1a5e2ec18_ChatGPT Image Jun 28, 2025, 11_43_03 PM.png', 'Geraldin', 'Arenas', 'Hernandez', '09-12-2003', 'femenino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-07-05 22:26:19', '2025-07-05 22:26:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `fecha_consultas`
--

DROP TABLE IF EXISTS `fecha_consultas`;
CREATE TABLE IF NOT EXISTS `fecha_consultas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `date` timestamp NOT NULL,
  `reason` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `details` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_fecha_consultas_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `fecha_consultas`
--

INSERT INTO `fecha_consultas` (`id`, `id_user`, `date`, `reason`, `details`, `status`) VALUES
(19, 10, '2000-01-01 07:01:00', 'Razon', 'Detalles de la cita', '0'),
(20, 10, '2000-01-01 08:00:00', 'Razon', 'Detalles de la cita', '0'),
(21, 10, '2000-01-01 09:00:00', 'Razon', 'Detalles de la cita', '0'),
(22, 11, '2025-01-01 07:00:00', 'Razon', 'Detalles de la cita', '0'),
(23, 11, '2025-01-01 08:00:00', 'Razon', 'Detalles de la cita', '0'),
(24, 12, '2025-01-01 09:00:00', 'Razon', 'Detalles de la cita', '0'),
(25, 12, '2025-01-01 10:00:00', 'Razon', 'Detalles de la cita', '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `progreso_tratamiento`
--

DROP TABLE IF EXISTS `progreso_tratamiento`;
CREATE TABLE IF NOT EXISTS `progreso_tratamiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_treatment` int NOT NULL,
  `date` datetime NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_progreso_tratamiento_tratamiento_table` (`id_treatment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `signos_vitales`
--

DROP TABLE IF EXISTS `signos_vitales`;
CREATE TABLE IF NOT EXISTS `signos_vitales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `blood_pressure` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `weight` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `height` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `heart_rate` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `temperature` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `respiratory_rate` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_signos_vitales_user` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tratamiento`
--

DROP TABLE IF EXISTS `tratamiento`;
CREATE TABLE IF NOT EXISTS `tratamiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `dose` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `time` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `via` varchar(50) NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci NOT NULL,
  `email` varchar(25) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci NOT NULL,
  `role` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci NOT NULL,
  `is_active` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci NOT NULL,
  `tmp` varchar(256) CHARACTER SET utf8mb3 COLLATE utf8mb3_spanish2_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `is_active`, `tmp`, `created_at`, `last_update`) VALUES
(1, 'abc1', '$2a$10$2vUzi555jvxtNTDTLh2G8.4G4HO6IKUOVU3ENzp/tC35vOtl7BwH.', 'abc1@gmail.com', 'ADMIN', '1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMxIiwiaWF0IjoxNzUxNzc3OTU0LCJleHAiOjE3NTE3NzkzOTR9.aXabZB0JcUQLk7hYAAe4KYokOAfG9bNwbMKKyuTDiuQ', '2025-06-25 14:51:06', '2025-07-05 22:59:14'),
(2, 'abc2', '$2a$10$OA9.YQkNBdW.k3vLAe2Ym.ELxGmfDtWngVRQuRWUPjR5b2R/bmH5C', 'abc2@gmail.com', 'ADMIN', '1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMyIiwiaWF0IjoxNzUxNzc1OTMwLCJleHAiOjE3NTE3NzczNzB9.L4xjFTmOKweAsTNHR_xjP1bNYRX_GvwGS9_59Sah0yM', '2025-06-25 14:26:01', '2025-07-05 22:25:30'),
(10, 'user1', '$2a$10$s/gd.IzrPZGEe2MyZErbKOa0WNDsGfPycQ2rbFQpiQoiKqKss/JCS', 'correo1@gmail.com', 'USER', '1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMSIsImlhdCI6MTc1MTc3NjM0MSwiZXhwIjoxNzUxNzc3NzgxfQ.8kTmu0kpDK6W33FJMioZFtLbL07L1bUgtdLyZ5xLYbw', '2025-07-05 21:08:25', '2025-07-05 22:32:21'),
(11, 'user2', '$2a$10$DjzQd7DS3K5TNcOAnlPVw.7Q1q1n0rze.VTs7xfsZGyOcvRcPfUte', 'correo2@gmail.com', 'USER', '1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMiIsImlhdCI6MTc1MTc3MTMxMSwiZXhwIjoxNzUxNzcyNzUxfQ.y2abNM8tfZdwSRQhnwptvOBE9vxCNTYtjm59JgCH1YQ', '2025-07-05 21:08:31', '2025-07-05 21:09:33'),
(12, 'user3', '$2a$10$IfA1l7kwBAGhfi7OnGWHx.NwBkxhgQudS23CfUxaiMkzGQTKgqCNu', 'correo3@gmail.com', 'USER', '1', 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyMyIsImlhdCI6MTc1MTc3MTMxOCwiZXhwIjoxNzUxNzcyNzU4fQ.ccD6a_cunMNX4ZOip55miE1AI16sEh8QjFaTvLztnbc', '2025-07-05 21:08:38', '2025-07-05 21:09:40');

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `consultas`
--
ALTER TABLE `consultas`
  ADD CONSTRAINT `fk_consultas_fecha_consulta` FOREIGN KEY (`id_consultation_date`) REFERENCES `fecha_consultas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_consultas_signos` FOREIGN KEY (`id_vital_signs`) REFERENCES `signos_vitales` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_consultas_tratamiento` FOREIGN KEY (`id_treatment`) REFERENCES `tratamiento` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_consultas_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `consultationdatemodel`
--
ALTER TABLE `consultationdatemodel`
  ADD CONSTRAINT `fk_fecha_consultas_user2` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `expedient`
--
ALTER TABLE `expedient`
  ADD CONSTRAINT `fk_expediente_admin` FOREIGN KEY (`id_admin`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_expediente_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `fecha_consultas`
--
ALTER TABLE `fecha_consultas`
  ADD CONSTRAINT `fk_fecha_consultas_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `progreso_tratamiento`
--
ALTER TABLE `progreso_tratamiento`
  ADD CONSTRAINT `fk_progreso_tratamiento_tratamiento_table` FOREIGN KEY (`id_treatment`) REFERENCES `tratamiento` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `signos_vitales`
--
ALTER TABLE `signos_vitales`
  ADD CONSTRAINT `fk_signos_vitales_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


CREATE TABLE IF NOT EXISTS `consulta_tratamiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_consultation` int NOT NULL,
  `id_treatment` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_consulta_tratamiento_consultas` (`id_consultation`),
  KEY `fk_consulta_tratamiento_tratamiento` (`id_treatment`),
  CONSTRAINT `fk_consulta_tratamiento_consultas` FOREIGN KEY (`id_consultation`) REFERENCES `consultas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_consulta_tratamiento_tratamiento` FOREIGN KEY (`id_treatment`) REFERENCES `tratamiento` (`id`) ON DELETE CASCADE
)