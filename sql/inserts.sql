CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `email` varchar(25) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `role` varchar(10) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `is_active` varchar(1) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `tmp` varchar(256) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_update` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

CREATE TABLE IF NOT EXISTS `expedient` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_user` INT NOT NULL,
  `url_image` VARCHAR(50) NOT NULL,
  `name` VARCHAR(50) NOT NULL,
  `lastnamep` VARCHAR(50) NOT NULL,
  `lastnamem` VARCHAR(50) NOT NULL,
  `birthdate` DATETIME NOT NULL,
  `gender` VARCHAR(15) NOT NULL,
  `historial` VARCHAR(255) NOT NULL,  
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id`),

  CONSTRAINT `fk_expediente_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

ALTER TABLE `expedient`
  CONSTRAINT `fk_expediente_user`
    FOREIGN KEY (`id_user`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE