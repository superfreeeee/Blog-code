DROP DATABASE IF EXISTS express_mysql_db;
CREATE DATABASE express_mysql_db;

USE express_mysql_db;

CREATE TABLE `user` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    PRIMARY KEY (`id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO user (`name`, `password`) VALUES ('user1', 'password1');
INSERT INTO user (`name`, `password`) VALUES ('user2', 'password2');
INSERT INTO user (`name`, `password`) VALUES ('user3', 'password3');