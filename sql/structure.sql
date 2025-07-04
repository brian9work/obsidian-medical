DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(25) NOT NULL,
  `role` varchar(10) NOT NULL,
  `is_active` varchar(1) NOT NULL,
  `tmp` varchar(256) NOT NULL,
  `created_at` datetime NOT NULL 
    DEFAULT CURRENT_TIMESTAMP,
  `last_update` datetime NOT NULL 
    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `expedient` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_admin` int NOT NULL,
  `id_user` int NOT NULL,
  `url_image` varchar(150) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `fecha_consultas` (
  id int NOT NULL AUTO_INCREMENT,
  id_user int NOT NULL,
  fecha TIMESTAMP NOT NULL [unique],
  motivo varchar(50) NOT NULL,
  detalles varchar(255) NOT NULL,
  status varchar(15) NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `fecha_UNIQUE` (`fecha`),
  CONSTRAINT `fk_fecha_consultas_user` 
    FOREIGN KEY (`id_user`) REFERENCES 
    `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `signos_vitales` (
  id int NOT NULL AUTO_INCREMENT,
  id_user int NOT NULL,
  presion varchar(50) NOT NULL,
  peso varchar(50) NOT NULL,
  estatura varchar(50) NOT NULL,
  pulso varchar(50) NOT NULL,
  temperatura varchar(50) NOT NULL,
  frecuencia_respiratoria varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  CONSTRAINT `fk_signos_vitales_user` 
    FOREIGN KEY (`id_user`) REFERENCES 
    `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `progreso_tratamiento` (
  id int NOT NULL AUTO_INCREMENT,
  fecha datetime NOT NULL,
  descripcion varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `tratamiento` (
  id int NOT NULL AUTO_INCREMENT,
  id_progreso_tratamiento int NOT NULL,
  nombre varchar(50) NOT NULL,
  descripcion varchar(255) NOT NULL,
  dosis varchar(50) NOT NULL,
  tiempo varchar(50) NOT NULL,
  via varchar(50) NOT NULL,
  fecha_inicio datetime NOT NULL,
  fecha_fin datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  CONSTRAINT `fk_progreso_tratamiento_tratamiento` 
    FOREIGN KEY (`id_progreso_tratamiento`) REFERENCES 
    `progreso_tratamiento` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `consultas` (
  id int NOT NULL AUTO_INCREMENT,
  id_user int NOT NULL,
  id_signos_vitales int NOT NULL,
  id_tratamiento int NOT NULL,
  id_fecha_consulta int NOT NULL,
  sintomas varchar(255) NOT NULL,
  diagnostico varchar(255) NOT NULL,
  indicaciones varchar(255) NOT NULL,
  estudios varchar(255) NOT NULL,
  referencias varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  CONSTRAINT `fk_consultas_user` 
    FOREIGN KEY (`id_user`) REFERENCES 
    `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_consultas_signos` 
    FOREIGN KEY (`id_signos_vitales`) REFERENCES 
    `signos_vitales` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_consultas_tratamiento` 
    FOREIGN KEY (`id_tratamiento`) REFERENCES 
    `tratamiento` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_consultas_fecha_consulta` 
    FOREIGN KEY (`id_fecha_consulta`) REFERENCES 
    `fecha_consultas` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;










