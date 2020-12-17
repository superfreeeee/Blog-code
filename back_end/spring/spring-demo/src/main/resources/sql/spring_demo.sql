
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
	user_id int AUTO_INCREMENT,
	name varchar(20) NOT NULL,
	password varchar(20) NOT NULL ,
	PRIMARY KEY (user_id)
);

