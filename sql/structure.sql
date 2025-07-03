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
  CONSTRAINT `fk_expediente_user` 
    FOREIGN KEY (`id_user`) REFERENCES 
    `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_expediente_admin` 
    FOREIGN KEY (`id_admin`) REFERENCES 
    `users` (`id`) ON DELETE CASCADE,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_expediente_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `expedient` (`id`, `id_admin`, `id_user`, `url_image`, `name`, `lastnamep`, `lastnamem`, `birthdate`, `gender`, `historial`, `created_at`, `updated_at`) VALUES
(8,  19, 16, '1', '2', '3', '4', '01-01-2003', 'indefinido', '6', '2025-06-26 23:42:23', '2025-06-30 09:17:03'),
(9,  19, 17, 'b97fbc3a-5f2c-42e5-8e91-378b99cd69d5_zifbat21ivae1.jpeg', '2', '3', '4', '01-01-2003', 'indefinido', '6', '2025-06-27 00:41:35', '2025-06-30 09:17:08'),
(10, 19, 18, '55f06b6a-900c-490b-9343-a8ed8ce0b828_zifbat21ivae1.jpeg', '2', '3', '4', '01-01-2000', 'otro', '6', '2025-06-27 18:53:30', '2025-06-30 09:17:39'),
(11, 19, 19, '78a288cc-1714-4ba2-8d99-ed4857e66c79_nose.jpeg', 'Brian', 'Hernandez', 'Garcia', '05-06-2003', 'otro', 'Apendicitis', '2025-06-27 19:07:36', '2025-06-30 09:17:25'),
(12, 19, 20, '6319a993-8c8e-46ee-9a1f-d576cf9e090e_zifbat21ivae1.jpeg', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-29 22:35:38', '2025-06-30 09:17:32'),
(13, 19, 21, '9f2e042a-75c9-4653-810e-2ec2160a1adb_Luciérnaga en el bosque nocturno.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-29 22:38:20', '2025-06-30 09:17:47'),
(16, 19, 22, '7c4344ae-e389-4d48-a011-523c0bfd4dce_image-KxxuU9NLOb9I1Wl7YaDIjDgiFhdjlW.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-29 23:58:50', '2025-06-30 09:17:58'),
(17, 19, 23, 'aab96ca1-c158-40bc-96b8-7bd555308656_ChatGPT Image Jun 28, 2025, 11_57_01 PM.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-29 23:59:42', '2025-06-30 09:18:04'),
(18, 19, 24, '9ab9fed3-8444-4f22-9c3a-76c4461ead4d_ChatGPT Image Jun 28, 2025, 11_56_26 PM.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-30 00:00:05', '2025-06-30 09:18:10'),
(19, 19, 19, 'cca784e9-4ced-44e8-b227-c7551f3b0516_ChatGPT Image Jun 28, 2025, 11_56_49 PM.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-30 16:45:56', '2025-06-30 16:45:56'),
(20, 19, 19, 'd45e05f6-e75e-4f30-bb4e-bb5121dcee8f_ChatGPT Image Jun 28, 2025, 10_46_04 PM.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-30 16:52:28', '2025-06-30 16:52:28'),
(21, 19, 25, '2c831972-7151-4a23-907a-5701fb558d1a_ChatGPT Image Jun 28, 2025, 11_56_26 PM.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-30 17:06:37', '2025-06-30 17:06:37'),
(22, 19, 28, 'da24e16f-b8d7-4dac-b7c5-4902b1e6c75c_putty-64bit-0.83-installer - copia.jpg', 'Brian Michel', 'Hérnandez', 'García', '01-01-1998', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-06-30 20:13:54', '2025-06-30 20:13:54'),
(23, 19, 26, 'dab0b01e-4981-4f6d-828d-283c35daa90d_Luciérnaga en el bosque nocturno.png', 'Brian Michel', 'Hérnandez', 'García', '01-01-2000', 'masculino', 'Apendomiosis, Alergia a la penicilina, Diabetes tipo 2 en la familia', '2025-07-02 17:33:59', '2025-07-02 17:33:59');