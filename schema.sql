-- MySQL Script generated by MySQL Workbench
-- Wed Dec 21 10:59:02 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema albums
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema albums
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `albums` DEFAULT CHARACTER SET utf8 ;
USE `albums` ;

-- -----------------------------------------------------
-- Table `albums`.`albums`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `albums`.`albums` ;

CREATE TABLE IF NOT EXISTS `albums`.`albums` (
  `id_album` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `genre` VARCHAR(255) NULL,
  `picture` VARCHAR(255) NULL,
  `artist` VARCHAR(255) NULL,
  PRIMARY KEY (`id_album`),
  UNIQUE INDEX `id_album_UNIQUE` (`id_album` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `albums`.`tracks`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `albums`.`tracks` ;

CREATE TABLE IF NOT EXISTS `albums`.`tracks` (
  `id_track` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NULL,
  `youtube_url` VARCHAR(255) NULL,
  `id_album` INT NULL,
  PRIMARY KEY (`id_track`),
  UNIQUE INDEX `track_id_UNIQUE` (`id_track` ASC) VISIBLE,
  INDEX `tracks_track_album_id_idx` (`id_album` ASC) VISIBLE,
  CONSTRAINT `tracks_track_album_id`
    FOREIGN KEY (`id_album`)
    REFERENCES `albums`.`albums` (`id_album`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
